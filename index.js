const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!");
    })
    .catch(err => {
        console.log("MONGO Error!!!!");
        console.log(err);
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.get('/products', async(req, res) => {
    const products = await Product.find({});
    res.render('products/index', {products});
})

app.get('/products/newProduct', (req, res) => {
    res.render('products/newProduct');
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/showDetails', {product});
})

app.get('/products/:id/edit', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', {product});
})

app.put('/products/:id', async(req, res) => {
    const {id} = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
    res.redirect(`/products/${product._id}`);
})

app.post('/products', (req, res) => {
    const newProduct = new Product(req.body);
    newProduct.save();
    res.redirect(`/products/${newProduct._id}`);
})

app.delete('/products/:id', async(req, res) => {
    const {id} = req.params;
    const deleteP = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})



app.listen(1000, () => {
    console.log("Running on PORT 1000!!!");
})