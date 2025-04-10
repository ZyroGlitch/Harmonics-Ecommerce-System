import React from 'react'
import CustomerLayout from '../../../Layout/CustomerLayout'
import { FaWallet } from "react-icons/fa6";
import paymaya from '../../../../../public/assets/images/paymaya.png'
import gcash from '../../../../../public/assets/images/gcash.png'
import { Link } from '@inertiajs/react';

function BuyProduct({ product, quantity }) {
    return (
        <div className='py-3'>
            <nav aria-label="breadcrumb" className='mb-4'>
                <ol class="breadcrumb fw-semibold">
                    <Link
                        href={route('customer.showProduct', { product_id: product.id })}
                        className="breadcrumb-item text-muted"
                        style={{ textDecoration: 'none' }}
                    >Back</Link>

                    <li className="breadcrumb-item active text-success" aria-current="page">Buy {product.product_name}</li>
                </ol>
            </nav>

            <div className="row justify-content-between">
                <div className="col-md-6 text-center">
                    <img
                        src={`/storage/${product.image}`}
                        alt="product"
                        className="object-fit-contain"
                        style={{ width: '400px', height: '400px' }}
                    />
                </div>

                <div className="col-md-6">
                    <div className="card shadow rounded">
                        <div className="card-body">
                            <h2 className='text-success mb-4'>{product.product_name}</h2>

                            <div className="d-flex flex-column gap-2 mb-4">
                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className='text-muted'>Price</h6>
                                    <p>₱{product.price}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className='text-muted'>Quantity</h6>
                                    <p>x {quantity}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center">
                                    <h6 className='text-muted'>Subtotal</h6>
                                    <p>₱{(product.price * quantity).toFixed(2)}</p>
                                </div>
                            </div>

                            <h5 className='d-flex align-items-center gap-2 text-success'><FaWallet /> Select Payment Method</h5>
                            <hr />

                            <div className="d-flex align-items-center gap-3 mb-4">
                                <button className="btn btn-outline-primary d-flex justify-content-center align-items-center w-100 gap-2 fw-semibold">
                                    <img
                                        src={gcash}
                                        alt="icon"
                                        className="object-fit-contain"
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                    Gcash
                                </button>

                                <button className="btn btn-outline-success d-flex justify-content-center align-items-center w-100 gap-2 fw-semibold">
                                    <img
                                        src={paymaya}
                                        alt="icon"
                                        className="object-fit-contain"
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                    Paymaya
                                </button>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="referrence" className="form-label">Referrence Number</label>
                                <input
                                    type="text"
                                    className="form-control shadow-sm"
                                    id='referrence'
                                    placeholder='e.g 9289713240'
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="receipt" className="form-label">Upload Receipt</label>
                                <input
                                    type="file"
                                    className="form-control shadow-sm"
                                    id='receipt'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

BuyProduct.layout = page => <CustomerLayout children={page} />
export default BuyProduct