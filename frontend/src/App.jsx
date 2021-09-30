import { useState, useEffect } from 'react';

export default function App() {

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [products, setProducts] = useState([]);

    useEffect(getProducts, []);

    function getProducts () {
        const url = "http://localhost:3333/products";
        fetch(url)
            .then(response => response.json())
            .then(results => {
                console.log(results);
                setProducts(results)
            })
            .catch(error => console.log("ERROR FETCHING DATA", error));
    };

    function addProduct() {
        const product = { name, price };
        const url = "http://localhost:3333/products";
        const config = {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json' // sometimes called "mimetype"
            }
        };

        fetch(url, config)
            .then(response => response.json())
            .then(result => {
                getProducts();
                setName("");
                setPrice(0);
            })
            .catch(err => console.log("OH NO, ERROR", err))
    }

    function deleteProduct(product) {
        alert("Deleting " + product.name);
        const url = "http://localhost:3333/products/" + product._id;
        const config = {
            method: 'DELETE'
        };

        fetch(url, config)
            .then(response => response.json())
            .then(result => {
                getProducts();
            })
            .catch(err => console.log("OH NO, ERROR", err))
    }

    return (
        <div>
            <h1>Products</h1>
            <ul>
                {products.map(p => <li>
                    {p._id} {p.name}
                    <button onClick={() => deleteProduct(p)}>DELETE</button>
                </li>)}
            </ul>

            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="name"
            />
            <br/>
            
            <input
                type="number"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                placeholder="price"
            />
            <br/>
            
            <button onClick={addProduct}>
                Add new product
            </button>

        </div>
    )

}