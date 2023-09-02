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
  query?: { [key: string]: string | object };
  page?: number;
  sort?: { [sortField: string]: string | number };
  per_page?: number;
};

export type MongoQuery = { [key: string]: string | object };

export interface with_optional_properties {
  properties?: object | object[] | string;
}
export interface with_optional_labels extends with_optional_properties {
  name: string;
  value: number;
}
