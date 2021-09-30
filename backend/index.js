import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Product from './models/product.js';

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connection.on('error',        (e) => console.log("MONGO ERROR", e));
mongoose.connection.on('connecting',   () => console.log("MONGO Connecting"));
mongoose.connection.on('connected',   () => console.log("MONGO Connected"));
mongoose.connection.on('disconnected', () => console.log("MONGO Disconnected"));

const cs = "mongodb://jimmy2:passw0rd@localhost:27017/jimmydb";
await mongoose.connect(cs);

app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

app.post('/products', (req,res) => {
    const product = new Product(req.body);

    console.log(req.body);

    product.save()
        .then(() => {
            console.log("Product saved :)");
            res.send({ message: "All good" });
        })
        .catch((error) => {
            console.log("ERROR DURING PRODUCT SAVE", error);
            res.status(400);
            res.send({ message: "All bad" });
        });
});

app.delete('/products/:productId', (req,res) => {
    Product
        .deleteOne({ _id: req.params.productId })
        .then(result => {
            console.log(result);
            res.send({ message: "All very good" });
        })
        .catch(error => {
            console.log("Error when deleting", error);
            res.status(400);
            res.send({ message: "All very bad" });
        });
})

app.listen(3333, () => {
    console.log("Listening for requests at http://localhost:3333");
})
