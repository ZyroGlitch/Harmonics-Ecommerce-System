import React, { useEffect, useRef, useState } from 'react';
import ManagerLayout from '../../Layout/ManagerLayout';
import { FaPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { Link, useForm } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { Modal } from 'bootstrap';

function OnsiteOrder({ products, carts, subtotal }) {

    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    const route = useRoute();
    const [selectedProduct, setSelectedProduct] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        product_id: '',
        quantity: 1
    });

    useEffect(() => {
        if (modalRef.current) {
            modalInstance.current = new Modal(modalRef.current);
        }
    }, []);

    function openModal(product) {
        setSelectedProduct(product);
        setData({
            product_id: product.id,
            quantity: 1
        });

        modalInstance.current?.show();
    }

    function closeModal() {
        modalInstance.current?.hide();
        setSelectedProduct(null);
        reset();
    }

    function submit(e) {
        e.preventDefault();

        post(route('manager.enlistProduct'), {
            onSuccess() {
                closeModal();
            }
        });
    }

    return (
        <div>
            <div className="pt-2">
                <div className="row justify-content-center align-items-center me-1"
                    style={{ maxHeight: '540px', overflowY: 'auto' }}
                >
                    {products.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card shadow-sm rounded bg-light">
                                <div className="card-header text-center bg-light">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt="Product"
                                        className="object-fit-contain"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h5>{product.product_name}</h5>
                                    <p className='fs-6 mb-2'>₱{product.price}</p>

                                    <div className="d-grid">
                                        <button
                                            className={`btn ${product.status === 'Out of Stock' ? 'btn-secondary' : 'btn-success'}`}
                                            disabled={product.status === 'Out of Stock'}
                                            onClick={() => openModal(product)}
                                        >
                                            {product.status === 'Out of Stock' ? 'Unavailable' : 'Enlist'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bootstrap Modal */}
            <div
                className="modal fade"
                tabIndex="-1"
                ref={modalRef}
                id="onsite-modal"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
            >
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={submit}>
                            <div className="modal-header">
                                <h5 className="modal-title">Enlist Product</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                {selectedProduct && (
                                    <>
                                        <div className="text-center mb-3">
                                            <img
                                                src={`/storage/${selectedProduct.image}`}
                                                alt="Selected Product"
                                                className="object-fit-contain"
                                                style={{ width: '200px', height: '200px' }}
                                            />
                                        </div>
                                        <h5>{selectedProduct.product_name}</h5>
                                        <p>₱{selectedProduct.price}</p>
                                        <p>Stock Left: {selectedProduct.stocks}</p>

                                        <div className="mb-3">
                                            <label htmlFor="quantity" className="form-label">Quantity</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="quantity"
                                                value={data.quantity}
                                                min={1}
                                                onChange={(e) => setData('quantity', e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn btn-dark" disabled={processing}>
                                    Enlist
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

OnsiteOrder.layout = page => <ManagerLayout children={page} />;
export default OnsiteOrder;
