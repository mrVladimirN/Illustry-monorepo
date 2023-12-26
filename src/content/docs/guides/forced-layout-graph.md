---
title: Forced Layout Graph
description: Forced Layout Graph doc
---

The **Forced Layout Graph** visualization is a dynamic and engaging representation of interconnected data. It uses a force-directed layout algorithm to visually convey relationships between entities within a dataset.

## Forced Layout Graph Data Structure

To represent a Forced Layout Graph, you can use the following `NodeLinkData` interface:

```typescript
export interface Node extends with_optional_properties, with_optional_labels {
  name: string;
  category: string;
}

export interface Link extends with_optional_properties {
  source: string;
  target: string;
  value: number;
}

export interface NodeLinkData {
  nodes: Node[];
  links: Link[];
}
```
### Key Attributes

- **name:** A unique identifier for the node.
- **category:** Categorizes the node into a specific group or cluster.
- **source:** Identifies the source node of the link.
- **target:** Identifies the target node of the link.
- **value:** Represents a numerical value associated with the link that suggests how strongly connected the nodes are.

### Pros and Cons

#### Pros
- **Relationship Visualization:** Clearly represents relationships between entities through connected nodes and links.

- **Dynamic Layout:** Utilizes a force-directed layout for an organic and visually appealing representation.

#### Cons
- **Complexity with Dense Graphs:** In densely interconnected graphs, visual clutter may affect readability.

- **Limited to Network Data:** Most effective for visualizing network or relationship-based data; may not be suitable for all types of datasets.

## Forced Layout Graph Example

![Forced Layout Graph Example](/IllustryDocs/forced-layout-graph.gif)