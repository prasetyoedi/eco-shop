import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from "sweetalert2";

const ManageProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
    const [editProduct, setEditProduct] = useState(null);
    const [editModal, setEditModal] = useState({ name: "", description: "", price: "" });
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false); // State untuk modal tambah produk

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get("https://672f3e07229a881691f24a86.mockapi.io/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    };

    const handleAddProduct = () => {
        if (!newProduct.name || !newProduct.description || !newProduct.price) {
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
                setNewProduct({ name: "", description: "", price: "" });
                setShowAddModal(false); // Tutup modal setelah produk ditambahkan
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
        setEditModal({ name: product.name, description: product.description, price: product.price });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const handleEditProduct = () => {
        if (!editModal.name || !editModal.description || !editModal.price) {
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
        <div className="container mt-4">
            <h2 className="mb-4">Kelola Produk</h2>
            <button className="btn btn-primary mb-4" onClick={() => setShowAddModal(true)}>Tambah Produk</button>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nama Produk</th>
                        <th>Deskripsi</th>
                        <th>Harga</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>Rp {product.price}</td>
                            <td>
                                <button
                                    className="btn btn-warning btn-sm me-2"
                                    onClick={() => openEditModal(product)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => handleDeleteProduct(product.id)}
                                >
                                    Hapus
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

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
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeEditModal}>Batal</button>
                                <button type="button" className="btn btn-primary" onClick={handleEditProduct}>
                                    Simpan Perubahan
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className=" fade show" onClick={closeEditModal}></div>
                </div>
            )}
        </div>
    );
};

export default ManageProducts;
