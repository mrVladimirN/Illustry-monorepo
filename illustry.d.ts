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
        name: string;
        value: number;
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
    export const enum VisualizationTypesEnum {
        WORLD_CLOUD = "word-cloud",
        FORCE_DIRECTED_GRAPH = "force-directed-graph",
        SANKEY = "sankey",
        CALENDAR = "calendar",
        HIERARCHICAL_EDGE_BUNDLING = "hierarchical-edge-bundling"
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
declare module "validators/files" {
    import * as z from "zod";
    export const fileValidator: z.ZodObject<{
        fileType: z.ZodEnum<["CSV", "JSON"]>;
        files: z.ZodDefault<z.ZodNullable<z.ZodOptional<z.ZodEffects<z.ZodUnknown, unknown, unknown>>>>;
    }, "strip", z.ZodTypeAny, {
        fileType?: "CSV" | "JSON";
        files?: unknown;
    }, {
        fileType?: "CSV" | "JSON";
        files?: unknown;
    }>;
}
declare module "validators/projects" {
    import { z } from "zod";
    export const projectCreateSchema: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        _id: z.ZodOptional<z.ZodString>;
        __v: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
        _id?: string;
        __v?: string;
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
        _id?: string;
        __v?: string;
    }>;
    export const projectTypeSchema: z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        _id: z.ZodString;
        __v: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
        _id?: string;
        __v?: string;
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
        _id?: string;
        __v?: string;
    }>;
    export const projectExtendedTypeSchema: z.ZodObject<{
        projects: z.ZodOptional<z.ZodArray<z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            isActive: z.ZodOptional<z.ZodBoolean>;
            _id: z.ZodString;
            __v: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            isActive?: boolean;
            _id?: string;
            __v?: string;
        }, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            isActive?: boolean;
            _id?: string;
            __v?: string;
        }>, "many">>;
        pagination: z.ZodOptional<z.ZodObject<{
            count: z.ZodNumber;
            pageCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            count?: number;
            pageCount?: number;
        }, {
            count?: number;
            pageCount?: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        projects?: {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            isActive?: boolean;
            _id?: string;
            __v?: string;
        }[];
        pagination?: {
            count?: number;
            pageCount?: number;
        };
    }, {
        projects?: {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            isActive?: boolean;
            _id?: string;
            __v?: string;
        }[];
        pagination?: {
            count?: number;
            pageCount?: number;
        };
    }>;
    export const projectUpdateSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        isActive: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
    }, {
        name?: string;
        description?: string;
        createdAt?: Date;
        updatedAt?: Date;
        isActive?: boolean;
    }>;
    export const projectFilterSchema: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        page: z.ZodOptional<z.ZodNumber>;
        per_page: z.ZodOptional<z.ZodNumber>;
        isActive: z.ZodOptional<z.ZodBoolean>;
        sort: z.ZodOptional<z.ZodObject<{
            element: z.ZodString;
            sortOrder: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            element?: string;
            sortOrder?: string | number;
        }, {
            element?: string;
            sortOrder?: string | number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        name?: string;
        text?: string;
        page?: number;
        per_page?: number;
        isActive?: boolean;
        sort?: {
            element?: string;
            sortOrder?: string | number;
        };
    }, {
        name?: string;
        text?: string;
        page?: number;
        per_page?: number;
        isActive?: boolean;
        sort?: {
            element?: string;
            sortOrder?: string | number;
        };
    }>;
}
declare module "validators/visualizations" {
    import { z } from "zod";
    import { VisualizationTypesEnum } from "types/visualizations";
    export const visualizationTypeSchema: z.ZodUnion<[z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        projectName: z.ZodString;
        tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        type: z.ZodUnion<[z.ZodLiteral<VisualizationTypesEnum.FORCE_DIRECTED_GRAPH>, z.ZodLiteral<VisualizationTypesEnum.SANKEY>, z.ZodLiteral<VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING>]>;
        data: z.ZodObject<{
            nodes: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                category: z.ZodString;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                category?: string;
                properties?: any;
            }, {
                name?: string;
                category?: string;
                properties?: any;
            }>, "many">;
            links: z.ZodArray<z.ZodObject<{
                source: z.ZodString;
                target: z.ZodString;
                value: z.ZodNumber;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }, {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        }, {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        projectName?: string;
        tags?: string | string[];
        type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
        data?: {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        };
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        projectName?: string;
        tags?: string | string[];
        type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
        data?: {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        };
    }>, z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        projectName: z.ZodString;
        tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        type: z.ZodLiteral<VisualizationTypesEnum.CALENDAR>;
        data: z.ZodObject<{
            calendar: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodNumber;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                value?: number;
                properties?: any;
            }, {
                name?: string;
                value?: number;
                properties?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }, {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        projectName?: string;
        tags?: string | string[];
        type?: VisualizationTypesEnum.CALENDAR;
        data?: {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        projectName?: string;
        tags?: string | string[];
        type?: VisualizationTypesEnum.CALENDAR;
        data?: {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
    }>, z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        projectName: z.ZodString;
        tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        type: z.ZodLiteral<VisualizationTypesEnum.WORLD_CLOUD>;
        data: z.ZodObject<{
            words: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodNumber;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                value?: number;
                properties?: any;
            }, {
                name?: string;
                value?: number;
                properties?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }, {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        projectName?: string;
        tags?: string | string[];
        type?: VisualizationTypesEnum.WORLD_CLOUD;
        data?: {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        projectName?: string;
        tags?: string | string[];
        type?: VisualizationTypesEnum.WORLD_CLOUD;
        data?: {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
    }>]>;
    export const visualizationPartialTypeSchema: z.ZodUnion<[z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        type: z.ZodUnion<[z.ZodLiteral<VisualizationTypesEnum.FORCE_DIRECTED_GRAPH>, z.ZodLiteral<VisualizationTypesEnum.SANKEY>, z.ZodLiteral<VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING>]>;
        data: z.ZodObject<{
            nodes: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                category: z.ZodString;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                category?: string;
                properties?: any;
            }, {
                name?: string;
                category?: string;
                properties?: any;
            }>, "many">;
            links: z.ZodArray<z.ZodObject<{
                source: z.ZodString;
                target: z.ZodString;
                value: z.ZodNumber;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }, {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        }, {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        }>;
        projectName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        tags?: string | string[];
        type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
        data?: {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        };
        projectName?: string;
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        tags?: string | string[];
        type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
        data?: {
            nodes?: {
                name?: string;
                category?: string;
                properties?: any;
            }[];
            links?: {
                source?: string;
                target?: string;
                value?: number;
                properties?: any;
            }[];
        };
        projectName?: string;
    }>, z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        type: z.ZodLiteral<VisualizationTypesEnum.CALENDAR>;
        data: z.ZodObject<{
            calendar: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodNumber;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                value?: number;
                properties?: any;
            }, {
                name?: string;
                value?: number;
                properties?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }, {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }>;
        projectName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        tags?: string | string[];
        type?: VisualizationTypesEnum.CALENDAR;
        data?: {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
        projectName?: string;
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        tags?: string | string[];
        type?: VisualizationTypesEnum.CALENDAR;
        data?: {
            calendar?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
        projectName?: string;
    }>, z.ZodObject<{
        description: z.ZodOptional<z.ZodString>;
        name: z.ZodString;
        createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
        tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
        type: z.ZodLiteral<VisualizationTypesEnum.WORLD_CLOUD>;
        data: z.ZodObject<{
            words: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                value: z.ZodNumber;
                properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
            }, "strip", z.ZodTypeAny, {
                name?: string;
                value?: number;
                properties?: any;
            }, {
                name?: string;
                value?: number;
                properties?: any;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }, {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        }>;
        projectName: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        tags?: string | string[];
        type?: VisualizationTypesEnum.WORLD_CLOUD;
        data?: {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
        projectName?: string;
    }, {
        description?: string;
        name?: string;
        createdAt?: Date;
        updatedAt?: Date;
        tags?: string | string[];
        type?: VisualizationTypesEnum.WORLD_CLOUD;
        data?: {
            words?: {
                name?: string;
                value?: number;
                properties?: any;
            }[];
        };
        projectName?: string;
    }>]>;
    export const visualizationFilterSchema: z.ZodObject<{
        projectName: z.ZodOptional<z.ZodString>;
        name: z.ZodOptional<z.ZodString>;
        text: z.ZodOptional<z.ZodString>;
        page: z.ZodOptional<z.ZodNumber>;
        per_page: z.ZodOptional<z.ZodNumber>;
        sort: z.ZodOptional<z.ZodObject<{
            element: z.ZodString;
            sortOrder: z.ZodUnion<[z.ZodString, z.ZodNumber]>;
        }, "strip", z.ZodTypeAny, {
            element?: string;
            sortOrder?: string | number;
        }, {
            element?: string;
            sortOrder?: string | number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        projectName?: string;
        name?: string;
        text?: string;
        page?: number;
        per_page?: number;
        sort?: {
            element?: string;
            sortOrder?: string | number;
        };
    }, {
        projectName?: string;
        name?: string;
        text?: string;
        page?: number;
        per_page?: number;
        sort?: {
            element?: string;
            sortOrder?: string | number;
        };
    }>;
    export const visualizationExtendedTypeSchema: z.ZodObject<{
        projects: z.ZodOptional<z.ZodArray<z.ZodUnion<[z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            projectName: z.ZodString;
            tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            type: z.ZodUnion<[z.ZodLiteral<VisualizationTypesEnum.FORCE_DIRECTED_GRAPH>, z.ZodLiteral<VisualizationTypesEnum.SANKEY>, z.ZodLiteral<VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING>]>;
            data: z.ZodObject<{
                nodes: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    category: z.ZodString;
                    properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
                }, "strip", z.ZodTypeAny, {
                    name?: string;
                    category?: string;
                    properties?: any;
                }, {
                    name?: string;
                    category?: string;
                    properties?: any;
                }>, "many">;
                links: z.ZodArray<z.ZodObject<{
                    source: z.ZodString;
                    target: z.ZodString;
                    value: z.ZodNumber;
                    properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
                }, "strip", z.ZodTypeAny, {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }, {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                nodes?: {
                    name?: string;
                    category?: string;
                    properties?: any;
                }[];
                links?: {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }[];
            }, {
                nodes?: {
                    name?: string;
                    category?: string;
                    properties?: any;
                }[];
                links?: {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }[];
            }>;
        }, "strip", z.ZodTypeAny, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
            data?: {
                nodes?: {
                    name?: string;
                    category?: string;
                    properties?: any;
                }[];
                links?: {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        }, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
            data?: {
                nodes?: {
                    name?: string;
                    category?: string;
                    properties?: any;
                }[];
                links?: {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            projectName: z.ZodString;
            tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            type: z.ZodLiteral<VisualizationTypesEnum.CALENDAR>;
            data: z.ZodObject<{
                calendar: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodNumber;
                    properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
                }, "strip", z.ZodTypeAny, {
                    name?: string;
                    value?: number;
                    properties?: any;
                }, {
                    name?: string;
                    value?: number;
                    properties?: any;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                calendar?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            }, {
                calendar?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            }>;
        }, "strip", z.ZodTypeAny, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.CALENDAR;
            data?: {
                calendar?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        }, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.CALENDAR;
            data?: {
                calendar?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        }>, z.ZodObject<{
            description: z.ZodOptional<z.ZodString>;
            name: z.ZodString;
            createdAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            updatedAt: z.ZodOptional<z.ZodType<Date, z.ZodTypeDef, Date>>;
            projectName: z.ZodString;
            tags: z.ZodOptional<z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>>;
            type: z.ZodLiteral<VisualizationTypesEnum.WORLD_CLOUD>;
            data: z.ZodObject<{
                words: z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    value: z.ZodNumber;
                    properties: z.ZodOptional<z.ZodUnion<[z.ZodAny, z.ZodArray<z.ZodAny, "many">, z.ZodString]>>;
                }, "strip", z.ZodTypeAny, {
                    name?: string;
                    value?: number;
                    properties?: any;
                }, {
                    name?: string;
                    value?: number;
                    properties?: any;
                }>, "many">;
            }, "strip", z.ZodTypeAny, {
                words?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            }, {
                words?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            }>;
        }, "strip", z.ZodTypeAny, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.WORLD_CLOUD;
            data?: {
                words?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        }, {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.WORLD_CLOUD;
            data?: {
                words?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        }>]>, "many">>;
        pagination: z.ZodOptional<z.ZodObject<{
            count: z.ZodNumber;
            pageCount: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            count?: number;
            pageCount?: number;
        }, {
            count?: number;
            pageCount?: number;
        }>>;
    }, "strip", z.ZodTypeAny, {
        projects?: ({
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
            data?: {
                nodes?: {
                    name?: string;
                    category?: string;
                    properties?: any;
                }[];
                links?: {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        } | {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.CALENDAR;
            data?: {
                calendar?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        } | {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.WORLD_CLOUD;
            data?: {
                words?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        })[];
        pagination?: {
            count?: number;
            pageCount?: number;
        };
    }, {
        projects?: ({
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.FORCE_DIRECTED_GRAPH | VisualizationTypesEnum.SANKEY | VisualizationTypesEnum.HIERARCHICAL_EDGE_BUNDLING;
            data?: {
                nodes?: {
                    name?: string;
                    category?: string;
                    properties?: any;
                }[];
                links?: {
                    source?: string;
                    target?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        } | {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.CALENDAR;
            data?: {
                calendar?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        } | {
            description?: string;
            name?: string;
            createdAt?: Date;
            updatedAt?: Date;
            projectName?: string;
            tags?: string | string[];
            type?: VisualizationTypesEnum.WORLD_CLOUD;
            data?: {
                words?: {
                    name?: string;
                    value?: number;
                    properties?: any;
                }[];
            };
        })[];
        pagination?: {
            count?: number;
            pageCount?: number;
        };
    }>;
}
declare module "index" {
    export { AcceptedFile, FileProperties } from "types/files";
    export { ProjectCreate, ProjectFilter, ProjectType, ProjectUpdate, ExtendedProjectType, } from "types/project";
    export { VisualizationCreate, VisualizationFilter, VisualizationType, VisualizationTypesEnum, VisualizationUpdate, ExtendedVisualizationType, Node, Link, NodeLinkData, WordType, WordCloudData, CalendarType, CalendarData, } from "types/visualizations";
    export { with_id, with_optional_id, with_optional_properties, with_optional_version, with_version, ExtendedMongoQuery, MongoQuery, DeepPartial, } from "types/utils";
    export { fileValidator } from "validators/files";
    export { projectCreateSchema, projectFilterSchema, projectUpdateSchema, projectExtendedTypeSchema } from "validators/projects";
    export { visualizationFilterSchema, visualizationPartialTypeSchema, visualizationTypeSchema, visualizationExtendedTypeSchema } from "validators/visualizations";
}
