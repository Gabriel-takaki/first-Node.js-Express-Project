const express = require('express');
const {
  getAllProducts,
  getProductById,
  createProduct,
  editProduct,
  deleteProduct,
} = require('../controllers/productsController');

// const checkCreate = require('../middlewares/authMiddleware');

const productsRouter = express.Router();

const checkCreate = async (req, res, next) => {
  const { name, quantity } = req.body;

  if (!name) {
    return res.status(400).json({ message: '"name" is required' });
  }
  if (name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  if (quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  if (!quantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

productsRouter.get('/', getAllProducts);
productsRouter.get('/:id', getProductById);
productsRouter.post('/', checkCreate, createProduct);
productsRouter.put('/:id', checkCreate, editProduct);
productsRouter.delete('/:id', deleteProduct);

module.exports = {
  productsRouter,
};