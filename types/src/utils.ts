type with_id = {
  _id: string;
};

type with_optional_id = {
  _id?: string;
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

type MongoQuery = { [key: string]: string | Record<string, string | number> | Record<string, string | number>[]; };

type ExtendedMongoQuery = {
  query?: MongoQuery;
  page?: number;
  sort?: { [sortField: string]: string | number };
  per_page?: number;
};

type with_optional_properties = {
  properties?: string | Record<string, string | number> | Record<string, string | number>[];
};

export { with_id, with_optional_id, with_version, with_optional_version, DeepPartial, MongoQuery, ExtendedMongoQuery, with_optional_properties };