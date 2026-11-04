import { Op } from 'sequelize';

// Builds a case-insensitive "contains" filter across `fields` for the search term.
// LIKE wildcards (\, %, _) in the term are escaped so it is matched literally.
const buildSearchWhere = (search, fields) => {
  const term = `%${String(search).replace(/[\\%_]/g, '\\$&')}%`;
  return { [Op.or]: fields.map((field) => ({ [field]: { [Op.iLike]: term } })) };
};

// Common pagination: runs the query and returns { rows, meta } with the pagination data.
// Optional search: pass `search` (term) and `searchFields` (array of column names) and a row
// matches when any of those columns contains the term. It is AND-ed with `where`.
export default async function paginate(
  model,
  { page, limit, where = {}, search, searchFields = [], order = [['createdAt', 'DESC']] } = {},
) {
  const pageNo = Math.max(Number(page) || 1, 1);
  const size = Math.min(Math.max(Number(limit) || 10, 1), 100);

  const finalWhere =
    search && searchFields.length
      ? { [Op.and]: [where, buildSearchWhere(search, searchFields)] }
      : where;

  const { rows, count } = await model.findAndCountAll({
    where: finalWhere,
    order,
    limit: size,
    offset: (pageNo - 1) * size,
  });

  return { rows, meta: { total: count, page: pageNo, limit: size, totalPages: Math.ceil(count / size) } };
}
