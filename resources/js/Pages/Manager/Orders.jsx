import React from 'react'
import ManagerLayout from '../../Layout/ManagerLayout'
import { Link } from '@inertiajs/react';
import { IoReceipt } from "react-icons/io5";
import { FaEye } from "react-icons/fa6";

function Orders({ orders }) {
    console.log(orders);

    return (
        <div>
            <h2 className='text-success mb-3'>{orders.total} Orders</h2>

            <div className="card shadow rounded">
                <div className="card-body">
                    <table class="table">
                        <thead className='align-middle text-center'>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Amount Received</th>
                                <th>Change</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {orders.data.length > 0 ? (
                                orders.data.map((order) => {
                                    return (
                                        <tr className='align-middle' key={order.id}>
                                            <td>#XYZ-{order.id}</td>
                                            <td>{order.customer_name}</td>
                                            <td>{order.quantity}</td>
                                            <td>₱{order.total}</td>
                                            <td>₱{order.cash_received}</td>
                                            <td>₱{order.change}</td>
                                            <td>{order.payment_method}</td>
                                            <td
                                                className={`
                                                    ${order.order_status === 'Pending' ? 'text-warning' : ''}

                                                    ${order.order_status === 'Processing' ? 'text-secondary' : ''}

                                                    ${order.order_status === 'Shipped' ? 'text-primary' : ''}

                                                    ${order.order_status === 'Completed' ? 'text-success' : ''}
                                                    `}
                                            >
                                                {order.order_status}
                                            </td>
                                            <td>
                                                <Link
                                                    href={route('manager.view_walkInOrders', { order_id: order.id })}
                                                    className='btn btn-primary btn-sm shadow-sm d-flex align-items-center gap-2'
                                                >
                                                    <FaEye /> View
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center text-muted py-3">
                                        No orders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center bg-light p-3">
                    <p>{orders.to} out of {orders.total} Products</p>

                    <div>
                        {
                            orders.links.map((link) => (
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
    )
}

Orders.layout = page => <ManagerLayout children={page} />
export default Orders