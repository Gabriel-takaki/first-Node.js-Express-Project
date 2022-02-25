module.exports = (err, _req, res, _next) => {
  if (err.code && err.status) {
    return res.status(err.status).json({ code: err.code, message: err.message });
  }

  return res.status(500)
  .json({ code: 500, message: err.message });
};