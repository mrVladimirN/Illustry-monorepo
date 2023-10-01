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
  HierarchyNode,
  LineRadial,
  hierarchy,
} from "d3";
import { TreeMapNode } from "index";

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
  color: string
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

export const onNodeMouseOver = (
  d: any,
  node: any,
  link: any,
  tooltip: any,
  colorin: string,
  colorout: string,
  color1: string,
  color2: string
) => {
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
};

// Matrix

const constructMatrixTooltip = (obj: object) => {
  return `<span class="tooltip" style=" width: 10%; background-color: rgba(235, 0, 0, 0.703); color: #fff; text-align: center; border-radius: 6px; padding: 5px 0; position: absolute; z-index: 1;">${Object.entries(
    obj
  )
    .map(([k, v]) => `${k}:${v}</br>`)
    .join(" ")}</span>`;
};
const constructMatrixStyle = (object: object) => {
  return `${Object.entries(object)
    .map(([k, v]) => `${k}:${v}`)
    .join(";")};width:10%;text-align:center; border: 1px solid #ddd ;`;
};

const constructMatrixToolTipAndStyle = (
  htmlElement: string,
  tooltip: string,
  style: string,
  name: string | number,
  classNames?: string[]
) => {
  const className = classNames ? classNames.join(" ") : "";
  return `<${htmlElement} class="${className}" style=${
    style?.length
      ? `${style};border: 1px solid #ddd ;`
      : "width:10%;text-align:center; border: 1px solid #ddd ;"
  }>${tooltip?.length ? tooltip : ""}${name}</${htmlElement}>`;
};
export const categoryMap = (nodes: Node[]) => {
  return nodes.reduce((map: Record<string, Node[]>, node) => {
    const { category } = node;
    if (!map[category]) {
      map[category] = [];
      map[category]?.push(node);
    } else {
      map[category]?.push(node);
    }
    return map;
  }, {});
};
const constructPropertiesMatrix = (
  htmlElement: string,
  value: string | number,
  properties?: object | object[] | string,
  className?: string[]
) => {
  let finalConstruction = "";
  if (properties) {
    if (Array.isArray(properties)) {
      let style = "";
      let tooltip = "";
      properties.forEach((prop) => {
        if (typeof prop === "object") {
          for (const key in prop) {
            if (key.includes("style")) {
              style += constructMatrixStyle(prop[key]);
            } else {
              tooltip += constructMatrixTooltip(prop[key]);
            }
          }
        }
      });
      finalConstruction += constructMatrixToolTipAndStyle(
        htmlElement,
        tooltip,
        style,
        value,
        className
      );
    } else {
      if (typeof properties === "object") {
        let style = "";
        let tooltip = "";
        Object.entries(properties).forEach(([kProp, kValue]) => {
          if (kProp.includes("style")) {
            style += constructMatrixStyle(kValue);
          } else {
            tooltip += constructMatrixTooltip(kValue);
          }
        });
        finalConstruction += constructMatrixToolTipAndStyle(
          htmlElement,
          tooltip,
          style,
          value,
          className
        );
      }
    }
  } else {
    finalConstruction += constructMatrixToolTipAndStyle(
      htmlElement,
      "",
      "",
      value,
      className
    );
  }
  return finalConstruction;
};
const createRightHeaderString = (spacesForEmptyTd: number, headers: Node[]) => {
  let firstRow = ` <tr id="header" ><th> </th>`;
  for (let i = 0; i < spacesForEmptyTd; i++) {
    firstRow += `<th style="width: 10%; "> </th>`;
  }
  headers.forEach((header) => {
    firstRow += constructPropertiesMatrix(
      "th",
      header.name,
      header.properties,
      ["right-sortable-items"]
    );
  });
  firstRow += "</tr> ";
  return firstRow;
};
const populateRightPropertiesString = (group2: Node[], label: string) => {
  let finalProduct = "";
  group2.forEach((g2: Node) => {
    const foundLabel = g2.labels?.find(
      (groupLabel) => groupLabel.name === label
    );

    if (foundLabel) {
      finalProduct += constructPropertiesMatrix(
        "td",
        foundLabel.value,
        foundLabel.properties,
        ["right-sortable-items"]
      );
    } else {
      finalProduct += constructPropertiesMatrix("td", "", undefined, [
        "right-sortable-items",
      ]);
    }
  });

  return finalProduct;
};

function getTextContent(td: HTMLElement) {
  return td.lastChild?.textContent ? td.lastChild?.textContent : "";
}
export const sortColumns = () => {
  const sortable = document.querySelectorAll(".sortableCol");
  sortable.forEach((s: any, sIndex) => {
    s.addEventListener("click", (event: any) => {
      // Get the current sorting direction from the data attribute
      const currentDir = s.getAttribute("right-data-sort-direction");
      let newDir;

      // Toggle the sorting direction
      if (currentDir === "asc") {
        newDir = "desc";
      } else {
        newDir = "asc";
      }

      // Update the data attribute with the new sorting direction
      s.setAttribute("right-data-sort-direction", newDir);

      // Call sortUpperTable with the column index (sIndex + 1) and the new sorting direction
      sortUpperTable(sIndex + 1, newDir);
    });
  });
};

function getSwappedIndexes(arr: number[], dir: string) {
  // Create an array of indices and sort it based on the values in 'arr'
  const indices = Array.from(arr.keys());
  indices.sort((a, b) => {
    if (dir === "asc") {
      return (arr[a] as number) - (arr[b] as number);
    } else {
      return (arr[b] as number) - (arr[a] as number);
    }
  });
  return indices;
}
const sortUpperTable = (n: number, newDir: string) => {
  const table = document.getElementById("myTable") as HTMLElement;
  const rows = table.getElementsByTagName("TR");
  const rowsElements = rows[n]?.getElementsByClassName("right-sortable-items")
    ? [
        ...(rows[n]?.getElementsByClassName(
          "right-sortable-items"
        ) as unknown as any[]),
      ]
    : [];
  if (rowsElements && rowsElements.length > 0) {
    const rowsValues = rowsElements.map((el) => {
      const element = isNaN(parseInt(getTextContent(el) as string))
        ? 0
        : parseInt(getTextContent(el) as string);
      return element;
    });
    const newIndexMap = getSwappedIndexes(rowsValues, newDir);

    for (let i = 0; i < rows.length; i++) {
      const sortableItemsArray = [
        ...(rows[i]?.getElementsByClassName(
          "right-sortable-items"
        ) as unknown as any[]),
      ];

      const sortedItems = newIndexMap.map(
        (newIndex) => sortableItemsArray[newIndex]
      );
      // Replace the "right-sortable-items" elements in the current row with the sorted items
      const row = rows[i];
      const existingSortableItems = row?.getElementsByClassName(
        "right-sortable-items"
      );
      if (existingSortableItems) {
        for (
          let j = 0;
          j < (existingSortableItems as HTMLCollectionOf<Element>).length;
          j++
        ) {
          (existingSortableItems[j] as any).replaceWith(
            sortedItems[j].cloneNode(true)
          );
        }
      }
    }
  }
};
const sortLowerTable = (n: number, newDir: string) => {
  const table = document.getElementById("myTable") as HTMLElement;
  const sortedRows = Array.from(table.getElementsByClassName("sortus"));

  // Sort the rows based on the specified column and direction
  sortedRows.sort((row1, row2) => {
    const element1 = row1.getElementsByClassName("left-sortable-items")[n];
    const element2 = row2.getElementsByClassName("left-sortable-items")[n];

    const element1Text = getTextContent(element1 as HTMLElement);
    const element2Text = getTextContent(element2 as HTMLElement);

    const element1Value = isNaN(parseInt(element1Text as string))
      ? 0
      : parseInt(element1Text as string);
    const element2Value = isNaN(parseInt(element2Text as string))
      ? 0
      : parseInt(element2Text as string);

    if (newDir === "asc") {
      return element1Value - element2Value;
    } else {
      return element2Value - element1Value;
    }
  });

  // Clear the table and reinsert the sorted rows
  const tbody = table.querySelector("tbody");
  sortedRows.forEach((row) => {
    tbody?.appendChild(row);
  });
};
export const addStyleTooltipWithHover = () => {
  const sortableItems = document.querySelectorAll(
    ".right-sortable-items, .left-sortable-items"
  );

  sortableItems.forEach((sortableItem) => {
    const tooltip: HTMLElement = sortableItem.querySelector(
      ".tooltip"
    ) as HTMLElement;

    if (tooltip) {
      tooltip.style.visibility = "hidden";

      sortableItem.addEventListener("mouseover", () => {
        tooltip.style.visibility = "visible";
      });

      sortableItem.addEventListener("mouseout", () => {
        tooltip.style.visibility = "hidden";
      });
    }
  });
};
export const sortRows = () => {
  const sortable = document.querySelectorAll(".sortableRow");
  sortable.forEach((s: any, sIndex) => {
    s.addEventListener("click", (event: any) => {
      // Get the current sorting direction from the data attribute
      const currentDir = s.getAttribute("left-data-sort-direction");
      let newDir;

      // Toggle the sorting direction
      if (currentDir === "asc") {
        newDir = "desc";
      } else {
        newDir = "asc";
      }

      // Update the data attribute with the new sorting direction
      s.setAttribute("left-data-sort-direction", newDir);

      // Call sortLowerTable with the column index (sIndex + 1) and the new sorting direction
      sortLowerTable(sIndex, newDir);
    });
  });
};

const createLeftHeaderString = (labels: string[]) => {
  let finalProduct = `<tr><td style="width: 10%; "></td>`;
  labels.forEach((label: string) => {
    finalProduct += `<td class="sortableRow " left-data-sort-direction:"asc" style ="font-weight:bold;width: 10%; border: 1px solid #ddd ; cursor: pointer; text-align:center;">${label} </td>`;
  });
  return `${finalProduct}</tr>`;
};

const createRightPropertiesString = (
  spacesForEmptyTd: number,
  labels: string[],
  group2: Node[]
) => {
  const finalProduct = labels.map((label: string) => {
    let row = `<tr>`;
    for (let i = 0; i < spacesForEmptyTd - 1; i++) {
      row += '<td style= "width: 10%;"></td>';
    }
    row += `<td class="sortableCol" right-data-sort-direction="asc" style="font-weight: bold; width: 10%; border: 1px solid #ddd ; cursor: pointer;text-align:center;">${label}</td><td></td>${populateRightPropertiesString(
      group2,
      label
    )}</tr>`;

    return row;
  });
  return finalProduct.join("");
};
const createLeftPropertiesString = (
  group1: Node[],
  group2: Node[],
  links: Link[],
  labels: string[]
) => {
  let finalProduct = "";
  group1.forEach((g1) => {
    let row = `<tr class = "sortus"><td style = "font-weight:bold;width: 10%;text-align:center;border: 1px solid #ddd ; ">${g1.name}</td>`;
    finalProduct = finalProduct + row;
    labels.forEach((label) => {
      const foundLabel = g1.labels?.find(
        (groupLabel) => groupLabel.name === label
      );

      if (foundLabel) {
        finalProduct += constructPropertiesMatrix(
          "td",
          foundLabel.value,
          foundLabel.properties,
          ["left-sortable-items"]
        );
      } else {
        finalProduct += constructPropertiesMatrix("td", "", undefined, [
          "left-sortable-items",
        ]);
      }
    });
    group2.forEach((g2) => {
      finalProduct += populateLinks(g1.name, g2.name, links);
    });
    finalProduct += "</tr>";
  });
  return finalProduct;
};
const populateLinks = (
  group1Name: string,
  group2Name: string,
  links: Link[]
) => {
  let finalProduct = "";

  const foundLink = links.find((link) => {
    return (
      (link.source === group1Name && link.target === group2Name) ||
      (link.target === group1Name && link.source === group2Name)
    );
  });
  if (foundLink) {
    finalProduct += constructPropertiesMatrix(
      "td",
      foundLink.value,
      foundLink.properties,
      ["right-sortable-items", "left-sortable-items"]
    );
  } else {
    finalProduct += constructPropertiesMatrix("td", "", undefined, [
      "right-sortable-items",
      "left-sortable-items",
    ]);
  }

  return finalProduct;
};

export const createHeadersAndPropertiesString = (
  group1: Node[],
  group2: Node[],
  links: any[]
) => {
  const uniqueLabelNamesGroup1 = [
    ...new Set(
      group1.flatMap((node) => node.labels?.map((label) => label.name) || [])
    ),
  ];
  const uniqueLabelNamesGroup2 = [
    ...new Set(
      group2.flatMap((node) => node.labels?.map((label) => label.name) || [])
    ),
  ];

  const rightHeader: string = createRightHeaderString(
    uniqueLabelNamesGroup1.length,
    group2
  );
  const rightProperties: string = createRightPropertiesString(
    uniqueLabelNamesGroup1.length,
    uniqueLabelNamesGroup2,
    group2
  );
  const leftHeader = createLeftHeaderString(uniqueLabelNamesGroup1);
  const leftProperties = createLeftPropertiesString(
    group1,
    group2,
    links,
    uniqueLabelNamesGroup1
  );
  const tableString: string =
    "<thead>" +
    rightHeader +
    "</thead>" +
    "<tbody>" +
    rightProperties +
    leftHeader +
    leftProperties +
    "</tbody>";
  return tableString;
};

 