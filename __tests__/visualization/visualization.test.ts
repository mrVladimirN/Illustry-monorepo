import { ProjectCreate } from "types/project";
import _ from "lodash";
import { Factory } from "../../src/factory";
import mongoose from "mongoose";
import path from "path";
import { copyDirectory } from "../../src/utils/helper";
import { FileDetails, FileProperties } from "types/files";
import {
  VisualizationUpdate,
  VisualizationType,
  VisualizationTypesEnum,
  VisualizationCreate,
} from "types/visualizations";
process.env.NODE_ENV = "test";
const factory = Factory.getInstance();
const jsonDirectoryPath = path.resolve(
  __dirname,
  "../../__tests_resources__/json/"
);

describe("visualizations CRUD", () => {
  beforeAll(async () => {
    const expectedProject: ProjectCreate = {
      name: "Test_Project1",
      description: "Test_ProjectDescription1",
      isActive: true,
    };
    copyDirectory(jsonDirectoryPath, path.resolve(__dirname));
    await factory.getBZL().ProjectBZL.create(expectedProject);
  });
  afterAll(async () => {
    delete process.env.NODE_ENV;
    const allProjects = await factory.getBZL().ProjectBZL.browse({});

    // Use map to create an array of promises
    const deletePromises = (allProjects.projects || []).map(async (project) => {
      await factory.getBZL().ProjectBZL.delete({ name: project.name });
    });

    // Wait for all promises to complete before disconnecting
    await Promise.all(deletePromises);
    await mongoose.disconnect();
  });
  it("It creates a hierarchical-edge-bundling Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./HEB_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "HEB_FullDetails",
      description: "HEB_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
          },
          {
            category: "2",
            name: "Node2",
          },
          {
            category: "3",
            name: "Node3",
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
          },
          {
            source: "Node2",
            target: "Node3",
            value: 1,
          },
          {
            source: "Node3",
            target: "Node2",
            value: 1,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a force-directed-graph Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./FLG_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "FLG_FullDetails",
      description: "FLG_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FORCE_DIRECTED_GRAPH],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
          },
          {
            category: "2",
            name: "Node2",
          },
          {
            category: "3",
            name: "Node3",
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
          },
          {
            source: "Node2",
            target: "Node3",
            value: 1,
          },
          {
            source: "Node3",
            target: "Node2",
            value: 1,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });

  it("It creates a sankey Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./SANKEY_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Sankey_FullDetails",
      description: "Sankey_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SANKEY],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
          },
          {
            category: "2",
            name: "Node2",
          },
          {
            category: "3",
            name: "Node3",
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
          },
          {
            source: "Node2",
            target: "Node3",
            value: 1,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a word-cloud Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Wordcloud_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Wordcloud_FullDetails",
      description: "Wordcloud_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.WORD_CLOUD],
      data: {
        words: [
          {
            name: "Word1",
            value: 390,
          },
          {
            name: "Word2",
            value: 275,
          },
          {
            name: "Word3",
            value: 100,
          },
          {
            name: "Word4",
            value: 1000,
          },
          {
            name: "Word5",
            value: 600,
          },
          {
            name: "Word6",
            value: 146,
          },
          {
            name: "Word7",
            value: 712,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a calendar Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Calendar_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Calendar_FullDetails",
      description: "Calendar_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.CALENDAR],
      data: {
        calendar: [
          {
            date: "1939-09-02",
            value: 1,
            category: "1",
          },
          {
            date: "1939-09-07",
            value: 1,
            category: "2",
          },
          {
            date: "1939-09-17",
            value: 1,
            category: "3",
          },
          {
            date: "1939-10-06",
            value: 1,
            category: "1",
          },
          {
            date: "1939-10-07",
            value: 1,
            category: "1",
          },
          {
            date: "1939-10-14",
            value: 1,
            category: "5",
          },
          {
            date: "1939-10-17",
            value: 1,
            category: "1",
          },
          {
            date: "1939-10-22",
            value: 1,
            category: "6",
          },
          {
            date: "1939-10-28",
            value: 1,
            category: "1",
          },
          {
            date: "1939-11-04",
            value: 1,
            category: "7",
          },
          {
            date: "1939-11-28",
            value: 1,
            category: "3",
          },
          {
            date: "1939-12-05",
            value: 1,
            category: "3",
          },
          {
            date: "1939-12-11",
            value: 1,
            category: "2",
          },
          {
            date: "1939-12-16",
            value: 1,
            category: "2",
          },
          {
            date: "1939-12-23",
            value: 1,
            category: "1",
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a matrix Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Matrix_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Matrix_FullDetails",
      description: "Matrix_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.MATRIX],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
            labels: [
              {
                name: "Label1",
                value: 1,
                properties: {
                  style: {
                    "font-weight": "bold",
                    "background-color": "#541690",
                    "background-color1": "541690",
                  },
                },
              },
              {
                name: "Label2",
                value: 0,
                properties: [
                  {
                    style: {
                      "font-weight": "bold",
                      "background-color": "#541690",
                      "background-color1": "541690",
                    },
                  },
                ],
              },
            ],
          },
          {
            category: "2",
            name: "Node2",
            labels: [
              {
                name: "Label3",
                value: 1,
                properties: {
                  style: {
                    "font-weight": "bold",
                    "background-color": "#541690",
                    "background-color1": "541690",
                  },
                },
              },
              {
                name: "Label4",
                value: 0,
                properties: [
                  {
                    style: {
                      "font-weight": "bold",
                      "background-color": "#541690",
                      "background-color1": "541690",
                    },
                  },
                ],
              },
            ],
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
            properties: {
              style: {
                "font-weight": "bold",
                "background-color": "#541690",
                "background-color1": "541690",
              },
              a: "b",
            },
          },
          {
            source: "Node2",
            target: "Node1",
            value: 1,
            properties: {
              style: {
                "font-weight": "bold",
                "background-color": "#541690",
                "background-color1": "541690",
              },
              a: "b",
            },
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a line-chart Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./LineChart_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "LineChart_FullDetails",
      description: "LineChart_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.LINE_CHART],
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          "Statistic 1": [120, 132, 101, 134, 90, 230, 210],
          "Statistic 2": [220, 182, 191, 234, 290, 330, 310],
          "Statistic 3": [150, 232, 201, 154, 190, 330, 410],
          "Statistic 4": [320, 332, 301, 334, 390, 330, 320],
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a bar-chart Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./BarChart_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "BarChart_FullDetails",
      description: "BarChart_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.BAR_CHART],
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          "Statistic 1": [120, 132, 101, 134, 90, 230, 210],
          "Statistic 2": [220, 182, 191, 234, 290, 330, 310],
          "Statistic 3": [150, 232, 201, 154, 190, 330, 410],
          "Statistic 4": [320, 332, 301, 334, 390, 330, 320],
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a pie-chart Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./PieChart_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "PieChart_FullDetails",
      description: "PieChart_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.PIE_CHART],
      data: {
        values: {
          "Statistic 1": 122,
          "Statistic 2": 222,
          "Statistic 3": 510,
          "Statistic 4": 320,
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a scatter Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Scatter_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Scatter_FullDetails",
      description: "Scatter_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SCATTER],
      data: {
        points: [
          { value: [3.275154, 2.957587], category: "3" },
          { value: [-3.344465, 2.603513], category: "2" },
          { value: [0.355083, -3.376585], category: "2" },
          { value: [1.852435, 3.547351], category: "1" },
          { value: [-2.078973, 2.552013], category: "1" },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a funnel Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Funnel_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Funnel_FullDetails",
      description: "Funnel_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FUNNEL],
      data: {
        values: {
          "Statistic 1": 122,
          "Statistic 2": 222,
          "Statistic 3": 510,
          "Statistic 4": 320,
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a treemap Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Treemap_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Treemap_FullDetails",
      description: "Treemap_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TREEMAP],
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 100,
            category: "1",
            children: [
              {
                name: "Node 1",
                value: 40,
                category: "2",
                children: [
                  {
                    name: "Node 1.1",
                    value: 20,
                    category: "3",
                  },
                  {
                    name: "Node 1.2",
                    value: 10,
                    category: "4",
                  },
                ],
              },
              {
                name: "Node 1.1",
                value: 30,
                category: "2",
                children: [
                  {
                    name: "Node 1.1.1",
                    value: 15,
                    category: "5",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 50,
            category: "6",
            children: [
              {
                name: "Node 2",
                value: 25,
                category: "7",
                children: [
                  {
                    name: "Node 2.2",
                    value: 12,
                    category: "8",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a sunburst Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Sunburst_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Sunburst_FullDetails",
      description: "Sunburst_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SUNBURST],
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 100,
            category: "1",
            children: [
              {
                name: "Node 1",
                value: 40,
                category: "2",
                children: [
                  {
                    name: "Node 1.1",
                    value: 20,
                    category: "3",
                  },
                  {
                    name: "Node 1.2",
                    value: 10,
                    category: "4",
                  },
                ],
              },
              {
                name: "Node 1.1",
                value: 30,
                category: "2",
                children: [
                  {
                    name: "Node 1.1.1",
                    value: 15,
                    category: "5",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 50,
            category: "6",
            children: [
              {
                name: "Node 2",
                value: 25,
                category: "7",
                children: [
                  {
                    name: "Node 2.2",
                    value: 12,
                    category: "8",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a timeline Visualization JSON with all the details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Timeline_FullDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Timeline_FullDetails",
      description: "Timeline_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TIMELINE],
      data: {
        "2023-10-07": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 1",
              date: "08:00:00",
              type: "Type A",
              author: "Author 1",
              tags: [{ name: "Tag A" }],
              description: "Description of Event 1",
            },
            {
              summary: "Event 2",
              date: "09:00:00",
              type: "Type B",
              author: "Author 2",
            },
          ],
        },
        "2023-10-10": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 3",
              date: "09:00:00",
              type: "Type C",
              author: "Author 3",
            },
            {
              summary: "Event 4",
              date: "10:00:00",
              type: "Type D",
              author: "Author 4",
            },
            {
              summary: "Event 5",
              date: "10:00:00",
              type: "Type E",
              author: "Author 5",
            },
          ],
        },
        "2023-10-08": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 6",
              date: "11:00:00",
              type: "Type F",
              author: "Author 6",
            },
            {
              summary: "Event 7",
              date: "11:00:00",
              type: "Type G",
              author: "Author 7",
            },
            {
              summary: "Event 8",
              date: "12:00:00",
              type: "Type H",
              author: "Author 8",
            },
          ],
        },
        "2023-10-06 ": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 9",
              date: "12:00:00",
              type: "Type I",
              author: "Author 9",
            },
            {
              summary: "Event 10",
              date: "13:00:00",
              type: "Type J",
              author: "Author 10",
            },
          ],
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });

  it("It creates a hierarchical-edge-bundling Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./HEB_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "HEB_PartialDetails",
      description: "HEB_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "HEB_PartialDetails",
      description: "HEB_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
          },
          {
            category: "2",
            name: "Node2",
          },
          {
            category: "3",
            name: "Node3",
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
          },
          {
            source: "Node2",
            target: "Node3",
            value: 1,
          },
          {
            source: "Node3",
            target: "Node2",
            value: 1,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a force-directed-graph Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./FLG_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "FLG_PartialDetails",
      description: "FLG_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FORCE_DIRECTED_GRAPH],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "FLG_PartialDetails",
      description: "FLG_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FORCE_DIRECTED_GRAPH],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
          },
          {
            category: "2",
            name: "Node2",
          },
          {
            category: "3",
            name: "Node3",
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
          },
          {
            source: "Node2",
            target: "Node3",
            value: 1,
          },
          {
            source: "Node3",
            target: "Node2",
            value: 1,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });

  it("It creates a sankey Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./SANKEY_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sankey_PartialDetails",
      description: "Sankey_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SANKEY],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Sankey_PartialDetails",
      description: "Sankey_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SANKEY],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
          },
          {
            category: "2",
            name: "Node2",
          },
          {
            category: "3",
            name: "Node3",
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
          },
          {
            source: "Node2",
            target: "Node3",
            value: 1,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a word-cloud Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Wordcloud_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.WORD_CLOUD],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.WORD_CLOUD],
      data: {
        words: [
          {
            name: "Word1",
            value: 390,
          },
          {
            name: "Word2",
            value: 275,
          },
          {
            name: "Word3",
            value: 100,
          },
          {
            name: "Word4",
            value: 1000,
          },
          {
            name: "Word5",
            value: 600,
          },
          {
            name: "Word6",
            value: 146,
          },
          {
            name: "Word7",
            value: 712,
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a calendar Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Calendar_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Calendar_PartialDetails",
      description: "Calendar_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.CALENDAR],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Calendar_PartialDetails",
      description: "Calendar_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.CALENDAR],
      data: {
        calendar: [
          {
            date: "1939-09-02",
            value: 1,
            category: "1",
          },
          {
            date: "1939-09-07",
            value: 1,
            category: "2",
          },
          {
            date: "1939-09-17",
            value: 1,
            category: "3",
          },
          {
            date: "1939-10-06",
            value: 1,
            category: "1",
          },
          {
            date: "1939-10-07",
            value: 1,
            category: "1",
          },
          {
            date: "1939-10-14",
            value: 1,
            category: "5",
          },
          {
            date: "1939-10-17",
            value: 1,
            category: "1",
          },
          {
            date: "1939-10-22",
            value: 1,
            category: "6",
          },
          {
            date: "1939-10-28",
            value: 1,
            category: "1",
          },
          {
            date: "1939-11-04",
            value: 1,
            category: "7",
          },
          {
            date: "1939-11-28",
            value: 1,
            category: "3",
          },
          {
            date: "1939-12-05",
            value: 1,
            category: "3",
          },
          {
            date: "1939-12-11",
            value: 1,
            category: "2",
          },
          {
            date: "1939-12-16",
            value: 1,
            category: "2",
          },
          {
            date: "1939-12-23",
            value: 1,
            category: "1",
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a matrix Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Matrix_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Matrix_PartialDetails",
      description: "Matrix_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.MATRIX],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Matrix_PartialDetails",
      description: "Matrix_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.MATRIX],
      data: {
        nodes: [
          {
            category: "1",
            name: "Node1",
            labels: [
              {
                name: "Label1",
                value: 1,
                properties: {
                  style: {
                    "font-weight": "bold",
                    "background-color": "#541690",
                    "background-color1": "541690",
                  },
                },
              },
              {
                name: "Label2",
                value: 0,
                properties: [
                  {
                    style: {
                      "font-weight": "bold",
                      "background-color": "#541690",
                      "background-color1": "541690",
                    },
                  },
                ],
              },
            ],
          },
          {
            category: "2",
            name: "Node2",
            labels: [
              {
                name: "Label3",
                value: 1,
                properties: {
                  style: {
                    "font-weight": "bold",
                    "background-color": "#541690",
                    "background-color1": "541690",
                  },
                },
              },
              {
                name: "Label4",
                value: 0,
                properties: [
                  {
                    style: {
                      "font-weight": "bold",
                      "background-color": "#541690",
                      "background-color1": "541690",
                    },
                  },
                ],
              },
            ],
          },
        ],
        links: [
          {
            source: "Node1",
            target: "Node2",
            value: 1,
            properties: {
              style: {
                "font-weight": "bold",
                "background-color": "#541690",
                "background-color1": "541690",
              },
              a: "b",
            },
          },
          {
            source: "Node2",
            target: "Node1",
            value: 1,
            properties: {
              style: {
                "font-weight": "bold",
                "background-color": "#541690",
                "background-color1": "541690",
              },
              a: "b",
            },
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a line-chart Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./LineChart_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "LineChart_PartialDetails",
      description: "LineChart_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.LINE_CHART],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "LineChart_PartialDetails",
      description: "LineChart_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.LINE_CHART],
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          "Statistic 1": [120, 132, 101, 134, 90, 230, 210],
          "Statistic 2": [220, 182, 191, 234, 290, 330, 310],
          "Statistic 3": [150, 232, 201, 154, 190, 330, 410],
          "Statistic 4": [320, 332, 301, 334, 390, 330, 320],
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a bar-chart Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./BarChart_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "BarChart_PartialDetails",
      description: "BarChart_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.BAR_CHART],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "BarChart_PartialDetails",
      description: "BarChart_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.BAR_CHART],
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          "Statistic 1": [120, 132, 101, 134, 90, 230, 210],
          "Statistic 2": [220, 182, 191, 234, 290, 330, 310],
          "Statistic 3": [150, 232, 201, 154, 190, 330, 410],
          "Statistic 4": [320, 332, 301, 334, 390, 330, 320],
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a pie-chart Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./PieChart_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "PieChart_PartialDetails",
      description: "PieChart_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.PIE_CHART],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "PieChart_PartialDetails",
      description: "PieChart_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.PIE_CHART],
      data: {
        values: {
          "Statistic 1": 122,
          "Statistic 2": 222,
          "Statistic 3": 510,
          "Statistic 4": 320,
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a scatter Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Scatter_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Scatter_PartialDetails",
      description: "Scatter_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SCATTER],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Scatter_PartialDetails",
      description: "Scatter_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SCATTER],
      data: {
        points: [
          { value: [3.275154, 2.957587], category: "3" },
          { value: [-3.344465, 2.603513], category: "2" },
          { value: [0.355083, -3.376585], category: "2" },
          { value: [1.852435, 3.547351], category: "1" },
          { value: [-2.078973, 2.552013], category: "1" },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a funnel Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Funnel_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Funnel_PartialDetails",
      description: "Funnel_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FUNNEL],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Funnel_PartialDetails",
      description: "Funnel_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FUNNEL],
      data: {
        values: {
          "Statistic 1": 122,
          "Statistic 2": 222,
          "Statistic 3": 510,
          "Statistic 4": 320,
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a treemap Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Treemap_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Treemap_PartialDetails",
      description: "Treemap_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TREEMAP],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Treemap_PartialDetails",
      description: "Treemap_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TREEMAP],
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 100,
            category: "1",
            children: [
              {
                name: "Node 1",
                value: 40,
                category: "2",
                children: [
                  {
                    name: "Node 1.1",
                    value: 20,
                    category: "3",
                  },
                  {
                    name: "Node 1.2",
                    value: 10,
                    category: "4",
                  },
                ],
              },
              {
                name: "Node 1.1",
                value: 30,
                category: "2",
                children: [
                  {
                    name: "Node 1.1.1",
                    value: 15,
                    category: "5",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 50,
            category: "6",
            children: [
              {
                name: "Node 2",
                value: 25,
                category: "7",
                children: [
                  {
                    name: "Node 2.2",
                    value: 12,
                    category: "8",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a sunburst Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Sunburst_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sunburst_PartialDetails",
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SUNBURST],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Sunburst_PartialDetails",
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SUNBURST],
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 100,
            category: "1",
            children: [
              {
                name: "Node 1",
                value: 40,
                category: "2",
                children: [
                  {
                    name: "Node 1.1",
                    value: 20,
                    category: "3",
                  },
                  {
                    name: "Node 1.2",
                    value: 10,
                    category: "4",
                  },
                ],
              },
              {
                name: "Node 1.1",
                value: 30,
                category: "2",
                children: [
                  {
                    name: "Node 1.1.1",
                    value: 15,
                    category: "5",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 50,
            category: "6",
            children: [
              {
                name: "Node 2",
                value: 25,
                category: "7",
                children: [
                  {
                    name: "Node 2.2",
                    value: 12,
                    category: "8",
                  },
                ],
              },
            ],
          },
        ],
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It creates a timeline Visualization JSON with only the data details in the JSON", async () => {
    const filePath = path.resolve(__dirname, "./Timeline_PartialDetails.json");

    const files: FileProperties[] = [
      { filePath: filePath, type: "application/json" },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Timeline_PartialDetails",
      description: "Timeline_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TIMELINE],
    };
    const fileDetails: FileDetails = { fileType: "JSON" };
    const expectedVisualization: VisualizationCreate = {
      projectName: "Test_Project1",
      name: "Timeline_PartialDetails",
      description: "Timeline_PartialDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TIMELINE],
      data: {
        "2023-10-07": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 1",
              date: "08:00:00",
              type: "Type A",
              author: "Author 1",
              tags: [{ name: "Tag A" }],
              description: "Description of Event 1",
            },
            {
              summary: "Event 2",
              date: "09:00:00",
              type: "Type B",
              author: "Author 2",
            },
          ],
        },
        "2023-10-10": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 3",
              date: "09:00:00",
              type: "Type C",
              author: "Author 3",
            },
            {
              summary: "Event 4",
              date: "10:00:00",
              type: "Type D",
              author: "Author 4",
            },
            {
              summary: "Event 5",
              date: "10:00:00",
              type: "Type E",
              author: "Author 5",
            },
          ],
        },
        "2023-10-08": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 6",
              date: "11:00:00",
              type: "Type F",
              author: "Author 6",
            },
            {
              summary: "Event 7",
              date: "11:00:00",
              type: "Type G",
              author: "Author 7",
            },
            {
              summary: "Event 8",
              date: "12:00:00",
              type: "Type H",
              author: "Author 8",
            },
          ],
        },
        "2023-10-06 ": {
          summary: {
            title: "Sample Timeline",
          },
          events: [
            {
              summary: "Event 9",
              date: "12:00:00",
              type: "Type I",
              author: "Author 9",
            },
            {
              summary: "Event 10",
              date: "13:00:00",
              type: "Type J",
              author: "Author 10",
            },
          ],
        },
      },
    };
    const visualization: VisualizationType = (
      await factory
        .getBZL()
        .VisualizationBZL.createOrUpdateFromFiles(
          files,
          allFileDetails,
          visualizationDetails,
          fileDetails
        )
    )[0];
    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });

  
});
