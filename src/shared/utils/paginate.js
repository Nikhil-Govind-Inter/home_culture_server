// Common pagination: runs the query and returns { rows, meta } with the pagination data.
export default async function paginate(model, { page, limit, where = {}, order = [['createdAt', 'DESC']] } = {}) {
  const pageNo = Math.max(Number(page) || 1, 1);
  const size = Math.min(Math.max(Number(limit) || 20, 1), 100);

  const { rows, count } = await model.findAndCountAll({
    where,
    order,
    limit: size,
    offset: (pageNo - 1) * size,
  });

  return { rows, meta: { total: count, page: pageNo, limit: size, totalPages: Math.ceil(count / size) } };
}
