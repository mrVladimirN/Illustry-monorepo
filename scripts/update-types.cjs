const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const typesPackagePath = path.join(__dirname, 'types', 'package.json');
const backendPackagePath = path.join(__dirname, 'backend', 'package.json');
const frontendPackagePath = path.join(__dirname, 'frontend', 'package.json');

function readJSON(filePath) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to read file at ${filePath}:`, error);
        process.exit(1);
    }
}

function writeJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        console.log(`Updated ${filePath}`);
    } catch (error) {
        console.error(`Failed to write file at ${filePath}:`, error);
        process.exit(1);
    }
}

function runYarnInstall() {
    try {
        console.log('Running yarn install...');
        execSync('yarn install', { stdio: 'inherit' });
        console.log('yarn install completed successfully.');
    } catch (error) {
        console.error('Failed to run yarn install:', error.message);
        process.exit(1);
    }
}

function updateDependencies() {
    const typesPackage = readJSON(typesPackagePath);
    const { name: typesName, version: typesVersion } = typesPackage;

    if (!typesName || !typesVersion) {
        console.error('The types/package.json file is missing "name" or "version".');
        process.exit(1);
    }

    const packagePaths = [backendPackagePath, frontendPackagePath];

    let changesMade = false;

    packagePaths.forEach((packagePath) => {
        const packageData = readJSON(packagePath);

        let updated = false;
        ['dependencies', 'devDependencies'].forEach((depType) => {
            if (packageData[depType] && packageData[depType][typesName]) {
                if (packageData[depType][typesName] !== typesVersion) {
                    console.log(
                        `Updating ${typesName} in ${packagePath} (${depType}): ${packageData[depType][typesName]} -> ${typesVersion}`
                    );
                    packageData[depType][typesName] = typesVersion;
                    updated = true;
                    changesMade = true;
                }
            }
        });

        if (updated) {
            writeJSON(packagePath, packageData);
        } else {
            console.log(`No updates needed for ${packagePath}`);
        }
    });

    if (changesMade) {
        runYarnInstall();
    } else {
        console.log('No changes made. Skipping yarn install.');
    }

    console.log('Dependency update process completed.');
}

updateDependencies();
