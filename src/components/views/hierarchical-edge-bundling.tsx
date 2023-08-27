"use client";
import * as React from "react";
import { select, cluster, lineRadial, curveBundle, hierarchy } from "d3";
import { NodeLinkData } from "types/visualizations";
interface ForcedLayoutGraphProp {
  data: NodeLinkData;
  colors: string[];
}

const HierarchicalEdgeBundlingGraphView = ({
  data,
  colors,
}: ForcedLayoutGraphProp) => {
  React.useEffect(() => {
    createHedge(data);
    return () => {
      select("#hedgeBundleSvg").remove();
      select(".my-tooltip").remove();
    };
  }, [data]);
  const createHedge = (graph: any) => {
    const colorin = colors[0];
    const colorout = colors[1];

    const tooltip = select("#tooltip")
      .append("div")
      .attr("class", "my-tooltip")
      .style("visibility", "hidden")
      .style("max-width", 500 + "px")
      .style("word-wrap", "break-word")
      .text("tooltip");

    const radius = window.innerHeight / 2;
    const innerRadius = radius - 200;
    const newCluster = cluster().size([360, innerRadius]);

    const line = lineRadial()
      .curve(curveBundle.beta(0.85))
      .radius((d: any) => d.y)
      .angle((d: any) => (d.x / 180) * Math.PI);

    const svg = select("#viz")
      .append("svg")
      .attr("id", "hedgeBundleSvg")
      .attr("width", window.innerHeight)
      .attr("height", window.innerHeight - 10)
      .attr("class", "edge-bundle")
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");
    function packageHierarchy(nodes: any[]) {
      const map: any = {};
      map["@root"] = {
        name: "@root",
        children: [],
        parent: null,
        key: "@root",
      };
      function assignToComponents(d: { category: string; name: any }) {
        const component = "#" + d.category;
        let componentNode = map[component];
        if (!componentNode) {
          componentNode = {
            name: component,
            key: component,
            parent: map["@root"],
            children: [],
          };
          componentNode.parent.children.push(componentNode);
          map[component] = componentNode;
        }
        const n = {
          name: d.name,
          parent: componentNode,
          key: d.name,
        };

        componentNode.children.push(n);
        return n;
      }

      nodes.forEach((d) => {
        assignToComponents(d);
      });
      return hierarchy(map["@root"]);
    }
    const root = packageHierarchy(graph.nodes).sum((d: any) => d.size);
    newCluster(root);

    let link: any = svg.append("g").selectAll(".link");
    let node: any = svg.append("g").selectAll(".node");
    node = node
      .data(root.leaves())
      .enter()
      .append("text")
      .attr("class", "node")
      .attr("dy", "0.31em")
      .attr(
        "transform",
        (d: any) =>
          "rotate(" +
          (d.x - 90) +
          ")translate(" +
          (d.y + 8) +
          ",0)" +
          (d.x < 180 ? "" : "rotate(180)")
      )
      .attr("text-anchor", (d: any) => (d.x < 180 ? "start" : "end"))
      .style("fill", colorin)
      .style("font", ' 300 11px "Helvetica Neue", Helvetica, Arial, sans-serif')
      .text((d: any) => d.data.key)
      .on("mouseover", onNodeMouseOver)
      .on("mouseout", onNodeOrLinkMouseOut)
      .on("mousemove", onMouseMove)
      .on("click", (d: any) => {
        tooltip.style("visibility", "hidden");
      });
    link = link
      .data(createLinks(root.leaves(), graph.links))
      .enter()
      .append("path")
      .each((d: any) => {
        (d.source = d[0]), (d.target = d[d.length - 1]);
      })
      .attr("class", "link")
      .attr("d", line)
      .style("stroke", "steelblue")
      .style("stroke-opacity", 0.4)
      .style("fill", "none")
      .on("mouseover", onLinkMouseOver)
      .on("mousemove", onMouseMove)
      .on("mouseout", onNodeOrLinkMouseOut);

    function onMouseMove() {
      tooltip.style("opacity", 1);
      return tooltip;
    }
    function onNodeOrLinkMouseOut(d: any) {
      link
        .style("stroke", colors[3])
        .style("stroke-opacity", 0.4)
        .style("stroke-width", "1px");

      node.style("fill", colors[4]).style("font-weight", 300);

      tooltip.style("visibility", "hidden");
    }
    function onNodeMouseOver(d: any) {
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
            return colors[5];
          } else {
            return colors[6];
          }
        })
        .style("font-weight", (n: any) => {
          if (n.target || n.source || d === n) {
            return 700;
          }
        });
    }
    function onLinkMouseOver(l: any) {
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
            return colors[5];
          }
        })
        .style("font-weight", (n: any) => {
          if (n.target || n.source) {
            return 700;
          }
        });
      tooltip.html(`Selected value: ${l.value}`);
      return tooltip.style("visibility", "visible").style("opacity", 1);
    }

    function createLinks(nodes: any[], links: any[]) {
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
  };
  return (
    <>
      <div
        id="viz"
        className="w-full h-90vh flex justify-center items-center"
        style={{ height: "90vh" }} // Adjust the height based on your requirements
      />
      <div id="tooltip"></div>
    </>
  );
};

export default HierarchicalEdgeBundlingGraphView;
