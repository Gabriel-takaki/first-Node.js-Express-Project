const connection = require('./connection');

  const getAllProducts = async () => {
    const [products] = await connection.execute('SELECT * from StoreManager.products');

    return products;
  };

  const getProductsById = async (id) => {
    const [products] = await connection.execute('SELECT * from StoreManager.products WHERE id = ?;',
    [id]);
    return products;
  };

  const createProduct = async (name, quantity) => {
    const [result] = await connection.execute(
      'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)', [name, quantity],
    );
    return {
      id: result.insertId,
      name,
      quantity,
    };
  };

  const getProductsByName = async (name) => {
  const [names] = await connection.execute('SELECT * from StoreManager.products WHERE name = ?;',
    [name]);
    return names;
  };

  const editProduct = async (name, quantity, id) => {
    const [changedProduct] = await connection.execute(
      'UPDATE StoreManager.products SET name= ?, quantity= ? WHERE id= ?',
      [name, quantity, id],
    );
    console.log(changedProduct);
    return { id, name, quantity };
  };

  const deleteProduct = async (id) => {
    await connection.execute(
      'DELETE FROM StoreManager.products WHERE id= ?',
      [id],
  );
  };

  module.exports = {
    getAllProducts,
    getProductsById,
    createProduct,
    getProductsByName,
    editProduct,
    deleteProduct,
};