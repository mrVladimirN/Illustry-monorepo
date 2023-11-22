import Bluebird, { Promise } from "bluebird";

import { DbaccInstance } from "../../dbacc/lib";
import _ from "lodash";
import { Factory } from "../../factory";
import { NoDataFoundError } from "../../errors/noDataFoundError";
import {
  ExtendedVisualizationType,
  VisualizationCreate,
  VisualizationFilter,
  VisualizationType,
  VisualizationTypesEnum,
  VisualizationUpdate,
} from "types/visualizations";
import { FileDetails, FileProperties } from "types/files";
import { ProjectFilter } from "types/project";
import { ExtendedMongoQuery } from "types/utils";
import {
  exelFilesToVisualizations,
  jsonFilesToVisualizations,
} from "../../utils/reader";
import { visualizationTypeSchema } from "../../validators/allValidators";
import { generateErrorMessage } from "zod-error";
import { prettifyZodError } from "../../validators/prettifyError";

export class VisualizationBZL {
  private dbaccInstance: DbaccInstance;
  constructor(dbaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaccInstance;
  }

  createOrUpdate(
    Visualization: VisualizationCreate
  ): Promise<VisualizationType> {
    return Promise.resolve(
      Factory.getInstance()
        .getBZL()
        .ProjectBZL.findByName({ name: Visualization.projectName })
    )
      .then((res) => {
        if (!_.isNil(res) || !_.isEmpty(res)) {
          if (typeof Visualization.type === "string") {
            const VisualizationFilter =
              this.dbaccInstance.Visualization.createFilter({
                name: Visualization.name,
                type: Visualization.type,
                projectName: Visualization.projectName,
              });
            return this.dbaccInstance.Visualization.update(
              VisualizationFilter,
              Visualization
            );
          } else {
            return Promise.each(Visualization.type, (type) => {
              const VisualizationFilter =
                this.dbaccInstance.Visualization.createFilter({
                  name: Visualization.name,
                  type: type,
                  projectName: Visualization.projectName,
                });
              const VisualizationUpdate: VisualizationUpdate =
                _.cloneDeep(Visualization);
              _.set(VisualizationUpdate, "type", type);
              return this.dbaccInstance.Visualization.update(
                VisualizationFilter,
                VisualizationUpdate
              );
            }).then(() => {
              return Visualization;
            });
          }
        } else {
          throw new NoDataFoundError(
            `No project with name ${Visualization.projectName} was found`
          );
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  createOrUpdateFromFiles(
    files: FileProperties[],
    allFileDetails: boolean,
    visualizationDetails: VisualizationUpdate,
    fileDetails: FileDetails
  ): Promise<VisualizationType[]> {
    return Factory.getInstance()
      .getBZL()
      .ProjectBZL.browse({ isActive: true } as ProjectFilter)
      .then((res) => {
        if (res && res.projects && res.projects.length > 0) {
          if (!fileDetails) {
            throw new Error("No file details was provided");
          }
          switch (fileDetails.fileType) {
            case "EXEL":
              return this.exelFileProcessor(
                files,
                allFileDetails,
                res.projects[0].name,
                fileDetails,
                visualizationDetails
              );
            case "JSON":
              return this.jsonFileProcessor(
                files,
                allFileDetails,
                res.projects[0].name,
                visualizationDetails
              );
          }
        } else {
          throw new Error("No Active Project");
        }
      })
      .catch((err) => {
        throw err;
      });
  }

  findOne(filter: VisualizationFilter): Promise<VisualizationType> {
    return Factory.getInstance()
      .getBZL()
      .ProjectBZL.browse({
        isActive: true,
      } as ProjectFilter)
      .then((res) => {
        if (res && res.projects) {
          const activeProjectName = res.projects[0].name;
          filter.projectName = activeProjectName;
          let newFilter: ExtendedMongoQuery = {};
          if (!_.isNil(filter)) {
            newFilter = this.dbaccInstance.Visualization.createFilter(filter);
          }
          return this.dbaccInstance.Visualization.findOne(newFilter);
        } else {
          throw new Error("No active project");
        }
      });
  }

  browse(filter: VisualizationFilter): Promise<ExtendedVisualizationType> {
    return Factory.getInstance()
      .getBZL()
      .ProjectBZL.browse({
        isActive: true,
      } as ProjectFilter)
      .then((res) => {
        if (res && res.projects) {
          const activeProjectName = res.projects[0].name;
          filter.projectName = activeProjectName;
          let newFilter: ExtendedMongoQuery = {};
          if (!_.isNil(filter)) {
            newFilter = this.dbaccInstance.Visualization.createFilter(filter);
          }
          return this.dbaccInstance.Visualization.browse(newFilter);
        } else {
          throw new Error("No active project");
        }
      });
  }

  delete(filter: VisualizationFilter): Promise<boolean> {
    let newFilter: ExtendedMongoQuery = {};
    if (!_.isNil(filter)) {
      newFilter = this.dbaccInstance.Visualization.createFilter(filter);
    }
    return Promise.resolve(
      this.dbaccInstance.Visualization.deleteMany(newFilter)
    ).then(() => {
      return true;
    });
  }

  private visualizationDetailsProcessor(
    illustrations: unknown[],
    allFileDetails: boolean,
    projectName: string,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.map(illustrations, (ill) => {
      _.set(ill as unknown as VisualizationCreate, "projectName", projectName);

      if (!allFileDetails) {
        _.forEach(Object.keys(visualizationDetails), (key) => {
          _.set(
            ill as unknown as VisualizationCreate,
            key,
            _.get(visualizationDetails, key)
          );
        });
      }
      console.log(ill)
      const validVisualization = visualizationTypeSchema.safeParse(ill);

      if (!validVisualization.success) {
        const errorMessage = generateErrorMessage(
          validVisualization.error.issues,
          prettifyZodError()
        );
        throw new Error(errorMessage);
      } else {
        return this.createOrUpdate(ill as unknown as VisualizationCreate);
      }
    });
  }

  private jsonFileProcessor(
    files: FileProperties[],
    allFileDetails: boolean,
    projectName: string,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.resolve(
      jsonFilesToVisualizations(
        files,
        visualizationDetails.type as VisualizationTypesEnum,
        allFileDetails
      )
    ).then((illlustrations) => {
      return this.visualizationDetailsProcessor(
        illlustrations,
        allFileDetails,
        projectName,
        visualizationDetails
      );
    });
  }
  private exelFileProcessor(
    files: FileProperties[],
    allFileDetails: boolean,
    projectName: string,
    fileDetails: FileDetails,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.resolve(
      exelFilesToVisualizations(
        files,
        fileDetails,
        visualizationDetails.type as VisualizationTypesEnum,
        allFileDetails
      )
    ).then((illlustrations) => {
      return this.visualizationDetailsProcessor(
        illlustrations,
        allFileDetails,
        projectName,
        visualizationDetails
      );
    });
  }
}
