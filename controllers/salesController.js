const salesService = require('../services/salesService');

const getAllSales = async (_req, res) => {
    const allSales = await salesService.getAllSales();
  
    res.status(200).json(allSales);
  };  

  const getSalesById = async (req, res) => {
    const { id } = req.params;
    
    const saleById = await salesService.getSaleById(id);
    
    if (saleById.message) return res.status(saleById.code).json({ message: saleById.message });
  
    res.status(200).json(saleById);
  };

  const createSale = async (req, res) => {
    const result = req.body;
  
    const sale = await salesService.createSale(result);
  
    return res.status(201).json(sale);
  };

  const update = async (req, res) => {
    try {
      const { id } = req.params;
      const sale = req.body[0];
      const { productId, quantity } = sale;
      const sales = await salesService.getAll();
      const haveSale = await sales.find((p) => p.saleId.toString() === id);
  
      if (!haveSale) {
        return res.status(404).json({ message: 'sale not found' });
      }
  
      const saleUpdated = await salesService.update(productId, quantity, id);
      const saleRes = {
        saleId: Number(id),
        itemUpdated: saleUpdated,
      };
      res.status(200).json(saleRes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  module.exports = {
      getAllSales,
      getSalesById,
      createSale,
      update,
  };