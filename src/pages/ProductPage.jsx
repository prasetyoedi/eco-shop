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
            <h3 className="mb-5 text-center">Daftar Produk EcoShop</h3>
            <div className="row">
                {products.map((product) => (
                    <div className="col-md-4 mb-4" key={product.id}>
                        <div className="card">
                            <div className="card-body">
                                <img src={product.imageUrl} alt={product.name} className="img-products" />
                                <h6 className="card-title">{product.name}</h6>
                                {/* <p className="card-text">{product.description}</p> */}
                                <p className="card-text">Harga: Rp {product.price}</p>
                                <a href="https://api.whatsapp.com/send/?phone=6283134339542&text&type=phone_number&app_absent=0" className="text-decoration-none">
                                    <div className="btn-buy">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
                                            <g clip-path="url(#clip0_42_1035)">
                                                <path d="M16.05 13C16.8 13 17.46 12.59 17.8 11.97L21.38 5.48C21.75 4.82 21.27 4 20.51 4H5.71L4.77 2H1.5V4H3.5L7.1 11.59L5.75 14.03C5.02 15.37 5.98 17 7.5 17H19.5V15H7.5L8.6 13H16.05ZM6.66 6H18.81L16.05 11H9.03L6.66 6ZM7.5 18C6.4 18 5.51 18.9 5.51 20C5.51 21.1 6.4 22 7.5 22C8.6 22 9.5 21.1 9.5 20C9.5 18.9 8.6 18 7.5 18ZM17.5 18C16.4 18 15.51 18.9 15.51 20C15.51 21.1 16.4 22 17.5 22C18.6 22 19.5 21.1 19.5 20C19.5 18.9 18.6 18 17.5 18Z" fill="white" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_42_1035">
                                                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                        Buy Now
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductPage;
