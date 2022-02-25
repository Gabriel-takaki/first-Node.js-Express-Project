const salesModel = require('../models/salesModel');

const estrutureArray = (obj) => ({
    saleId: obj.sale_id,
    productId: obj.product_id,
    quantity: obj.quantity,
    date: obj.date });
  // metodo de estruturação baseado no ultilizado pelo caiolima PR : https://github.com/tryber/sd-015-a-store-manager/tree/caio-lima;

  const getAllSales = async () => {
    const result = await salesModel.getAllSales();
    const newArray = result.map((obj) => (estrutureArray(obj)));
    return newArray;
  };

  const getSaleById = async (id) => {
    const result = await salesModel.getSaleById(id);
    if (result.length) {
      const newArray = result.map((obj) => (estrutureArray(obj)));
      return newArray;
    }
    return result;
  };

  const createSale = async (result) => { 
    const sale = await salesModel.createSale(result);
  
    return {
      id: sale.insertId,
      itemsSold: result,
    };
  };

  const update = async (productId, quantity, id) => {
    const products = await salesModel.update(productId, quantity, id);
  
    return products;
  };
  
  module.exports = {
      getAllSales,
      getSaleById,
      createSale,
      update,
  };