const ts = require('typescript');
const fs = require('fs/promises');
const path = require('path');

// Step 1: Parse TypeScript Files
async function parseTypes(typesDir) {
    const types = {};

    const files = await fs.readdir(typesDir);
    for (const file of files) {
        if (file.endsWith('.ts')) {
            console.log(file);
            const filePath = path.join(typesDir, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            const sourceFile = ts.createSourceFile(file, fileContent, ts.ScriptTarget.Latest, true);

            ts.forEachChild(sourceFile, (node) => {
                if (ts.isTypeAliasDeclaration(node)) {
                    const typeName = node.name.text;
                    const typeDefinition = node.type.getText(sourceFile);
                    types[typeName] = typeDefinition;
                }
            });
        }
    }
    return types;
}

// Step 2: Resolve Types Recursively
function resolveType(typeName, types, resolved = new Set()) {
    if (resolved.has(typeName)) return '{}'; // Handle circular references
    resolved.add(typeName);

    const rawType = types[typeName];
    if (!rawType) return '{}';

    // Recursively resolve intersection types
    return rawType.replace(/&\s*(\w+)/g, (_, subType) =>
        `& ${resolveType(subType, types, resolved)}`
    );
}

// Step 3: Replace Placeholders in Docs
async function updateDocs(docsDir, types) {
    const files = await fs.readdir(docsDir);
    console.log(files);
    for (const file of files) {
        if (file.endsWith('.md') || file.endsWith('.mdx')) {
            const filePath = path.join(docsDir, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');

            const updatedContent = fileContent.replace(/{{(\w+)}}/g, (_, word) => {
                const resolvedType = resolveType(word, types);
                return resolvedType ? `type ${word} = ${resolvedType};` : `{{${word}}}`;
            });

            await fs.writeFile(filePath, updatedContent, 'utf-8');
        }
    }
}

// Main Script Execution
(async () => {
    const typesDir = path.resolve(__dirname, '../', 'types/src');
    const docsDir = path.resolve(__dirname, '../', 'docs/src/content/docs/guides');

    try {
        const types = await parseTypes(typesDir);
        console.log(types);
        await updateDocs(docsDir, types);
        console.log('Documentation updated successfully.');
    } catch (error) {
        console.error('Error updating documentation:', error);
    }
})();
