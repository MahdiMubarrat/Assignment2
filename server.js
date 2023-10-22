const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productController = require('./controllers/productController');

const app = express();
app.use(cors());
app.use(express.json());

const DB_URI = 'mongodb+srv://upatel:Z3BmV2ofUb7LbJw9@cluster0.n0akqrt.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB'))
.catch(error => console.error('Could not connect to MongoDB', error));

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to DressStore application.' });
});

// Products Routes
app.get('/api/products', productController.getAllProducts);
app.get('/api/products/:id', productController.getProductById);
app.post('/api/products', productController.addProduct);
app.put('/api/products/:id', productController.updateProduct);
app.delete('/api/products/:id', productController.deleteProduct);
app.delete('/api/products', productController.deleteProduct);

// To search by product name
app.get('/api/products?name=:kw', async (req, res) => {
    try {
        const products = await Product.find({ name: { $regex: req.params.kw, $options: 'i' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
