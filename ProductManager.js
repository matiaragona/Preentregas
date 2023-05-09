const fs = require('fs');

const ProductManager = {
  productsFilePath: 'products.json',

  getProducts: function(limit) {
    const productsData = fs.readFileSync(this.productsFilePath, 'utf8');
    const products = JSON.parse(productsData);
    if (limit) {
      return products.slice(0, limit);
    }
    return products;
  },

  getProductById: function(id) {
    const productsData = fs.readFileSync(this.productsFilePath, 'utf8');
    const products = JSON.parse(productsData);
    return products.find(product => product.id === id);
  },

  addProduct: function(product) {
    const productsData = fs.readFileSync(this.productsFilePath, 'utf8');
    const products = JSON.parse(productsData);
    const newProduct = {
      ...product,
      id: this.getNextProductId(products)
    };
    products.push(newProduct);
    fs.writeFileSync(this.productsFilePath, JSON.stringify(products, null, 2));
    return newProduct;
  },

  updateProduct: function(id, updatedProduct) {
    const productsData = fs.readFileSync(this.productsFilePath, 'utf8');
    const products = JSON.parse(productsData);
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      products[index] = {
        ...products[index],
        ...updatedProduct,
        id: id
      };
      fs.writeFileSync(this.productsFilePath, JSON.stringify(products, null, 2));
      return products[index];
    }
    return null;
  },

  deleteProduct: function(id) {
    const productsData = fs.readFileSync(this.productsFilePath, 'utf8');
    const products = JSON.parse(productsData);
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
      const deletedProduct = products.splice(index, 1)[0];
      fs.writeFileSync(this.productsFilePath, JSON.stringify(products, null, 2));
      return deletedProduct;
    }
    return null;
  },

  getNextProductId: function(products) {
    const ids = products.map(product => product.id);
    const maxId = Math.max(...ids);
    return maxId + 1;
  }
};

module.exports = ProductManager;
