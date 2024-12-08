"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildPrismaQuery = void 0;
const buildPrismaQuery = ({ searchFields = [], searchTerm = '', filter = {}, orderBy = {}, page = 1, limit = 10, }) => {
    const skip = (page - 1) * limit;
    const take = limit;
    const searchConditions = searchFields.length > 0 && searchTerm
        ? {
            OR: searchFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        }
        : {};
    const where = Object.assign(Object.assign({}, filter), (Object.keys(searchConditions).length > 0 && searchConditions));
    const query = {
        skip,
        take: Number(take),
        where,
        orderBy,
    };
    return query;
};
exports.buildPrismaQuery = buildPrismaQuery;
