import { Promise } from "bluebird";

import { DbaccInstance } from "../../dbacc/lib";
import _ from "lodash";
import { readFiles } from "../../utils/reader";
import { Factory } from "../../factory";
import { NoDataFoundError } from "../../errors/noDataFoundError";
import { ExtendedVisualizationType, VisualizationCreate, VisualizationFilter, VisualizationType,VisualizationUpdate } from "types/visualizations";
import { FileProperties } from "types/files";
import { ProjectFilter } from "types/project";
import { ExtendedMongoQuery } from "types/utils";
export class VisualizationBZL {
  private dbaccInstance: DbaccInstance;
  constructor(dbaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaccInstance;
  }

  createOrUpdate(Visualization: VisualizationCreate): Promise<VisualizationType> {
    console.log("pe aici nu?")
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
    files: FileProperties[]
  ): Promise<VisualizationType[]> {
    return Factory.getInstance()
      .getBZL()
      .ProjectBZL.browse({ isActive: true } as ProjectFilter)
      .then((res) => {
        if (res && res.projects && res.projects.length > 0) {
          return Promise.resolve(readFiles(files)).then((illlustrations) => {
            return Promise.map(illlustrations, (ill) => {
              _.set(
                ill as unknown as VisualizationCreate,
                "projectName",
                res && res.projects && res.projects[0].name
              );
              return this.createOrUpdate(ill as unknown as VisualizationCreate);
            });
          });
        } else {
          throw new Error("No Active Project");
        }
      })
      .catch(err => {
        throw err
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
}
