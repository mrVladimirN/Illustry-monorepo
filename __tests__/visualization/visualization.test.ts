import { ProjectCreate } from "types/project";
import _ from "lodash";
import mongoose from "mongoose";
import path from "path";
import { FileDetails, FileProperties } from "types/files";
import {
  VisualizationUpdate,
  VisualizationType,
  VisualizationTypesEnum,
  VisualizationCreate,
  ExtendedVisualizationType,
} from "types/visualizations";
import { copyDirectory } from "../../src/utils/helper";
import Factory from "../../src/factory";

process.env.NODE_ENV = "test";
const factory = Factory.getInstance();
const jsonDirectoryPath = path.resolve(
  __dirname,
  "../../__tests_resources__/json/"
);
const xmlDirectoryPath = path.resolve(
  __dirname,
  "../../__tests_resources__/xml/"
);
const excelDirectoryPath = path.resolve(
  __dirname,
  "../../__tests_resources__/excel/"
);
const csvDirectoryPath = path.resolve(
  __dirname,
  "../../__tests_resources__/csv/"
);
describe("visualizations CRUD", () => {
  beforeAll(async () => {
    const expectedProject: ProjectCreate = {
      name: "Test_Project1",
      description: "Test_ProjectDescription1",
      isActive: true,
    };
    copyDirectory(jsonDirectoryPath, path.resolve(__dirname));
    copyDirectory(xmlDirectoryPath, path.resolve(__dirname));
    copyDirectory(excelDirectoryPath, path.resolve(__dirname));
    copyDirectory(csvDirectoryPath, path.resolve(__dirname));
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
    expect.assertions(2);
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./SANKEY_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Matrix_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Timeline_FullDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./SANKEY_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Matrix_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Timeline_PartialDetails.json");

    const files: FileProperties[] = [{ filePath, type: "application/json" }];
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
  it("It creates a bar-chart Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          Statistic_1: [120, 132, 101, 134, 90, 230, 210],
          Statistic_2: [220, 182, 191, 234, 290, 330, 310],
          Statistic_3: [150, 232, 201, 154, 190, 330, 410],
          Statistic_4: [320, 332, 301, 334, 390, 330, 320],
        },
      },
      name: "BarChart_FullDetails",
      description: "BarChart_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.BAR_CHART],
      projectName: "Test_Project1",
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
  it("It creates a calendar Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
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
      name: "Calendar_FullDetails",
      description: "Calendar_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.CALENDAR],
      projectName: "Test_Project1",
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
  it("It creates a forced-directed-graph Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
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
      name: "FLG_FullDetails",
      description: "FLG_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FORCE_DIRECTED_GRAPH],
      projectName: "Test_Project1",
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
  it("It creates a funnel Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        values: {
          Statistic_1: 122,
          Statistic_2: 222,
          Statistic_3: 510,
          Statistic_4: 320,
        },
      },
      name: "Funnel_FullDetails",
      description: "Funnel_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.FUNNEL],
      projectName: "Test_Project1",
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
  it("It creates a hierarchical-edge-bundling Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
          },
          {
            name: "Node2",
            category: "2",
          },
          {
            name: "Node3",
            category: "3",
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
      name: "HEB_FullDetails",
      description: "HEB_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING],
      projectName: "Test_Project1",
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
  it("It creates a line-chart Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          Statistic_1: [120, 132, 101, 134, 90, 230, 210],
          Statistic_2: [220, 182, 191, 234, 290, 330, 310],
          Statistic_3: [150, 232, 201, 154, 190, 330, 410],
          Statistic_4: [320, 332, 301, 334, 390, 330, 320],
        },
      },
      name: "LineChart_FullDetails",
      description: "LineChart_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.LINE_CHART],
      projectName: "Test_Project1",
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
  it("It creates a pie-chart Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        values: {
          Statistic_1: 122,
          Statistic_2: 222,
          Statistic_3: 510,
          Statistic_4: 320,
        },
      },
      name: "PieChart_FullDetails",
      description: "PieChart_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.PIE_CHART],
      projectName: "Test_Project1",
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
  it("It creates a sankey Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sankey_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
          },
          {
            name: "Node2",
            category: "2",
          },
          {
            name: "Node3",
            category: "3",
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
      name: "Sankey_FullDetails",
      description: "Sankey_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SANKEY],
      projectName: "Test_Project1",
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
  it("It creates a scatter Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        points: [
          {
            category: "3",
            value: [3.275154, 2.957587],
          },
          {
            category: "2",
            value: [-3.344465, 2.603513],
          },
          {
            category: "2",
            value: [0.355083, -3.376585],
          },
          {
            category: "1",
            value: [1.852435, 3.547351],
          },
          {
            category: "1",
            value: [-2.078973, 2.552013],
          },
        ],
      },
      name: "Scatter_FullDetails",
      description: "Scatter_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SCATTER],
      projectName: "Test_Project1",
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
  it("It creates a sunburst Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        nodes: [
          {
            name: "Node Group 1",
            category: "1",
            value: 100,
            children: [
              {
                name: "Node 1",
                category: "2",
                value: 40,
                children: [
                  {
                    name: "Node 1.1",
                    category: "3",
                    value: 20,
                  },
                  {
                    name: "Node 1.2",
                    category: "4",
                    value: 10,
                  },
                ],
              },
              {
                name: "Node 1.1",
                category: "2",
                value: 30,
                children: [
                  {
                    name: "Node 1.1.1",
                    category: "5",
                    value: 15,
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            category: "6",
            value: 50,
            children: [
              {
                name: "Node 2",
                category: "7",
                value: 25,
                children: [
                  {
                    name: "Node 2.2",
                    category: "8",
                    value: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
      name: "Sunburst_FullDetails",
      description: "Sunburst_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.SUNBURST],
      projectName: "Test_Project1",
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
  it("It creates a treemap Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      data: {
        nodes: [
          {
            name: "Node Group 1",
            category: "1",
            value: 100,
            children: [
              {
                name: "Node 1",
                category: "2",
                value: 40,
                children: [
                  {
                    name: "Node 1.1",
                    category: "3",
                    value: 20,
                  },
                  {
                    name: "Node 1.2",
                    category: "4",
                    value: 10,
                  },
                ],
              },
              {
                name: "Node 1.1",
                category: "2",
                value: 30,
                children: [
                  {
                    name: "Node 1.1.1",
                    category: "5",
                    value: 15,
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            category: "6",
            value: 50,
            children: [
              {
                name: "Node 2",
                category: "7",
                value: 25,
                children: [
                  {
                    name: "Node 2.2",
                    category: "8",
                    value: 12,
                  },
                ],
              },
            ],
          },
        ],
      },
      name: "Treemap_FullDetails",
      description: "Treemap_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.TREEMAP],
      projectName: "Test_Project1",
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
  it("It creates a word-cloud Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
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
      name: "Wordcloud_FullDetails",
      description: "Wordcloud_FullDetails description",
      tags: ["full"],
      type: [VisualizationTypesEnum.WORD_CLOUD],
      projectName: "Test_Project1",
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
  it("It creates a matrix Visualization XML with all the details in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Matrix_FullDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {};
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
            labels: [
              {
                name: "Label1",
                value: 1,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Label2",
                value: 0,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Node2",
            category: "2",
            labels: [
              {
                name: "Label3",
                value: 1,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Label4",
                value: 0,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
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
            properties: [
              {
                style: [
                  {
                    "font-weight": ["bold"],
                    "background-color": ["#541690"],
                    "background-color1": ["541690"],
                  },
                ],
                a: ["b"],
              },
            ],
          },
          {
            source: "Node2",
            target: "Node1",
            value: 1,
            properties: [
              {
                style: [
                  {
                    "font-weight": ["bold"],
                    "background-color": ["#541690"],
                    "background-color1": ["541690"],
                  },
                ],
                a: ["b"],
              },
            ],
          },
        ],
      },
      name: "Matrix_FullDetails",
      description: "Matrix_FullDetails description",
      tags: ["full"],
      type: ["matrix"],
      projectName: "Test_Project1",
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
  it("It creates a bar-chart Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "BarChart_PartialDetails",
      description: "BarChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.BAR_CHART,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization: VisualizationCreate = {
      name: "BarChart_PartialDetails",
      projectName: "Test_Project1",
      type: VisualizationTypesEnum.BAR_CHART,
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          Statistic_1: [120, 132, 101, 134, 90, 230, 210],
          Statistic_2: [220, 182, 191, 234, 290, 330, 310],
          Statistic_3: [150, 232, 201, 154, 190, 330, 410],
          Statistic_4: [320, 332, 301, 334, 390, 330, 320],
        },
      },
      description: "BarChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a calendar Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Calendar_PartialDetails",
      description: "Calendar_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.CALENDAR,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Calendar_PartialDetails",
      projectName: "Test_Project1",
      type: VisualizationTypesEnum.CALENDAR,
      data: {
        calendar: [
          {
            category: "1",
            date: "1939-09-02",
            value: 1,
            properties: null,
          },
          {
            category: "2",
            date: "1939-09-07",
            value: 1,
            properties: null,
          },
          {
            category: "3",
            date: "1939-09-17",
            value: 1,
            properties: null,
          },
          {
            category: "1",
            date: "1939-10-06",
            value: 1,
            properties: null,
          },
          {
            category: "1",
            date: "1939-10-07",
            value: 1,
            properties: null,
          },
          {
            category: "5",
            date: "1939-10-14",
            value: 1,
            properties: null,
          },
          {
            category: "1",
            date: "1939-10-17",
            value: 1,
            properties: null,
          },
          {
            category: "6",
            date: "1939-10-22",
            value: 1,
            properties: null,
          },
          {
            category: "1",
            date: "1939-10-28",
            value: 1,
            properties: null,
          },
          {
            category: "7",
            date: "1939-11-04",
            value: 1,
            properties: null,
          },
          {
            category: "3",
            date: "1939-11-28",
            value: 1,
            properties: null,
          },
          {
            category: "3",
            date: "1939-12-05",
            value: 1,
            properties: null,
          },
          {
            category: "2",
            date: "1939-12-11",
            value: 1,
            properties: null,
          },
          {
            category: "2",
            date: "1939-12-16",
            value: 1,
            properties: null,
          },
          {
            category: "1",
            date: "1939-12-23",
            value: 1,
            properties: null,
          },
        ],
      },
      description: "Calendar_PartialDetails description",
      tags: ["full"],
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
  it("It creates a forced-directed-graph Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "FLG_PartialDetails",
      description: "FLG_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "FLG_PartialDetails",
      projectName: "Test_Project1",
      type: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: null },
          { name: "Node2", category: "2", properties: null },
          { name: "Node3", category: "3", properties: null },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "FLG_PartialDetails description",
      tags: ["full"],
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
  it("It creates a funnel Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Funnel_PartialDetails",
      description: "Funnel_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.FUNNEL,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Funnel_PartialDetails",
      projectName: "Test_Project1",
      type: "funnel",
      data: {
        values: {
          Statistic_1: 122,
          Statistic_2: 222,
          Statistic_3: 510,
          Statistic_4: 320,
        },
      },
      description: "Funnel_PartialDetails description",
      tags: ["full"],
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
  it("It creates a hierarchical-edge-bundling Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "HEB_PartialDetails",
      description: "HEB_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "HEB_PartialDetails",
      projectName: "Test_Project1",
      type: "hierarchical-edge-bundling",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: null },
          { name: "Node2", category: "2", properties: null },
          { name: "Node3", category: "3", properties: null },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "HEB_PartialDetails description",
      tags: ["full"],
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
  it("It creates a line-chart Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "LineChart_PartialDetails",
      description: "LineChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.LINE_CHART,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "LineChart_PartialDetails",
      projectName: "Test_Project1",
      type: "line-chart",
      data: {
        headers: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        values: {
          Statistic_1: [120, 132, 101, 134, 90, 230, 210],
          Statistic_2: [220, 182, 191, 234, 290, 330, 310],
          Statistic_3: [150, 232, 201, 154, 190, 330, 410],
          Statistic_4: [320, 332, 301, 334, 390, 330, 320],
        },
      },
      description: "LineChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a pie-chart Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "PieChart_PartialDetails",
      description: "PieChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.PIE_CHART,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "PieChart_PartialDetails",
      projectName: "Test_Project1",
      type: "pie-chart",
      data: {
        values: {
          Statistic_1: 122,
          Statistic_2: 222,
          Statistic_3: 510,
          Statistic_4: 320,
        },
      },
      description: "PieChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a sankey Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sankey_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sankey_PartialDetails",
      description: "Sankey_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SANKEY,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Sankey_PartialDetails",
      projectName: "Test_Project1",
      type: "sankey",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: null },
          { name: "Node2", category: "2", properties: null },
          { name: "Node3", category: "3", properties: null },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
        ],
      },
      description: "Sankey_PartialDetails description",
      tags: ["full"],
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
  it("It creates a scatter Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Scatter_PartialDetails",
      description: "Scatter_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SCATTER,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Scatter_PartialDetails",
      projectName: "Test_Project1",
      type: "scatter",
      data: {
        points: [
          { category: "3", value: [3.275154, 2.957587], properties: null },
          { category: "2", value: [-3.344465, 2.603513], properties: null },
          { category: "2", value: [0.355083, -3.376585], properties: null },
          { category: "1", value: [1.852435, 3.547351], properties: null },
          { category: "1", value: [-2.078973, 2.552013], properties: null },
        ],
      },
      description: "Scatter_PartialDetails description",
      tags: ["full"],
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
  it("It creates a sunburst Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sunburst_PartialDetails",
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SUNBURST,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Sunburst_PartialDetails",
      projectName: "Test_Project1",
      type: "sunburst",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            category: "1",
            value: 100,
            properties: null,
            children: [
              {
                name: "Node 1",
                category: "2",
                value: 40,
                properties: null,
                children: [
                  {
                    name: "Node 1.1",
                    category: "3",
                    value: 20,
                    properties: null,
                    children: null,
                  },
                  {
                    name: "Node 1.2",
                    category: "4",
                    value: 10,
                    properties: null,
                    children: null,
                  },
                ],
              },
              {
                name: "Node 1.1",
                category: "2",
                value: 30,
                properties: null,
                children: [
                  {
                    name: "Node 1.1.1",
                    category: "5",
                    value: 15,
                    properties: null,
                    children: null,
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            category: "6",
            value: 50,
            properties: null,
            children: [
              {
                name: "Node 2",
                category: "7",
                value: 25,
                properties: null,
                children: [
                  {
                    name: "Node 2.2",
                    category: "8",
                    value: 12,
                    properties: null,
                    children: null,
                  },
                ],
              },
            ],
          },
        ],
      },
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
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
  it("It creates a treemap Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Treemap_PartialDetails",
      description: "Treemap_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.TREEMAP,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Treemap_PartialDetails",
      projectName: "Test_Project1",
      type: "treemap",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            category: "1",
            value: 100,
            properties: null,
            children: [
              {
                name: "Node 1",
                category: "2",
                value: 40,
                properties: null,
                children: [
                  {
                    name: "Node 1.1",
                    category: "3",
                    value: 20,
                    properties: null,
                    children: null,
                  },
                  {
                    name: "Node 1.2",
                    category: "4",
                    value: 10,
                    properties: null,
                    children: null,
                  },
                ],
              },
              {
                name: "Node 1.1",
                category: "2",
                value: 30,
                properties: null,
                children: [
                  {
                    name: "Node 1.1.1",
                    category: "5",
                    value: 15,
                    properties: null,
                    children: null,
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            category: "6",
            value: 50,
            properties: null,
            children: [
              {
                name: "Node 2",
                category: "7",
                value: 25,
                properties: null,
                children: [
                  {
                    name: "Node 2.2",
                    category: "8",
                    value: 12,
                    properties: null,
                    children: null,
                  },
                ],
              },
            ],
          },
        ],
      },
      description: "Treemap_PartialDetails description",
      tags: ["full"],
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
  it("It creates a word-cloud Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.WORD_CLOUD,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Wordcloud_PartialDetails",
      projectName: "Test_Project1",
      type: "word-cloud",
      data: {
        words: [
          { name: "Word1", value: 390, properties: null },
          { name: "Word2", value: 275, properties: null },
          { name: "Word3", value: 100, properties: null },
          { name: "Word4", value: 1000, properties: null },
          { name: "Word5", value: 600, properties: null },
          { name: "Word6", value: 146, properties: null },
          { name: "Word7", value: 712, properties: null },
        ],
      },
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
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
  it("It creates a matrix Visualization XML with only the data in the XML", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Matrix_PartialDetails.xml");

    const files: FileProperties[] = [{ filePath, type: "text/xml" }];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Matrix_PartialDetails",
      description: "Matrix_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.MATRIX,
    };
    const fileDetails: FileDetails = { fileType: "XML" };
    const expectedVisualization = {
      name: "Matrix_PartialDetails",
      projectName: "Test_Project1",
      type: "matrix",
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
            properties: null,
            labels: [
              {
                name: "Label1",
                value: 1,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Label2",
                value: 0,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: "Node2",
            category: "2",
            properties: null,
            labels: [
              {
                name: "Label3",
                value: 1,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
                  },
                ],
              },
              {
                name: "Label4",
                value: 0,
                properties: [
                  {
                    style: [
                      {
                        "font-weight": ["bold"],
                        "background-color": ["#541690"],
                        "background-color1": ["541690"],
                      },
                    ],
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
            properties: [
              {
                style: [
                  {
                    "font-weight": ["bold"],
                    "background-color": ["#541690"],
                    "background-color1": ["541690"],
                  },
                ],
                a: ["b"],
              },
            ],
          },
          {
            source: "Node2",
            target: "Node1",
            value: 1,
            properties: [
              {
                style: [
                  {
                    "font-weight": ["bold"],
                    "background-color": ["#541690"],
                    "background-color1": ["541690"],
                  },
                ],
                a: ["b"],
              },
            ],
          },
        ],
      },
      description: "Matrix_PartialDetails description",
      tags: ["full"],
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
  it("It creates a word-cloud Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.WORD_CLOUD,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: false,
      mapping: {
        names: "1",
        values: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      data: {
        words: [
          { name: "Word1", value: 390, properties: "prop1" },
          { name: "Word2", value: 40, properties: "prop2" },
        ],
      },
      name: "Wordcloud_FullDetails",
      description: "Wordcloud_FullDetails description",
      tags: ["full"],
      type: "word-cloud",
      projectName: "Test_Project1",
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
  it("It creates a forced-directed-graph Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "FLG_FullDetails",
      projectName: "Test_Project1",
      type: "force-directed-graph",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "FLG_FullDetails description",
      tags: ["full"],
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
  it("It creates a sankey Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sankey_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.SANKEY,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sankey_FullDetails",
      projectName: "Test_Project1",
      type: "sankey",
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
            properties: "prop1",
          },
          {
            name: "Node2",
            category: "2",
            properties: "prop2",
          },
          {
            name: "Node3",
            category: "3",
            properties: "prop3",
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
      description: "Sankey_FullDetails description",
      tags: ["full"],
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

  it("It creates a hierarchical-edge-bundling Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "HEB_FullDetails",
      projectName: "Test_Project1",
      type: "hierarchical-edge-bundling",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "HEB_FullDetails description",
      tags: ["full"],
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
  it("It creates a calendar Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.CALENDAR,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        dates: "1",
        values: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        categories: "7",
      },
      sheets: "2",
    };
    const expectedVisualization = {
      name: "Calendar_FullDetails",
      projectName: "Test_Project1",
      type: "calendar",
      data: {
        calendar: [
          {
            category: "1",
            date: "1997-10-04",
            value: 1,
            properties: "prop1",
          },
          {
            category: "2",
            date: "1997-11-04",
            value: 2,
            properties: "prop2",
          },
          {
            category: "3",
            date: "1997-12-04",
            value: 3,
            properties: "prop3",
          },
          {
            category: "1",
            date: "1997-05-13",
            value: 1,
            properties: "prop1",
          },
        ],
      },
      description: "Calendar_FullDetails description",
      tags: ["full"],
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
  it("It creates a line-chart Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.LINE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "LineChart_FullDetails",
      projectName: "Test_Project1",
      type: "line-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "LineChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a bar-chart Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.BAR_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "BarChart_FullDetails",
      projectName: "Test_Project1",
      type: "bar-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "BarChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a pie-chart Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.PIE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "PieChart_FullDetails",
      projectName: "Test_Project1",
      type: "pie-chart",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "PieChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a scatter Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.SCATTER,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        values: "2,3",
        categories: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "ScatterChart_FullDetails",
      projectName: "Test_Project1",
      type: "scatter",
      data: {
        points: [
          {
            category: "1",
            value: [1, 2],
            properties: "",
          },
          {
            category: "2",
            value: [1, 2],
            properties: "",
          },
          {
            category: "3",
            value: [1, 2],
            properties: "",
          },
          {
            category: "4",
            value: [1, 2],
            properties: "",
          },
        ],
      },
      description: "ScatterChart_FullDetails description",
      tags: ["full"],
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

  it("It creates a treemap Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.TREEMAP,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "TreemapChart_FullDetails",
      projectName: "Test_Project1",
      type: "treemap",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "TreemapChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a sunburst Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.SUNBURST,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sunburst_FullDetails",
      projectName: "Test_Project1",
      type: "sunburst",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "Sunburst_FullDetails description",
      tags: ["full"],
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
  it("It creates a funnel Visualization EXCEL with all the details in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_FullDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.FUNNEL,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Funnel_FullDetails",
      projectName: "Test_Project1",
      type: "funnel",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "Funnel_FullDetails description",
      tags: ["full"],
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

  it("It creates a word-cloud Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.WORD_CLOUD,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: false,
      mapping: {
        names: "1",
        values: "2",
        properties: "3",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      data: {
        words: [
          { name: "Word1", value: 390, properties: "prop1" },
          { name: "Word2", value: 40, properties: "prop2" },
        ],
      },
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: "word-cloud",
      projectName: "Test_Project1",
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
  it("It creates a forced-directed-graph Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "FLG_PartialDetails",
      description: "FLG_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "FLG_PartialDetails",
      projectName: "Test_Project1",
      type: "force-directed-graph",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "FLG_PartialDetails description",
      tags: ["full"],
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
  it("It creates a sankey Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sankey_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sankey_PartialDetails",
      description: "Sankey_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SANKEY,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sankey_PartialDetails",
      projectName: "Test_Project1",
      type: "sankey",
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
            properties: "prop1",
          },
          {
            name: "Node2",
            category: "2",
            properties: "prop2",
          },
          {
            name: "Node3",
            category: "3",
            properties: "prop3",
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
      description: "Sankey_PartialDetails description",
      tags: ["full"],
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

  it("It creates a hierarchical-edge-bundling Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "HEB_PartialDetails",
      description: "HEB_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "HEB_PartialDetails",
      projectName: "Test_Project1",
      type: "hierarchical-edge-bundling",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "HEB_PartialDetails description",
      tags: ["full"],
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
  it("It creates a calendar Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Calendar_PartialDetails",
      description: "Calendar_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.CALENDAR,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        dates: "1",
        values: "2",
        properties: "3",
        categories: "7",
      },
      sheets: "2",
    };
    const expectedVisualization = {
      name: "Calendar_PartialDetails",
      projectName: "Test_Project1",
      type: "calendar",
      data: {
        calendar: [
          {
            category: "1",
            date: "1997-10-04",
            value: 1,
            properties: "prop1",
          },
          {
            category: "2",
            date: "1997-11-04",
            value: 2,
            properties: "prop2",
          },
          {
            category: "3",
            date: "1997-12-04",
            value: 3,
            properties: "prop3",
          },
          {
            category: "1",
            date: "1997-05-13",
            value: 1,
            properties: "prop1",
          },
        ],
      },
      description: "Calendar_PartialDetails description",
      tags: ["full"],
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
  it("It creates a line-chart Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "LineChart_PartialDetails",
      description: "LineChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.LINE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "LineChart_PartialDetails",
      projectName: "Test_Project1",
      type: "line-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "LineChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a bar-chart Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "BarChart_PartialDetails",
      description: "BarChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.BAR_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "BarChart_PartialDetails",
      projectName: "Test_Project1",
      type: "bar-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "BarChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a pie-chart Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "PieChart_PartialDetails",
      description: "PieChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.PIE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "PieChart_PartialDetails",
      projectName: "Test_Project1",
      type: "pie-chart",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "PieChart_PartialDetails description",
      tags: ["full"],
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

  it("It creates a scatter Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "ScatterChart_PartialDetails",
      description: "ScatterChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SCATTER,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        values: "2,3",
        categories: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "ScatterChart_PartialDetails",
      projectName: "Test_Project1",
      type: "scatter",
      data: {
        points: [
          {
            category: "1",
            value: [1, 2],
            properties: "",
          },
          {
            category: "2",
            value: [1, 2],
            properties: "",
          },
          {
            category: "3",
            value: [1, 2],
            properties: "",
          },
          {
            category: "4",
            value: [1, 2],
            properties: "",
          },
        ],
      },
      description: "ScatterChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a treemap Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Treemap_PartialDetails",
      description: "Treemap_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.TREEMAP,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",

        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Treemap_PartialDetails",
      projectName: "Test_Project1",
      type: "treemap",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "Treemap_PartialDetails description",
      tags: ["full"],
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
  it("It creates a sunburst Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sunburst_PartialDetails",
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SUNBURST,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",
        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sunburst_PartialDetails",
      projectName: "Test_Project1",
      type: "sunburst",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
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
  it("It creates a funnel Visualization EXCEL with only the data in the EXCEL", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_PartialDetails.xlsx");

    const files: FileProperties[] = [
      {
        filePath,
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Funnel_PartialDetails",
      description: "Funnel_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.FUNNEL,
    };
    const fileDetails: FileDetails = {
      fileType: "EXCEL",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Funnel_PartialDetails",
      projectName: "Test_Project1",
      type: "funnel",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "Funnel_PartialDetails description",
      tags: ["full"],
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
  it("It creates a word-cloud Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.WORD_CLOUD,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: false,
      mapping: {
        names: "1",
        values: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      data: {
        words: [
          { name: "Word1", value: 390, properties: "prop1" },
          { name: "Word2", value: 40, properties: "prop2" },
        ],
      },
      name: "Wordcloud_FullDetails",
      description: "Wordcloud_FullDetails description",
      tags: ["full"],
      type: "word-cloud",
      projectName: "Test_Project1",
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
  it("It creates a forced-directed-graph Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "FLG_FullDetails",
      projectName: "Test_Project1",
      type: "force-directed-graph",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "FLG_FullDetails description",
      tags: ["full"],
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
  it("It creates a sankey Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sankey_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.SANKEY,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sankey_FullDetails",
      projectName: "Test_Project1",
      type: "sankey",
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
            properties: "prop1",
          },
          {
            name: "Node2",
            category: "2",
            properties: "prop2",
          },
          {
            name: "Node3",
            category: "3",
            properties: "prop3",
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
      description: "Sankey_FullDetails description",
      tags: ["full"],
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

  it("It creates a hierarchical-edge-bundling Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "HEB_FullDetails",
      projectName: "Test_Project1",
      type: "hierarchical-edge-bundling",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "HEB_FullDetails description",
      tags: ["full"],
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
  it("It creates a calendar Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.CALENDAR,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        dates: "1",
        values: "2",
        properties: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        categories: "7",
      },
      sheets: "2",
    };
    const expectedVisualization = {
      name: "Calendar_FullDetails",
      projectName: "Test_Project1",
      type: "calendar",
      data: {
        calendar: [
          {
            category: "1",
            date: "1997-05-13",
            value: 1,
            properties: "prop1",
          },
          {
            category: "2",
            date: "1997-11-05",
            value: 2,
            properties: "prop2",
          },
          {
            category: "3",
            date: "1997-12-05",
            value: 3,
            properties: "prop3",
          },
        ],
      },
      description: "Calendar_FullDetails description",
      tags: ["full"],
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
  it("It creates a line-chart Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.LINE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "LineChart_FullDetails",
      projectName: "Test_Project1",
      type: "line-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "LineChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a bar-chart Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.BAR_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "BarChart_FullDetails",
      projectName: "Test_Project1",
      type: "bar-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "BarChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a pie-chart Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.PIE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "PieChart_FullDetails",
      projectName: "Test_Project1",
      type: "pie-chart",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "PieChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a scatter Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.SCATTER,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        values: "2,3",
        categories: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "ScatterChart_FullDetails",
      projectName: "Test_Project1",
      type: "scatter",
      data: {
        points: [
          {
            category: "1",
            value: [1, 2],
            properties: "",
          },
          {
            category: "2",
            value: [1, 2],
            properties: "",
          },
          {
            category: "3",
            value: [1, 2],
            properties: "",
          },
          {
            category: "4",
            value: [1, 2],
            properties: "",
          },
        ],
      },
      description: "ScatterChart_FullDetails description",
      tags: ["full"],
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

  it("It creates a treemap Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.TREEMAP,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "TreemapChart_FullDetails",
      projectName: "Test_Project1",
      type: "treemap",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "TreemapChart_FullDetails description",
      tags: ["full"],
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
  it("It creates a sunburst Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.SUNBURST,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sunburst_FullDetails",
      projectName: "Test_Project1",
      type: "sunburst",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "Sunburst_FullDetails description",
      tags: ["full"],
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
  it("It creates a funnel Visualization CSV with all the details in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_FullDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = true;
    const visualizationDetails: VisualizationUpdate = {
      type: VisualizationTypesEnum.FUNNEL,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Funnel_FullDetails",
      projectName: "Test_Project1",
      type: "funnel",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "Funnel_FullDetails description",
      tags: ["full"],
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

  it("It creates a word-cloud Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Wordcloud_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.WORD_CLOUD,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: false,
      mapping: {
        names: "1",
        values: "2",
        properties: "3",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      data: {
        words: [
          { name: "Word1", value: 390, properties: "prop1" },
          { name: "Word2", value: 40, properties: "prop2" },
        ],
      },
      name: "Wordcloud_PartialDetails",
      description: "Wordcloud_PartialDetails description",
      tags: ["full"],
      type: "word-cloud",
      projectName: "Test_Project1",
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
  it("It creates a forced-directed-graph Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./FLG_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "FLG_PartialDetails",
      description: "FLG_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "FLG_PartialDetails",
      projectName: "Test_Project1",
      type: "force-directed-graph",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "FLG_PartialDetails description",
      tags: ["full"],
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
  it("It creates a sankey Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sankey_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sankey_PartialDetails",
      description: "Sankey_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SANKEY,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sankey_PartialDetails",
      projectName: "Test_Project1",
      type: "sankey",
      data: {
        nodes: [
          {
            name: "Node1",
            category: "1",
            properties: "prop1",
          },
          {
            name: "Node2",
            category: "2",
            properties: "prop2",
          },
          {
            name: "Node3",
            category: "3",
            properties: "prop3",
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
      description: "Sankey_PartialDetails description",
      tags: ["full"],
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

  it("It creates a hierarchical-edge-bundling Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./HEB_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "HEB_PartialDetails",
      description: "HEB_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        nodes: "1",
        categories: "2",
        properties: "3",
        sources: "7",
        targets: "8",
        values: "9",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "HEB_PartialDetails",
      projectName: "Test_Project1",
      type: "hierarchical-edge-bundling",
      data: {
        nodes: [
          { name: "Node1", category: "1", properties: "prop1" },
          { name: "Node2", category: "2", properties: "prop2" },
          { name: "Node3", category: "3", properties: "prop3" },
        ],
        links: [
          { source: "Node1", target: "Node2", value: 1 },
          { source: "Node2", target: "Node3", value: 1 },
          { source: "Node3", target: "Node2", value: 1 },
        ],
      },
      description: "HEB_PartialDetails description",
      tags: ["full"],
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
  it("It creates a calendar Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Calendar_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Calendar_PartialDetails",
      description: "Calendar_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.CALENDAR,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      separator: ",",
      includeHeaders: true,
      mapping: {
        dates: "1",
        values: "2",
        properties: "3",
        categories: "7",
      },
      sheets: "2",
    };
    const expectedVisualization = {
      name: "Calendar_PartialDetails",
      projectName: "Test_Project1",
      type: "calendar",
      data: {
        calendar: [
          {
            category: "1",
            date: "1997-05-13",
            value: 1,
            properties: "prop1",
          },
          {
            category: "2",
            date: "1997-11-05",
            value: 2,
            properties: "prop2",
          },
          {
            category: "3",
            date: "1997-12-05",
            value: 3,
            properties: "prop3",
          },
        ],
      },
      description: "Calendar_PartialDetails description",
      tags: ["full"],
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
  it("It creates a line-chart Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./LineChart_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "LineChart_PartialDetails",
      description: "LineChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.LINE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "LineChart_PartialDetails",
      projectName: "Test_Project1",
      type: "line-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "LineChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a bar-chart Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./BarChart_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "BarChart_PartialDetails",
      description: "BarChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.BAR_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        data: "2,3,7,8",
        headers: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "BarChart_PartialDetails",
      projectName: "Test_Project1",
      type: "bar-chart",
      data: {
        headers: ["1", "2", "3", "4"],
        values: {
          first: [1, 2, 3],
          second: [1, 2, 3],
          third: [1, 2, 3],
          forth: [1, 2, 3],
        },
      },
      description: "BarChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a pie-chart Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./PieChart_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "PieChart_PartialDetails",
      description: "PieChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.PIE_CHART,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "PieChart_PartialDetails",
      projectName: "Test_Project1",
      type: "pie-chart",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "PieChart_PartialDetails description",
      tags: ["full"],
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

  it("It creates a scatter Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Scatter_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "ScatterChart_PartialDetails",
      description: "ScatterChart_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SCATTER,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        values: "2,3",
        categories: "1",
        visualizationName: "4",
        visualizationDescription: "5",
        visualizationTags: "6",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "ScatterChart_PartialDetails",
      projectName: "Test_Project1",
      type: "scatter",
      data: {
        points: [
          {
            category: "1",
            value: [1, 2],
            properties: "",
          },
          {
            category: "2",
            value: [1, 2],
            properties: "",
          },
          {
            category: "3",
            value: [1, 2],
            properties: "",
          },
          {
            category: "4",
            value: [1, 2],
            properties: "",
          },
        ],
      },
      description: "ScatterChart_PartialDetails description",
      tags: ["full"],
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
  it("It creates a treemap Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Treemap_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Treemap_PartialDetails",
      description: "Treemap_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.TREEMAP,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",

        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Treemap_PartialDetails",
      projectName: "Test_Project1",
      type: "treemap",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "Treemap_PartialDetails description",
      tags: ["full"],
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
  it("It creates a sunburst Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Sunburst_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Sunburst_PartialDetails",
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.SUNBURST,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        names: "1",
        values: "2",
        categories: "3",
        children: "7,8",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Sunburst_PartialDetails",
      projectName: "Test_Project1",
      type: "sunburst",
      data: {
        nodes: [
          {
            name: "Node Group 1",
            value: 1,
            category: "2",
            properties: "",
            children: [
              {
                name: "Node 1",
                value: 1,
                category: "2",
                properties: "",
                children: [
                  {
                    name: "Node 1.1",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                  {
                    name: "Node 1.2",
                    value: 1,
                    category: "2",
                    properties: "",
                  },
                ],
              },
            ],
          },
          {
            name: "Node group 2",
            value: 2,
            category: "5",
            properties: "",
            children: [
              {
                name: "Node 2.2",
                value: 2,
                category: "3",
                properties: "",
              },
            ],
          },
        ],
      },
      description: "Sunburst_PartialDetails description",
      tags: ["full"],
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
  it("It creates a funnel Visualization CSV with only the data in the CSV", async () => {
    expect.assertions(2);
    const filePath = path.resolve(__dirname, "./Funnel_PartialDetails.csv");

    const files: FileProperties[] = [
      {
        filePath,
        type: "text/csv",
      },
    ];
    const allFileDetails: boolean = false;
    const visualizationDetails: VisualizationUpdate = {
      name: "Funnel_PartialDetails",
      description: "Funnel_PartialDetails description",
      tags: ["full"],
      type: VisualizationTypesEnum.FUNNEL,
    };
    const fileDetails: FileDetails = {
      fileType: "CSV",
      includeHeaders: true,
      mapping: {
        values: "2",
        names: "1",
      },
      sheets: "1",
    };
    const expectedVisualization = {
      name: "Funnel_PartialDetails",
      projectName: "Test_Project1",
      type: "funnel",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "Funnel_PartialDetails description",
      tags: ["full"],
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

  it("It finds one visualization", async () => {
    expect.assertions(2);
    const expectedVisualization = {
      name: "Funnel_PartialDetails",
      projectName: "Test_Project1",
      type: "funnel",
      data: {
        values: {
          first: 1,
          second: 1,
          third: 1,
          forth: 1,
        },
      },
      description: "Funnel_PartialDetails description",
      tags: ["full"],
    };

    const visualization: VisualizationType = await factory
      .getBZL()
      .VisualizationBZL.findOne({
        name: "Funnel_PartialDetails",
        type: "funnel",
      });

    expect(!_.isNil(visualization)).toBe(true);
    expect(_.isMatch(visualization, expectedVisualization)).toBe(true);
  });
  it("It browse visualizations with different filters", async () => {
    expect.assertions(8);
    const expectedVisualization1 = {
      name: "Funnel_PartialDetails",
      type: VisualizationTypesEnum.FUNNEL,
      description: "Funnel_PartialDetails description",
      tags: ["full"],
    };

    const visualization1: ExtendedVisualizationType = await factory
      .getBZL()
      .VisualizationBZL.browse({
        name: "Funnel_PartialDetails",
        type: VisualizationTypesEnum.FUNNEL,
      });
    expect(!_.isNil(visualization1)).toBe(true);
    expect(
      _.isMatch(
        (visualization1.visualizations as VisualizationType[])[0],
        expectedVisualization1
      )
    ).toBe(true);
    const expectedVisualization2 = {
      name: "Funnel_PartialDetails",
      type: VisualizationTypesEnum.FUNNEL,
      description: "Funnel_PartialDetails description",
      tags: ["full"],
    };

    const visualization2: ExtendedVisualizationType = await factory
      .getBZL()
      .VisualizationBZL.browse({
        text: "Funnel_PartialDetails",
      });
    expect(!_.isNil(visualization2)).toBe(true);
    expect(
      _.isMatch(
        (visualization2.visualizations as VisualizationType[])[0],
        expectedVisualization2
      )
    ).toBe(true);
    const visualization3: ExtendedVisualizationType = await factory
      .getBZL()
      .VisualizationBZL.browse({
        text: "randooooom",
      });
    expect(!_.isNil(visualization2)).toBe(true);
    expect(
      _.isMatch((visualization3.visualizations as VisualizationType[])[0], [])
    ).toBe(true);
    const expectedVisualization4 = {
      name: "BarChart_FullDetails",
      type: VisualizationTypesEnum.BAR_CHART,
      description: "BarChart_FullDetails description",
      tags: ["full"],
    };

    const visualization4: ExtendedVisualizationType = await factory
      .getBZL()
      .VisualizationBZL.browse({
        sort: {
          element: "name",
          sortOrder: 1,
        },
      });
    expect(!_.isNil(visualization4)).toBe(true);
    expect(
      _.isMatch(
        (visualization4.visualizations as VisualizationType[])[0],
        expectedVisualization4
      )
    ).toBe(true);
  });
  it("It delets one visualization", async () => {
    expect.assertions(2);
    const visualization: boolean = await factory
      .getBZL()
      .VisualizationBZL.delete({
        name: "Funnel_PartialDetails",
        type: "funnel",
      });

    expect(!_.isNil(visualization)).toBe(true);
    expect(visualization).toBe(true);
  });
});
