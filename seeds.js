const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!");
    })
    .catch(err => {
        console.log("MONGO Error!!!!");
        console.log(err);
    })

// const p = new Product({
//     name: 'Ruby Grape',
//     price: 2.00,
//     category: 'fruit'
// })

// p.save()
//     .then(p => {
//         console.log(p);
//     })
//     .catch(e => {
//         console.log(e);
//     })

const seedProducts = [
    {
        name: 'Melon',
        price: 1.99,
        category: 'fruit'
    },
    {
        name: 'Orange',
        price: 2.45,
        category: 'fruit'
    },
    {
        name: 'Fairy Eggplant',
        price: 2.33,
        category: 'vegetable'
    }
]

Product.insertMany(seedProducts)
    .then(c => {
        console.log(c);
    })
    .catch(e => {
        console.log(e);
    })