import React from 'react'
import ManagerLayout from '../../../Layout/ManagerLayout';
import { Link } from '@inertiajs/react';
import { FaPrint, FaCubes } from "react-icons/fa6";

function ViewOrders({ order_details, totalItems, totalAmount }) {
    console.log(order_details);
    console.log(totalItems);
    console.log(totalAmount);

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb" >
                    <li class="breadcrumb-item">
                        <Link href={route('manager.orders')} className='text-success d-flex align-items-center gap-2' style={{ textDecoration: 'none' }}><FaCubes /> Home</Link>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">Library</li>
                </ol>
            </nav>

            <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className='text-success mb-3'>{order_details.total} Orders</h2>
                <Link
                    href={route('manager.invoice', { order_id: order_details.data[0].id })}
                    className="btn btn-success shadow-sm d-flex align-items-center gap-2"
                >
                    <FaPrint /> Download Order Receipt
                </Link>
            </div>


            <div className="row justify-content-between">
                <div className="col-md-8">
                    <div className="card shadow rounded">
                        <div className="card-body">
                            <table class="table">
                                <thead className='align-middle text-center'>
                                    <tr>
                                        <th>ID</th>
                                        <th>Product</th>
                                        <th>Quantity</th>
                                        <th>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody className='align-middle text-center'>
                                    {
                                        order_details.data.map(order_detail => (
                                            <tr key={order_detail.id}>
                                                <td>{order_detail.id}</td>
                                                <td className='d-flex align-items-center'>
                                                    <img
                                                        src={`/storage/${order_detail.products.image}`}
                                                        alt="image"
                                                        className="object-fit-contain"
                                                        style={{ width: '50px', height: '50px' }}
                                                    />
                                                    {order_detail.products.product_name}
                                                </td>
                                                <td>{order_detail.quantity}</td>
                                                <td>₱{order_detail.subtotal}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                            </table>
                        </div>
                        <div className="card-footer d-flex justify-content-between align-items-center bg-light p-3">
                            <p>Showing {order_details.to} out of {order_details.total} Products</p>

                            <div>
                                {
                                    order_details.links.map((link) => (
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
                    <div className="card shadow rounded">
                        <div className="card-header bg-success text-light">
                            <h4>Order Summary</h4>
                        </div>
                        <div className="card-body d-flex flex-column gap-2">
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='fs-6 fw-semibold'>Customer name: </p>
                                <p>
                                    {order_details.data[0].checkout_orders.customer_name}
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='fs-6 fw-semibold'>Total items: </p>
                                <p>
                                    {totalItems} items
                                </p>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <p className='fs-6 fw-semibold'>Total amount: </p>
                                <p>
                                    ₱{totalAmount}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

ViewOrders.layout = page => <ManagerLayout children={page} />
export default ViewOrders