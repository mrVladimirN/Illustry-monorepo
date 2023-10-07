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
    export interface with_optional_labels {
        labels?: {
            name: string;
            value: number;
            properties?: object | object[] | string;
        }[];
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
    import { DeepPartial, with_id, with_optional_id, with_optional_version, with_optional_properties, with_optional_labels } from "types/utils";
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
    export interface TimelineEventTag {
        name: string;
    }
    export interface TimelineEvent {
        summary: string;
        date: string;
        type: string;
        author: string;
        tags?: TimelineEventTag[];
        description?: string;
    }
    export interface TimelineData {
        [date: string]: {
            summary?: {
                title?: string;
            };
            events: TimelineEvent[];
        };
    }
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
    export interface AxisChartData {
        headers: string[];
        values: {
            [key: string]: number[];
        };
    }
    export interface ScatterPoint extends with_optional_properties {
        value: [number, number];
        category: string;
    }
    export interface ScatterData {
        points: ScatterPoint[];
    }
    export interface PieChartData {
        values: {
            [key: string]: number;
        };
    }
    export interface FunnelData {
        values: {
            [key: string]: number;
        };
    }
    export interface HierarchyNode extends with_optional_properties {
        name: string;
        value: number;
        category: string;
        children?: HierarchyNode[];
    }
    export interface HierarchyData {
        nodes: HierarchyNode[];
    }
    export const enum VisualizationTypesEnum {
        WORLD_CLOUD = "word-cloud",
        FORCE_DIRECTED_GRAPH = "force-directed-graph",
        SANKEY = "sankey",
        CALENDAR = "calendar",
        HIERARCHICAL_EDGE_BUNDLING = "hierarchical-edge-bundling",
        MATRIX = "matrix",
        LINE_CHART = "line-chart",
        BAR_CHART = "bar-chart",
        PIE_CHART = "pie-chart",
        SCATTER = "scatter",
        TREEMAP = "treemap",
        SUNBURST = "sunburst",
        FUNNEL = "funnel",
        TIMELINE = "timeline"
    }
    interface VisualizationData {
        projectName: string;
        type: VisualizationTypesEnum | VisualizationTypesEnum[];
        description?: string;
        name: string;
        tags?: string[];
        data: WordCloudData | NodeLinkData | CalendarData | AxisChartData | ScatterData | PieChartData | HierarchyData | FunnelData | TimelineData;
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
        per_page?: number;
        sort?: {
            element: string;
            sortOrder: string | number;
        };
    }
}
declare module "index" {
    export { AcceptedFile, FileProperties } from "types/files";
    export { ProjectCreate, ProjectFilter, ProjectType, ProjectUpdate, ExtendedProjectType, } from "types/project";
    export { VisualizationCreate, VisualizationFilter, VisualizationType, VisualizationTypesEnum, VisualizationUpdate, ExtendedVisualizationType, Node, Link, AxisChartData, ScatterPoint, PieChartData, ScatterData, NodeLinkData, WordType, WordCloudData, CalendarType, CalendarData, HierarchyData, HierarchyNode, FunnelData, TimelineEventTag, TimelineEvent, TimelineData } from "types/visualizations";
    export { with_id, with_optional_id, with_optional_properties, with_optional_version, with_version, ExtendedMongoQuery, MongoQuery, DeepPartial, with_optional_labels } from "types/utils";
}
