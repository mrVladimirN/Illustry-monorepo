import { ExtendedMongoQuery } from "./utils";

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