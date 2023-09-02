declare module "types/files" {
    export interface AcceptedFile {
        fileType: "CSV" | "JSON";
        files?: unknown;
    }
    export interface FileProperties {
        filePath: string;
        type: string;
        delimiter?: string;
    }
}
declare module "types/utils" {
    export interface with_id {
        id: string;
    }
    export interface with_optional_id {
        id?: string;
    }
    export interface with_version {
        __v: number;
    }
    export interface with_optional_version {
        __v?: number;
    }
    export type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
    export type ExtendedMongoQuery = {
        query?: {
            [key: string]: string | object;
        };
        page?: number;
        sort?: {
            [sortField: string]: string | number;
        };
        per_page?: number;
    };
    export type MongoQuery = {
        [key: string]: string | object;
    };
    export interface with_optional_properties {
        properties?: object | object[] | string;
    }
}
declare module "types/project" {
    import { with_optional_id, with_optional_version, with_id, DeepPartial } from "types/utils";
    interface ProjectData {
        name: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
    }
    export interface ProjectCreate extends ProjectData, with_optional_id, with_optional_version {
    }
    export interface ProjectType extends ProjectData, with_id, with_optional_version {
    }
    export interface ExtendedProjectType {
        projects?: ProjectType[];
        pagination?: {
            count: number;
            pageCount: number;
        };
    }
    export interface ProjectUpdate extends DeepPartial<ProjectType> {
    }
    export interface ProjectFilter {
        name?: string;
        text?: string;
        page?: number;
        per_page?: number;
        isActive?: boolean;
        sort?: {
            element: string;
            sortOrder: string | number;
        };
    }
}
declare module "types/visualizations" {
    import { DeepPartial, with_id, with_optional_id, with_optional_version, with_optional_properties } from "types/utils";
    export interface WordType extends with_optional_properties {
        name: string;
        value: number;
    }
    export interface WordCloudData {
        words: WordType[];
    }
    export interface CalendarType extends with_optional_properties {
        date: string;
        value: number;
        category: string;
    }
    export interface CalendarData {
        calendar: CalendarType[];
    }
    export interface Node extends with_optional_properties {
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
    export enum VisualizationTypesEnum {
        WORLD_CLOUD = "word-cloud",
        FORCE_DIRECTED_GRAPH = "force-directed-graph",
        SANKEY = "sankey",
        CALENDAR = "calendar",
        HIERARCHICAL_EDGE_BUNDLING = "hierarchical-edge-bundling",
        MATRIX = "matrix"
    }
    interface VisualizationData {
        projectName: string;
        type: VisualizationTypesEnum | VisualizationTypesEnum[];
        description?: string;
        name: string;
        tags?: string[];
        data: WordCloudData | NodeLinkData | CalendarData;
        createdAt?: Date;
        updatedAt?: Date;
    }
    export interface VisualizationCreate extends VisualizationData, with_optional_id, with_optional_version {
    }
    export interface VisualizationType extends VisualizationData, with_id, with_optional_version {
    }
    export interface ExtendedVisualizationType {
        visualizations?: VisualizationType[];
        pagination?: {
            count: number;
            pageCount: number;
        };
    }
    export interface VisualizationUpdate extends DeepPartial<VisualizationType> {
    }
    export interface VisualizationFilter {
        projectName?: string;
        type?: string | string[];
        name?: string;
        tags?: string;
        text?: string;
        page?: number;
        sort?: {
            element: string;
            sortOrder: string | number;
        };
    }
}
declare module "index" {
    export { AcceptedFile, FileProperties } from "types/files";
    export { ProjectCreate, ProjectFilter, ProjectType, ProjectUpdate, ExtendedProjectType, } from "types/project";
    export { VisualizationCreate, VisualizationFilter, VisualizationType, VisualizationTypesEnum, VisualizationUpdate, ExtendedVisualizationType, Node, Link, NodeLinkData, WordType, WordCloudData, CalendarType, CalendarData, } from "types/visualizations";
    export { with_id, with_optional_id, with_optional_properties, with_optional_version, with_version, ExtendedMongoQuery, MongoQuery, DeepPartial, } from "types/utils";
}
