import { Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}
export type MainNavItem = NavItemWithOptionalChildren;
export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
}

export interface DataTableSearchableColumn<TData> {
  id: keyof TData;
  title: string;
}

export interface DataTableFilterableColumn<TData>
  extends DataTableSearchableColumn<TData> {
  options: Option[];
}

export interface ProjectType {
  _id?: string;
  __v?: number;
  name: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  isActive: boolean;
}

export interface ProjectCreate {
  name: string;
  description?: string;
}
export interface ProjectUpdate {
  description: string;
}
export interface ProjectFilter {
  name?: string;
  text?: string;
  page?: number;
  per_page?: number;
  sort?: {
    element: string;
    sortOrder: string | number;
  };
}

export interface ExtendedProjectType {
  projects?: ProjectType[];
  pagination?: {
    count: number;
    pageCount: number;
  };
}
