const express = require('express');
const app = express();
const PORT = 8080;
const ProductManager = require('./ProductManager.js');

app.use(express.json());

// Rutas para productos
const productsRouter = express.Router();

// Listar todos los productos de la base
productsRouter.get('/', (req, res) => {
    const limit = req.query.limit;
    const products = ProductManager.getProducts(limit);
    res.json(products);
});

// Obtener un producto por id
productsRouter.get('/:pid', (req, res) => {
    const pid = req.params.pid;
    const product = ProductManager.getProductById(pid);
    if (product) {
    res.json(product);
} else {
    res.status(404).json({error: `Product with id ${pid} not found`});
}
});

// Agregar un nuevo producto
productsRouter.post('/', (req, res) => {
    const product = req.body;
    const result = ProductManager.addProduct(product);
    if (result.success) {
    res.status(201).json(result.data);
} else {
    res.status(400).json({error: result.error});
}
});

// Actualizar un producto
productsRouter.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const productUpdates = req.body;
    const result = ProductManager.updateProduct(pid, productUpdates);
    if (result.success) {
    res.json(result.data);
} else {
    res.status(400).json({error: result.error});
}
});

// Eliminar un producto
productsRouter.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    const result = ProductManager.deleteProduct(pid);
    if (result.success) {
    res.json({message: `Product with id ${pid} has been deleted`});
} else {
    res.status(404).json({error: result.error});
}
});

// Rutas para carritos
const cartsRouter = express.Router();

// Crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
const cart = req.body;
const result = CartManager.createCart(cart);
if (result.success) {
    res.status(201).json(result.data);
} else {
    res.status(400).json({error: result.error});
}
});

// Listar los productos de un carrito
cartsRouter.get('/:cid', (req, res) => {
    const cid = req.params.cid;
    const products = CartManager.getProductsInCart(cid);
if (products) {
    res.json(products);
} else {
    res.status(404).json({error: `Cart with id ${cid} not found`});
}
});

// Agregar un producto a un carrito
cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity || 1;
    const result = CartManager.addProductToCart(cid, pid, quantity);
    if (result.success) {
    res.json(result.data);
} else {
    res.status(400).json({error: result.error});
}
});

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
    console.log('Server listening in port ${PORT}')
})
