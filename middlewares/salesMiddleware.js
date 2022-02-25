// const isValidProduct = async (req, res, next) => {
//   let err = false;
//   const sales = req.body;
//   sales.forEach((s) => {
//     if (!s.productId) {
//       err = true;
//       return res.status(400).json({ message: '"productId" is required' });
//     }
//   });

//   if (!err) next();
// };

// const isValidQuantity = async (req, res, next) => {
//   let err = false;
//   const sales = req.body;
//   sales.forEach((s) => {
//     if (s.quantity <= 0) {
//       err = true;
//       return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
//     }
//     if (!s.quantity) {
//       err = true;
//       return res.status(400).json({ message: '"quantity" is required' });
//     }
//   });

//   if (!err) next();
// };

// module.exports = {
//   isValidProduct,
//   isValidQuantity,
// };