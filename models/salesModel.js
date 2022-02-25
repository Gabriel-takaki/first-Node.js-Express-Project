const connection = require('./connection');

const getAllSales = async () => {
    const [allSales] = await connection.execute(
      `SELECT p.*, s.date from StoreManager.sales_products as p INNER JOIN
      StoreManager.sales as s where p.sale_id = s.id;`,
    );
  
    console.log(allSales);
    return allSales;
  };

  const getSaleById = async (id) => {
    const [result] = await connection.execute(
      `SELECT
      p.product_id, p.quantity, s.date from StoreManager.sales_products p
      INNER JOIN StoreManager.sales s where p.sale_id = s.id AND  p.sale_id = ?;`,
      [id],
    );

    if (!result.length) return { code: 404, message: 'Sale not found' };
    return result;
  };

  const createSale = async (result) => {
    const querySale = 'INSERT INTO sales (date) VALUES (NOW())';
    const querySalesProducts = `INSERT INTO sales_products 
    (sale_id, product_id, quantity) VALUES (?, ?, ?)`;
  
    const [resultSales] = await connection.execute(querySale);
    
    result.map(async (sale) => {
       await connection
      .execute(querySalesProducts, [resultSales.insertId, sale.productId, sale.quantity]);
    });
  // solução de map com ajuda do magno-vicentini pr : https://github.com/tryber/sd-015-a-store-manager/blob/magno-store-manager/models/salesModels.js
    return resultSales;
  };
  const update = async (productId, quantity, id) => {
    await connection
        .query(
          'UPDATE StoreManager.sales_products SET product_id = ?, quantity = ? WHERE sale_id = ?',
          [productId, quantity, id],
        );
  
    const result = await getSaleById(id);
    return result;
  };

  module.exports = {
      getAllSales,
      getSaleById,
      createSale,
      update,
  };