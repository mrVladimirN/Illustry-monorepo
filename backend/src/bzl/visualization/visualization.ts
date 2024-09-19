import Bluebird, { Promise } from 'bluebird';
import _ from 'lodash';
import {
  ExtendedVisualizationType,
  VisualizationCreate,
  VisualizationFilter,
  VisualizationType,
  VisualizationTypesEnum,
  VisualizationUpdate
} from 'types/visualizations';
import { FileDetails, FileProperties } from 'types/files';
import { ExtendedProjectType, ProjectFilter } from 'types/project';
import { ExtendedMongoQuery } from 'types/utils';
import { generateErrorMessage } from 'zod-error';
import {
  excelFilesToVisualizations,
  jsonFilesToVisualizations,
  csvFilesToVisualizations,
  xmlFilesToVisualizations
} from '../../utils/reader';
import { visualizationTypeSchema } from '../../validators/allValidators';
import Factory from '../../factory';
import DbaccInstance from '../../dbacc/lib';
import prettifyZodError from '../../validators/prettifyError';

export default class VisualizationBZL {
  private dbaccInstance: DbaccInstance;

  constructor(dbaccInstance: DbaccInstance) {
    this.dbaccInstance = dbaccInstance;
  }

  createOrUpdate(
    visualization: VisualizationCreate
  ): Promise<VisualizationType> {
    return Promise.resolve()
      .then(() => {
        if (typeof visualization.type === 'string') {
          const visualizationFilter = this.dbaccInstance.Visualization.createFilter({
            name: visualization.name,
            type: visualization.type,
            projectName: visualization.projectName
          });
          return this.dbaccInstance.Visualization.update(
            visualizationFilter,
            visualization
          );
        }
        return Promise.each(visualization.type, (type) => {
          const visualizationFilter = this.dbaccInstance.Visualization.createFilter({
            name: visualization.name,
            type,
            projectName: visualization.projectName
          });
          const visualizationUpdate: VisualizationUpdate = _.cloneDeep(visualization);
          _.set(visualizationUpdate, 'type', type);
          return this.dbaccInstance.Visualization.update(
            visualizationFilter,
            visualizationUpdate
          );
        }).then(() => visualization);
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
      .then((res: ExtendedProjectType) => {
        if (res && res.projects && res.projects.length > 0) {
          if (!fileDetails) {
            throw new Error('No file details was provided');
          }
          switch (fileDetails.fileType) {
            case 'EXCEL':
              return this.excelFileProcessor(
                files,
                allFileDetails,
                res.projects[0].name,
                fileDetails,
                visualizationDetails
              );
            case 'JSON':
              return this.jsonFileProcessor(
                files,
                allFileDetails,
                res.projects[0].name,
                visualizationDetails
              );
            case 'CSV':
              return this.csvFileProcessor(
                files,
                allFileDetails,
                res.projects[0].name,
                fileDetails,
                visualizationDetails
              );
            case 'XML':
              return this.xmlFileProcessor(
                files,
                allFileDetails,
                res.projects[0].name,
                visualizationDetails
              );
            default:
              throw Error('No correct type was provided');
          }
        } else {
          throw new Error('No Active Project');
        }
      })
      .catch((err: unknown) => {
        throw err;
      });
  }

  findOne(filter: VisualizationFilter): Promise<VisualizationType> {
    return Factory.getInstance()
      .getBZL()
      .ProjectBZL.browse({
        isActive: true
      } as ProjectFilter)
      .then((res: ExtendedProjectType) => {
        if (res && res.projects) {
          const activeProjectName = res.projects[0].name;
          _.set(filter, 'projectName', activeProjectName);
          let newFilter: ExtendedMongoQuery = {};
          if (!_.isNil(filter)) {
            newFilter = this.dbaccInstance.Visualization.createFilter(filter);
          }
          return this.dbaccInstance.Visualization.findOne(newFilter);
        }
        throw new Error('No active project');
      });
  }

  browse(filter: VisualizationFilter): Promise<ExtendedVisualizationType> {
    return Factory.getInstance()
      .getBZL()
      .ProjectBZL.browse({
        isActive: true
      } as ProjectFilter)
      .then((res:ExtendedProjectType) => {
        if (res && res.projects) {
          const activeProjectName = res.projects[0].name;
          _.set(filter, 'projectName', activeProjectName);
          let newFilter: ExtendedMongoQuery = {};
          if (!_.isNil(filter)) {
            newFilter = this.dbaccInstance.Visualization.createFilter(filter);
          }
          return this.dbaccInstance.Visualization.browse(newFilter);
        }
        throw new Error('No active project');
      });
  }

  delete(filter: VisualizationFilter): Promise<boolean> {
    let newFilter: ExtendedMongoQuery = {};
    if (!_.isNil(filter)) {
      newFilter = this.dbaccInstance.Visualization.createFilter(filter);
    }
    return Promise.resolve(
      this.dbaccInstance.Visualization.deleteMany(newFilter)
    ).then(() => true);
  }

  private visualizationDetailsProcessor(
    illustrations: unknown[],
    allFileDetails: boolean,
    projectName: string,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.map(illustrations, (ill) => {
      _.set(ill as unknown as VisualizationCreate, 'projectName', projectName);

      if (!allFileDetails) {
        _.forEach(Object.keys(visualizationDetails), (key) => {
          _.set(
            ill as unknown as VisualizationCreate,
            key,
            _.get(visualizationDetails, key)
          );
        });
      }
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
    ).then((illlustrations) => this.visualizationDetailsProcessor(
      illlustrations,
      allFileDetails,
      projectName,
      visualizationDetails
    ));
  }

  private xmlFileProcessor(
    files: FileProperties[],
    allFileDetails: boolean,
    projectName: string,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.resolve(
      xmlFilesToVisualizations(
        files,
        visualizationDetails.type as VisualizationTypesEnum,
        allFileDetails
      )
    ).then((illlustrations) => this.visualizationDetailsProcessor(
      illlustrations,
      allFileDetails,
      projectName,
      visualizationDetails
    ));
  }

  private excelFileProcessor(
    files: FileProperties[],
    allFileDetails: boolean,
    projectName: string,
    fileDetails: FileDetails,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.resolve(
      excelFilesToVisualizations(
        files,
        fileDetails,
        visualizationDetails.type as VisualizationTypesEnum,
        allFileDetails
      )
    ).then((illlustrations) => this.visualizationDetailsProcessor(
      illlustrations,
      allFileDetails,
      projectName,
      visualizationDetails
    ));
  }

  private csvFileProcessor(
    files: FileProperties[],
    allFileDetails: boolean,
    projectName: string,
    fileDetails: FileDetails,
    visualizationDetails: VisualizationUpdate
  ): Bluebird<VisualizationType[]> {
    return Promise.resolve(
      csvFilesToVisualizations(
        files,
        fileDetails,
        visualizationDetails.type as VisualizationTypesEnum,
        allFileDetails
      )
    ).then((illlustrations) => this.visualizationDetailsProcessor(
      illlustrations,
      allFileDetails,
      projectName,
      visualizationDetails
    ));
  }
}