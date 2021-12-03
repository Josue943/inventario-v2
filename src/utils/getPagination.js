module.exports = (limit, page) => {
  const pagination = { limit: undefined, offset: 0 };
  if (limit) {
    pagination.limit = +limit;
    if (page) pagination.offset = +page * +limit;
  }

  return pagination;
};
