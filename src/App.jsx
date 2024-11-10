import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import ManageProducts from "./pages/ManageProducts";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm mb-4 py-3">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/logo.png" alt="Logo Eco Shop" className="logo" />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Produk</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/manage-products">Kelola Produk</Link>
              </li>
            </ul>
            {/* <form className="d-flex ms-3">
              <input className="form-control me-2 border-success" type="search" placeholder="Cari Produk" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Cari</button>
            </form> */}
          </div>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/manage-products" element={<ManageProducts />} />
      </Routes>
    </Router>
  );
};

export default App;
