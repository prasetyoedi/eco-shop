import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";
import Footer from "../components/Footer";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", imageUrl: "" });
    const [editProduct, setEditProduct] = useState(null);
    const [editModal, setEditModal] = useState({ name: "", description: "", price: "", imageUrl: "" });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("https://672f3e07229a881691f24a86.mockapi.io/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    };

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.imageUrl) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Semua kolom harus diisi!',
            });
            return;
        }

        axios.post("https://672f3e07229a881691f24a86.mockapi.io/products", newProduct)
            .then(() => {
                fetchProducts();
                setNewProduct({ name: "", description: "", price: "", imageUrl: "" });
                setShowAddModal(false);
                Swal.fire({
                    icon: 'success',
                    title: 'Produk Ditambahkan!',
                    text: 'Produk berhasil ditambahkan.',
                });
            })
            .catch((error) => console.error("Error adding product:", error));
    };

    const handleDeleteProduct = (id) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Data yang dihapus tidak dapat dikembalikan!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://672f3e07229a881691f24a86.mockapi.io/products/${id}`)
                    .then(() => {
                        fetchProducts();
                        Swal.fire(
                            'Dihapus!',
                            'Produk telah berhasil dihapus.',
                            'success'
                        );
                    })
                    .catch((error) => console.error("Error deleting product:", error));
            }
        });
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setEditModal({ name: product.name, description: product.description, price: product.price, imageUrl: product.imageUrl });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditProduct = () => {
        if (!editModal.name || !editModal.description || !editModal.price || !editModal.imageUrl) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Semua kolom harus diisi untuk mengedit!',
            });
            return;
        }

        axios.put(`https://672f3e07229a881691f24a86.mockapi.io/products/${editProduct.id}`, editModal)
            .then(() => {
                fetchProducts();
                closeEditModal();
                Swal.fire({
                    icon: 'success',
                    title: 'Produk Diperbarui!',
                    text: 'Produk berhasil diperbarui.',
                });
            })
            .catch((error) => console.error("Error updating product:", error));
    };

    return (
        <>
            <div className="manage-product pb-5">
                <div className="container mt-4">
                    <h2 className="mb-4 text-center">Kelola Produk</h2>
                    <button className="btn btn-primary mb-4" onClick={() => setShowAddModal(true)}>Tambah Produk</button>
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Gambar</th>
                                    <th>Nama Produk</th>
                                    <th>Deskripsi</th>
                                    <th>Harga</th>
                                    <th>Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product) => (
                                    <tr key={product.id}>
                                        <td>
                                            <img src={product.imageUrl} alt={product.name} style={{ width: "100px", height: "auto" }} />
                                        </td>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>Rp {product.price}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => openEditModal(product)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                    <path d="M3 6H5H21" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M10 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                    <path d="M14 11V17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {/* Add Product Modal */}
                    {showAddModal && (
                        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Tambah Produk</h5>
                                        <button type="button" className="btn-close" onClick={() => setShowAddModal(false)}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Nama Produk"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Deskripsi"
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        />
                                        <input
                                            type="number"
                                            className="form-control mb-2"
                                            placeholder="Harga"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="URL Gambar"
                                            value={newProduct.imageUrl}
                                            onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>Batal</button>
                                        <button type="button" className="btn btn-primary" onClick={handleAddProduct}>
                                            Tambah Produk
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className=" fade show" onClick={() => setShowAddModal(false)}></div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {showEditModal && (
                        <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Produk</h5>
                                        <button type="button" className="btn-close" onClick={closeEditModal}></button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Nama Produk"
                                            value={editModal.name}
                                            onChange={(e) => setEditModal({ ...editModal, name: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="Deskripsi"
                                            value={editModal.description}
                                            onChange={(e) => setEditModal({ ...editModal, description: e.target.value })}
                                        />
                                        <input
                                            type="number"
                                            className="form-control mb-2"
                                            placeholder="Harga"
                                            value={editModal.price}
                                            onChange={(e) => setEditModal({ ...editModal, price: e.target.value })}
                                        />
                                        <input
                                            type="text"
                                            className="form-control mb-2"
                                            placeholder="URL Gambar"
                                            value={editModal.imageUrl}
                                            onChange={(e) => setEditModal({ ...editModal, imageUrl: e.target.value })}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Batal</button>
                                        <button type="button" className="btn btn-primary" onClick={handleEditProduct}>Simpan</button>
                                    </div>
                                </div>
                            </div>
                            <div className="fade show" onClick={closeEditModal}></div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ManageProducts;
