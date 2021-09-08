const getPagination = (page = 1, limit = 20) => {
  const offset = page === 1 ? 0 : (page - 1) * limit
  return { limit, offset }
}

const getPagingData = (total, limit, page, url) => {
  const totalPages = Math.ceil(total / limit)
  return { page, totalPages, total, limit, url }
}

module.exports = {
  getPagination,
  getPagingData
}
