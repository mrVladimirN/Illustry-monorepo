type with_id = {
  id: string;
}

type with_optional_id = {
  id?: string;
}

type with_version = {
  __v: number;
}

type with_optional_version = {
  __v?: number;
}

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

type MongoQuery = { [key: string]: string | object | Array<object>, };

type ExtendedMongoQuery = {
  query?: MongoQuery;
  page?: number;
  sort?: { [sortField: string]: string | number };
  per_page?: number;
};

type with_optional_properties = {
  properties?: object | Array<object> | string;
}

type with_optional_labels = {
  labels?: {
    name: string;
    value: number;
    properties?: object | Array<object> | string;
  }[];
}

export { with_id, with_optional_id, with_version, with_optional_version, DeepPartial, MongoQuery, ExtendedMongoQuery, with_optional_properties, with_optional_labels }