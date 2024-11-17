import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const ProductPage = () => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("Semua");

    useEffect(() => {
        // Fetch data produk dari MockAPI
        axios.get("https://672f3e07229a881691f24a86.mockapi.io/products")
            .then((response) => {
                setProducts(response.data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const filteredProducts = selectedCategory === "Semua"
        ? products
        : products.filter((product) => product.category === selectedCategory);

    return (
        <>
            <div className="product-page">
                <div className="container mt-4">
                    <h3 className="mb-5 text-center text-light">Daftar Produk EcoShop</h3>
                    <div className="mb-4">
                        <label htmlFor="categorySelect" className="form-label text-light">Filter Berdasarkan Kategori:</label>
                        <select
                            id="categorySelect"
                            className="form-select w-25"
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                        >
                            <option value="Semua">Semua</option>
                            <option value="Perawatan Diri">Perawatan Diri</option>
                            <option value="Produk Rumah Tangga">Produk Rumah Tangga</option>
                        </select>
                    </div>
                    <div className="row pb-5">
                        {filteredProducts.map((product) => (
                            <div className="col-md-4 mb-4" key={product.id}>
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <img
                                            src={product.imageUrl}
                                            alt={product.name}
                                            className="img-products"
                                        />
                                        <h6 className="card-title">{product.name}</h6>
                                        <p className="card-text">Harga: Rp {product.price}</p>
                                        <Link
                                            to={`/product/${product.id}`}
                                            className="btn-lihat-detail-produk"
                                        >
                                            Lihat Detail Produk
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProductPage;
