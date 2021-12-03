module.exports = ({ rows, count }, limit) => ({
  rows,
  pages: limit ? Math.ceil(count / limit) : null,
  count,
});
