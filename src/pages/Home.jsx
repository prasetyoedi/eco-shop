import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
    return (
        <div className="container mt-4 text-center">
            <h1>Welcome to EcoShop</h1>
            <p>Your go-to online store for eco-friendly products!</p>
            <p>Explore our range of sustainable products to support a greener planet.</p>
            <Link to="/products" className="btn btn-primary mt-3">View Products</Link>
        </div>
    );
};

export default Home;
