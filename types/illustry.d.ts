declare module "files" {
    type FileProperties = {
        filePath: string;
        type: string;
        delimiter?: string;
    };
    type FileDetails = {
        fileType: "JSON" | "EXCEL" | "CSV" | "XML";
        includeHeaders?: boolean;
        separator?: string;
        mapping?: any;
        sheets?: string;
    };
    type UploadedFile = {
        path: string;
        mimeType: string;
    };
    interface RequestWithFiles extends Request {
        files?: {
            file: UploadedFile[];
        };
    }
    export { FileProperties, FileDetails, UploadedFile, RequestWithFiles };
}
declare module "utils" {
    type with_id = {
        id: string;
    };
    type with_optional_id = {
        id?: string;
    };
    type with_version = {
        __v: number;
    };
    type with_optional_version = {
        __v?: number;
    };
    type DeepPartial<T> = {
        [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
    };
    type MongoQuery = {
        [key: string]: string | object | Array<object>;
    };
    type ExtendedMongoQuery = {
        query?: MongoQuery;
        page?: number;
        sort?: {
            [sortField: string]: string | number;
        };
        per_page?: number;
    };
    type with_optional_properties = {
        properties?: object | Array<object> | string;
    };
    type with_optional_labels = {
        labels?: {
            name: string;
            value: number;
            properties?: object | Array<object> | string;
        }[];
    };
    export { with_id, with_optional_id, with_version, with_optional_version, DeepPartial, MongoQuery, ExtendedMongoQuery, with_optional_properties, with_optional_labels };
}
declare module "project" {
    import { with_optional_id, with_optional_version, with_id, DeepPartial } from "utils";
    type ProjectData = {
        name: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
    };
    type ProjectCreate = ProjectData & with_optional_id & with_optional_version;
    type ProjectType = ProjectData & with_id & with_optional_version;
    type ExtendedProjectType = {
        projects?: ProjectType[];
        pagination?: {
            count: number;
            pageCount: number;
        };
    };
    type ProjectUpdate = DeepPartial<ProjectType>;
    type ProjectFilter = {
        name?: string;
        text?: string;
        page?: number;
        per_page?: number;
        isActive?: boolean;
        sort?: {
            element: string;
            sortOrder: string | number;
        };
    };
    export { ProjectFilter, ProjectUpdate, ExtendedProjectType, ProjectType, ProjectCreate };
}
declare module "visualizations" {
    import { DeepPartial, with_id, with_optional_id, with_optional_version, with_optional_properties, with_optional_labels } from "utils";
    type WordType = with_optional_properties & {
        name: string;
        value: number;
    };
    type WordCloudData = {
        words: WordType[];
    };
    type CalendarType = with_optional_properties & {
        date: string;
        value: number;
        category: string;
    };
    type CalendarData = {
        calendar: CalendarType[];
    };
    type TimelineEventTag = {
        name: string;
    };
    type TimelineEvent = {
        summary: string;
        date: string;
        type: string;
        author: string;
        tags?: TimelineEventTag[];
        description?: string;
    };
    type TimelineData = {
        [date: string]: {
            summary?: {
                title?: string;
            };
            events: TimelineEvent[];
        };
    };
    type Node = with_optional_properties & with_optional_labels & {
        name: string;
        category: string;
    };
    type Link = with_optional_properties & {
        source: string;
        target: string;
        value: number;
    };
    type NodeLinkData = {
        nodes: Node[];
        links: Link[];
    };
    type AxisChartData = {
        headers: string[];
        values: {
            [key: string]: number[];
        };
    };
    type ScatterPoint = with_optional_properties & {
        value: [number, number];
        category: string;
    };
    type ScatterData = {
        points: ScatterPoint[];
    };
    type PieChartData = {
        values: {
            [key: string]: number;
        };
    };
    type FunnelData = {
        values: {
            [key: string]: number;
        };
    };
    type HierarchyNode = with_optional_properties & {
        name: string;
        value: number;
        category: string;
        children?: HierarchyNode[];
    };
    type HierarchyData = {
        nodes: HierarchyNode[];
    };
    enum VisualizationTypesEnum {
        WORD_CLOUD = "word-cloud",
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
    type VisualizationData = {
        projectName: string;
        type: VisualizationTypesEnum | VisualizationTypesEnum[];
        description?: string;
        name: string;
        tags?: string[];
        data: WordCloudData | NodeLinkData | CalendarData | AxisChartData | ScatterData | PieChartData | HierarchyData | FunnelData | TimelineData;
        createdAt?: Date;
        updatedAt?: Date;
    };
    type VisualizationCreate = VisualizationData & with_optional_id & with_optional_version;
    type VisualizationType = VisualizationData & with_id & with_optional_version;
    type ExtendedVisualizationType = {
        visualizations?: VisualizationType[];
        pagination?: {
            count: number;
            pageCount: number;
        };
    };
    type VisualizationUpdate = DeepPartial<VisualizationType>;
    type VisualizationFilter = {
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
    };
    export { WordType, WordCloudData, CalendarType, CalendarData, TimelineEventTag, TimelineEvent, TimelineData, Node, Link, NodeLinkData, AxisChartData, ScatterData, ScatterPoint, PieChartData, FunnelData, HierarchyNode, HierarchyData, VisualizationTypesEnum, VisualizationData, VisualizationCreate, VisualizationType, ExtendedVisualizationType, VisualizationUpdate, VisualizationFilter };
}
declare module "generic" {
    import { ExtendedMongoQuery } from "utils";
    interface BaseBZL<TCreate, TUpdate, TFilter, TType, TExtendedType> {
        create(data: TCreate): Promise<TType>;
        update(filter: TFilter, data: TUpdate): Promise<TType | null>;
        delete(filter: TFilter): Promise<boolean>;
        findOne(filter: TFilter): Promise<TType>;
        browse(filter: TFilter): Promise<TExtendedType>;
    }
    interface BaseLib<TCreate, TUpdate, TFilter, TType, TExtendedType> {
        create(data: TCreate): Promise<TType>;
        update(filter: ExtendedMongoQuery, data: TUpdate): Promise<TType | null>;
        delete(filter: ExtendedMongoQuery): Promise<boolean>;
        findOne(filter: ExtendedMongoQuery): Promise<TType | null>;
        browse(filter: ExtendedMongoQuery): Promise<TExtendedType>;
    }
    export { BaseBZL, BaseLib };
}
declare module "index" {
    export { FileDetails, FileProperties, RequestWithFiles, UploadedFile } from "files";
    export { ProjectCreate, ProjectFilter, ProjectType, ProjectUpdate, ExtendedProjectType, } from "project";
    export { VisualizationCreate, VisualizationFilter, VisualizationType, VisualizationTypesEnum, VisualizationUpdate, ExtendedVisualizationType, Node, Link, AxisChartData, ScatterPoint, PieChartData, ScatterData, NodeLinkData, WordType, WordCloudData, CalendarType, CalendarData, HierarchyData, HierarchyNode, FunnelData, TimelineEventTag, TimelineEvent, TimelineData, } from "visualizations";
    export { with_id, with_optional_id, with_optional_properties, with_optional_version, with_version, ExtendedMongoQuery, MongoQuery, DeepPartial, with_optional_labels, } from "utils";
    export { BaseBZL, BaseLib } from "generic";
}
