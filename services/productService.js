const productsModel = require('../models/productsModel');

const getAllProducts = async () => {
    const allProducts = await productsModel.getAllProducts();
    return allProducts;
  };

  const getProductsById = async (id) => {
    const productById = await productsModel.getProductsById(id);
    if (!productById.length) return { code: 404, message: 'Product not found' };

    return productById[0];
  };

  const createProduct = async (name, quantity) => {    
    const productCreated = await productsModel.createProduct(name, quantity);
    
    return productCreated;
  };

  const editProduct = async (name, quantity, id) => {
    // const allProducts = await productsModel.getAllProducts();
  
    const changedProduct = await productsModel.editProduct(name, quantity, id);
  
    return changedProduct;
  };

  const deleteProduct = async (id) => {
    await productsModel.deleteProduct(id);
    return { code: 204 };
  };

module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    // changeProduct,
    deleteProduct,
    editProduct,
};