import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://672f3e07229a881691f24a86.mockapi.io/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Daftar Produk Ramah Lingkungan</h2>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text">{product.description}</p>
                                <p className="card-text">Harga: Rp {product.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
