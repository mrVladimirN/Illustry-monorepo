import { Link, Node } from "types/visualizations";

//Sankey transformers
export const computeCategoriesSankey = (nodes: Node[]) => {
  return [
    ...new Set(
      nodes.map((node) => {
        return node.category;
      })
    ),
  ];
};

export const computeNodesSankey = (
  nodes: Node[],
  categories: string[],
  colors: string[]
) => {
  const colorMapSchema = new Map<string, string>();
  categories.forEach((cat, index) => {
    colorMapSchema.set(cat, colors[index] as string);
  });
  return nodes.map((node) => {
    return {
      name: node.name,
      itemStyle: {
        color: colorMapSchema.get(node.category),
        borderColor: colorMapSchema.get(node.category),
      },
      prop: computePropertiesForToolTip(node.properties),
    };
  });
};

export const computeLinksSankey = (links: Link[]) => {
  return links.map((link, index) => {
    return {
      source: link.source,
      target: link.target,
      value: link.value,
      prop: computePropertiesForToolTip(link.properties, link.value),
    };
  });
};
const computePropertiesForToolTip = (
  properties: any,
  value?: number | string
) => {
  let prop = "";

  if (typeof properties === "object") {
    for (const key in properties) {
      if (Object.hasOwnProperty.call(properties, key)) {
        const propValue = properties[key];
        prop += `<div style="font-weight: bold">${key}:${propValue}</div>`;
      }
    }

    if (value) {
      prop += `<div style="font-weight: bold">value:${value}</div>`;
    }
  } else if (typeof properties === "string") {
    if (value) {
      prop +=
        properties + `<div style="font-weight: bold">value:${value}</div>`;
    } else {
      prop += properties;
    }
  } else if (value) {
    prop += `<div style="font-weight: bold">value:${value}</div>`;
  }

  return prop;
};

// FLG transformers

export const computeCategoriesFLG = (nodes: Node[], colors: string[]) => {
  return [
    ...new Set(
      nodes.map((node) => {
        return node.category;
      })
    ),
  ].map((node, index) => {
    return { name: node, itemStyle: { color: colors[index] } };
  });
};

export const constructLegendTextColor = (
  categories: {
    name: string;
  }[]
) => {};
export const computeNodesFLG = (
  nodes: Node[],
  categories: {
    name: string;
  }[]
) => {
  return nodes.map((node, index) => {
    const categoryIndex = categories.findIndex(
      (category) => category.name === node.category
    );
    return {
      id: index.toString(),
      name: node.name,
      category: categoryIndex,
    };
  });
};

export const computeLinksFLG = (links: Link[], nodes: Node[]) => {
  return links.map((link, index) => {
    const source = nodes.findIndex((node) => node.name === link.source);
    const target = nodes.findIndex((node) => node.name === link.target);
    return {
      source: source,
      target: target,
      value: link.value,
      prop: computePropertiesForToolTip(link.properties, link.value),
    };
  });
};

// HEB transformers

import {
  select,
  cluster,
  lineRadial,
  curveBundle,
  hierarchy,
  HierarchyNode,
  LineRadial,
} from "d3";

export const assignToComponents = (
  d: { category: string; name: string },
  map: any
) => {
  const component = "#" + d.category;
  let componentNode = map[component];
  if (!componentNode) {
    componentNode = {
      name: component,
      key: component,
      parent: map["@root"],
      children: [],
    };
    if (
      componentNode &&
      componentNode.parent &&
      componentNode.parent.children
    ) {
      componentNode.parent.children.push(componentNode);
    }
    map[component] = componentNode;
  }
  const n = {
    name: d.name,
    parent: componentNode,
    key: d.name,
  };

  componentNode.children.push(n);
  return n;
};

export const packageHierarchy = (nodes: Node[]) => {
  const map: any = {};
  map["@root"] = {
    name: "@root",
    children: [],
    parent: null,
    key: "@root",
  };

  nodes.forEach((d) => {
    assignToComponents(d, map);
  });
  return hierarchy(map["@root"]);
};

function createLinks(nodes: HierarchyNode<any>[], links: Link[]) {
  const map: any = {};
  const imports: any[] = [];

  // Compute a map from name to node.
  nodes.forEach((d) => {
    map[d.data.name] = d;
  });
  // For each import, construct a link from the source to target node.
  links.forEach((lnk) => {
    let _import;
    if (lnk.source === null || lnk.source === undefined) {
      _import = map[lnk.source].path(map[lnk.target]);
    } else {
      const source = map[lnk.source];
      const target = map[lnk.target];
      _import = source.path(target);
    }
    _import.value = lnk.value;
    imports.push(_import);
  });

  return imports;
}

export const createHebLinks = (
  link: any,
  root: HierarchyNode<any>,
  links: Link[],
  line: LineRadial<[number, number]>,
  color: string
) => {
  return link
    .data(createLinks(root.leaves(), links))
    .enter()
    .append("path")
    .each((d: any) => {
      (d.source = d[0]), (d.target = d[d.length - 1]);
    })
    .attr("class", "link")
    .attr("d", line)
    .style("stroke", color)
    .style("stroke-opacity", 0.4)
    .style("fill", "none");
};
export const createHebNodes = (
  node: any,
  root: HierarchyNode<any>,
  color: string
) => {
  return node
    .data(root.leaves())
    .enter()
    .append("text")
    .attr("class", "node")
    .attr("dy", "0.31em")
    .attr(
      "transform",
      (d: { x: number; y: number }) =>
        "rotate(" +
        (d.x - 90) +
        ")translate(" +
        (d.y + 8) +
        ",0)" +
        (d.x < 180 ? "" : "rotate(180)")
    )
    .attr("text-anchor", (d: { x: number; y: number }) =>
      d.x < 180 ? "start" : "end"
    )
    .style("fill", color)
    .style("font", ' 300 11px "Helvetica Neue", Helvetica, Arial, sans-serif')
    .text((d: { data: { key: string } }) => d.data.key);
};

export const createToolTip = () => {
  return select("#tooltip")
    .append("div")
    .attr("class", "my-tooltip")
    .style("visibility", "hidden")
    .style("max-width", 500 + "px")
    .style("word-wrap", "break-word")
    .text("tooltip");
};
export const onMouseMove = (tooltip: any) => {
  tooltip.style("opacity", 1);
  return tooltip;
};
export const onNodeClick = (tooltip: any) => {
  tooltip.style("visibility", "hidden");
};

export const onNodeOrLinkMouseOut = (
  link: any,
  node: any,
  tooltip: any,
  color: string,
) => {
    link
      .style("stroke", color)
      .style("stroke-opacity", 0.4)
      .style("stroke-width", "1px");

    node.style("fill", color).style("font-weight", 300);

    tooltip.style("visibility", "hidden");
};
export const onLinkMouseOver = (
  l: any,
  node: any,
  link: any,
  tooltip: any,
  colorin: string,
  colorout: string,
  color: string
) => {
  node.each((n: any) => {
    n.target = n.source = false;
  });
  l.source.source = true;
  l.target.target = true;
  link
    .filter((lnk: any) => l === lnk)
    .style("stroke-opacity", (lnk: any) => 1)
    .style("stroke-width", (lnk: any) => "3px")
    .raise();

  node
    .classed("node--target", (n: any) => n.target)
    .classed("node--source", (n: any) => n.source)
    .style("fill", (n: any) => {
      if (n.target) {
        return colorin;
      } else if (n.source) {
        return colorout;
      } else {
        return color;
      }
    })
    .style("font-weight", (n: any) => {
      if (n.target || n.source) {
        return 700;
      }
    });
  tooltip.html(`Selected value: ${l.value}`);
  return tooltip.style("visibility", "visible").style("opacity", 1);
};

export const onNodeMouseOver = (d: any, node: any,
  link: any,
  tooltip: any,
  colorin: string,
  colorout: string,
  color1: string,
  color2: string)  => {
  node.each((n: any) => {
    n.target = n.source = false;
  });
  link
    .classed("link--target", (l: any) => {
      if (l.target === d) {
        return (l.source.source = true);
      }
    })
    .classed("link--source", (l: any) => {
      if (l.source === d) {
        return (l.target.target = true);
      }
    })
    .filter((l: any) => l.target === d || l.source === d)
    .style("stroke", (l: any) => {
      if (l.target === d) {
        return colorout;
      } else if (l.source === d) {
        return colorin;
      } else {
        return "steelblue";
      }
    })
    .style("stroke-opacity", (l: any) => {
      if (l.target === d || l.source === d) {
        return 1;
      }
    })
    .style("stroke-width", (l: any) => {
      if (l.target === d || l.source === d) {
        return "3px";
      }
    })
    .raise();

  node
    .classed("node--target", (n: any) => n.target)
    .classed("node--source", (n: any) => n.source)
    .style("fill", (n: any) => {
      if (n.target) {
        return colorin;
      } else if (n.source) {
        return colorout;
      } else if (n === d) {
        return color1;
      } else {
        return color2;
      }
    })
    .style("font-weight", (n: any) => {
      if (n.target || n.source || d === n) {
        return 700;
      }
    });
}