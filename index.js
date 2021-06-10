const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const methodOverride = require('method-override');
const AppError = require('./AppError');

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

app.get('/products', async(req, res, next) => {
    try {
        const products = await Product.find({});
        res.render('products/index', {products});
    }
    catch(error) {
        next(error);
    }
})

app.get('/products/newProduct', (req, res) => {
    res.render('products/newProduct');
})

app.get('/products/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render('products/showDetails', {product});
    }
    catch(error) {
        next(new AppError('Product Not Found', 404));
    }
})

app.get('/products/:id/edit', async(req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.render('products/edit', {product});
    }
    catch(error) {
        next(new AppError('Product Not Found', 404));
    }
})

app.put('/products/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body, {runValidators: true, new: true});
        res.redirect(`/products/${product._id}`);
    }
    catch(error) {
        next(error);
    }
})

app.post('/products', (req, res, next) => {
    try {
        const newProduct = new Product(req.body);
        newProduct.save();
        res.redirect(`/products/${newProduct._id}`);
    }
    catch(error) {
        next(error);
    }
})

app.delete('/products/:id', async(req, res, next) => {
    try {
        const {id} = req.params;
        const deleteP = await Product.findByIdAndDelete(id);
        res.redirect('/products');
    }
    catch(error) {
        next(error);
    }
})

app.use((err, req, res, next) => {
    console.log(err.name);
    next(err);
})

app.use((err, req, res, next) => {
    const {status = 500, message = 'Something Wrong'} = err;
    res.status(status).send(message);
})


app.listen(1000, () => {
    console.log("Running on PORT 1000!!!");
})