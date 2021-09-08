const getPagination = (page = 1, limit = 20) => {
  const offset = page === 1 ? 0 : page * limit
  return { limit, offset }
}

const getPagingData = (total, limit, page) => {
  const totalPages = Math.ceil(total / limit)
  return { page, totalPages, total, limit }
}

module.exports = {
  getPagination,
  getPagingData
}
