import React, { useEffect } from 'react'
import { Link, useForm, usePage } from '@inertiajs/react'
import { FaTrash } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import ManagerLayout from '../../Layout/ManagerLayout';
import Swal from 'sweetalert2';

function Cart({ carts, total }) {
    console.log(carts);
    console.log(total);

    const route = useRoute();
    const { flash } = usePage().props;

    useEffect(() => {
        // This is for sweetalert js
        if (flash.success) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: flash.success,
                confirmButtonColor: '#28a745'
            });
        } else if (flash.error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: flash.error,
                confirmButtonColor: '#dc3545'
            });
        }
    }, [flash]);

    const { data, setData, post, processing, reset, errors } = useForm({
        cart_id: carts.data.map(cart => cart.id),
        total: total,
        cash_received: '0',
        customer_name: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('manager.checkout'), {
            onSuccess() {
                reset();
            }
        });
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div className="d-flex justify-content-center gap-2">
                    <div className="col-md-8">
                        <div className="card shadow-sm rounded">
                            <div className="card-header bg-success text-light d-flex justify-content-between align-items-center">
                                <h4>Cart</h4>
                                <h4>{carts.total} Items</h4>
                            </div>
                            <div className="card-body">
                                <table class="table">
                                    <thead className='text-center'>
                                        <tr>
                                            <th className='text-start'>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {carts.data.length > 0 ? (
                                            carts.data.map((cart) => (
                                                <tr className='align-middle' key={cart.id}>
                                                    <td className='text-start d-flex align-items-center gap-2'>
                                                        <img
                                                            src={`/storage/${cart.product.image}`}
                                                            alt="image"
                                                            className="object-fit-contain"
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                        <p>{cart.product.product_name}</p>
                                                    </td>
                                                    <td>₱{cart.product.price}</td>
                                                    <td>{cart.quantity}</td>
                                                    <td>₱{cart.subtotal}</td>
                                                    <td>

                                                        <Link
                                                            href={route('manager.removeItem', { cart_id: cart.id })}
                                                            className='btn btn-outline-danger btn-sm d-flex justify-content-center align-items-center gap-1'
                                                        >
                                                            <FaTrash /> Delete
                                                        </Link>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted">
                                                    No products in the cart.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                            <div className="card-footer d-flex justify-content-between align-items-center bg-light p-3">
                                <p>Showing {carts.to} out of {carts.total} products</p>

                                <div>
                                    {
                                        carts.links.map((link) => (
                                            link.url ?
                                                <Link
                                                    key={link.label}
                                                    href={link.url}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className={`btn btn-sm me-3 ${link.active ? 'btn-success' : 'btn-outline-success'}`}
                                                    style={{ textDecoration: 'none' }}
                                                    preserveScroll
                                                />

                                                :
                                                <span
                                                    key={link.label}
                                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                                    className='me-3 text-muted'
                                                >

                                                </span>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card shadow-sm rounded">
                            <div className="card-body">
                                <h4 className='text-success mb-3'>Order Summary</h4>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className='fw-bold'>Items</p>
                                    <p>{carts.total} Items</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className='fw-bold'>Total</p>
                                    <p>₱{total}</p>
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className='fw-bold'>Change</p>
                                    <p>₱{data.cash_received - total}</p>
                                </div>
                                <hr />

                                <div className="mb-3">
                                    <label htmlFor="cash" className="form-label text-dark fw-bold mb-2">Cash received</label>
                                    <input
                                        type="number"
                                        className="form-control shadow-sm"
                                        id='cash'
                                        min='0'
                                        value={data.cash_received}
                                        onChange={(e) => setData('cash_received', e.target.value)}
                                    />

                                    {
                                        errors.cash_received && (
                                            <p className='text-danger mt-2'>{errors.cash_received}</p>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="customer_name" className="form-label text-dark fw-bold mb-2">Customer name</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-sm"
                                        id='customer_name'
                                        value={data.customer_name}
                                        onChange={(e) => setData('customer_name', e.target.value)}
                                    />

                                    {
                                        errors.customer_name && (
                                            <p className='text-danger mt-2'>{errors.customer_name}</p>
                                        )
                                    }
                                </div>

                                <button
                                    type='submit'
                                    className='btn btn-success w-100 shadow d-flex justify-content-center align-items-center gap-2'
                                    disabled={processing}
                                ><BsCartFill /> Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    )
}

Cart.layout = page => <ManagerLayout children={page} />
export default Cart