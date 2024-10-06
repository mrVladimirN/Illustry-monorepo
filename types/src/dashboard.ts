import {
    with_optional_id,
    with_optional_version,
    with_id,
    DeepPartial,
} from "./utils";

type DashboardData = {
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
    visualizationIds?: string[];
}

type DashboardCreate =
    DashboardData &
    with_optional_id &
    with_optional_version

type DashboardType =
    DashboardData &
    with_id &
    with_optional_version

type ExtendedDashboardType = {
    dashboards?: DashboardType[];
    pagination?: {
        count: number;
        pageCount: number;
    };
}

type DashboardUpdate = DeepPartial<DashboardType>

type DashboardFilter = {
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

export { DashboardFilter, DashboardUpdate, ExtendedDashboardType, DashboardType, DashboardCreate }