const productService = require('../services/productService');

const getAllProducts = async (_req, res, next) => {
    try {
    const allProducts = await productService.getAllProducts();
   res.status(200).json(allProducts);
    } catch (err) {
    next(err);
    }
};

const getProductById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const result = await productService.getProductsById(+id);
      if (result.code) return res.status(result.code).json({ message: result.message });
      return res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  };
  
  const hasName = async (nome) => {
    const allP = await productService.getAllProducts();
    const haveProduct = await allP.find((n) => n.name === nome);
    return haveProduct;
  };

  const createProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const nameAlreadyExist = await hasName(name);
    if (nameAlreadyExist) {
      return res.status(409).json({ message: 'Product already exists' });
    }
    const result = await productService.createProduct(name, quantity);
    
    res.status(201).json(result);
  };
  
    const hasId = async (id) => {
      const allP = await productService.getAllProducts();
      // console.log(allP);
      const haveProduct = await allP.some((n) => n.id === id);
      // console.log(haveProduct);
      return haveProduct;
    };

  const editProduct = async (req, res) => {
    const { name, quantity } = req.body;
    const { id } = req.params;
  const haveId = await hasId(+id);
  if (haveId !== true) {
    return res.status(404).json({ message: 'Product not found' });
  }

    const changedProduct = await productService.editProduct(name, quantity, id);
    if (changedProduct.message) {
      return res.status(changedProduct.code).json({ message: changedProduct.message });
    }
  
    res.status(200).json(changedProduct);
  };

  const deleteProduct = (async (req, res) => {
    const { id } = req.params;
    const haveId = await hasId(+id);
    // console.log([haveId]);
    if (haveId !== true) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const removedProduct = await productService.deleteProduct(id);
    console.log(removedProduct);
    res.status(removedProduct.code).json();
  });

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    // changeProduct,
    deleteProduct,
    editProduct,
};