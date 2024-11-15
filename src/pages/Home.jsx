import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../components/Footer";
import WhyOus from "./WhyOus";
import Chatbot from "../components/Chatbot";

const Home = () => {
    return (
        <>
            <div className="hero-section">
                <div className="container">
                    <h1>Welcome to Eco Shop <br />
                        <span className="fw-light">Your Choice for</span><br />
                        <span style={{ color: "#66FF50" }}>Eco-Friendly Shopping</span>
                    </h1>
                    <p>Embrace Sustainability. Choose Green Living. <br /> Your Eco-Friendly Hub for Conscious Shopping</p>
                    <div className="d-flex justify-content-end custom-center">
                        <Link to="/products" className="shop-now">Shop Now <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M7.5 17.5039L17.5 7.50391" stroke="#24771A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M7.5 7.50391H17.5V17.5039" stroke="#24771A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg></Link>
                    </div>
                </div>
            </div>
            <WhyOus />
            <Chatbot />
            <Footer />
        </>
    );
};

export default Home;
