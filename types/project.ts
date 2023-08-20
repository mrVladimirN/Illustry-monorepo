import {
  with_optional_id,
  with_optional_version,
  with_id,
  DeepPartial,
} from "./utils";

interface ProjectData {
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

export interface ProjectCreate
  extends ProjectData,
    with_optional_id,
    with_optional_version {}

export interface ProjectType
  extends ProjectData,
    with_id,
    with_optional_version {}

export interface ExtendedProjectType {
  projects?: ProjectType[];
  pagination?: {
    count: number;
    pageCount: number;
  };
}
export interface ProjectUpdate extends DeepPartial<ProjectType> {}

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
