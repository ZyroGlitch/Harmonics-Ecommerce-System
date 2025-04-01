import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import { Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { IoReceipt } from "react-icons/io5";

function Orders({ orders, order_id }) {
    console.log(orders);
    // console.log(order_id);

    const route = useRoute();

    return (
        <div>
            <h2 className='text-success mb-3'>Orders</h2>
            <div className="card shadow rounded-lg border-0">
                <div className="card-body">
                    <table class="table">
                        <thead className='table-light'>
                            <tr className='text-center'>
                                <th></th>
                                <th className='text-start'>Order ID</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Cash Received</th>
                                <th>Change</th>
                                <th>Status</th>
                                <th>Ordered Date</th>
                                <th>Invoice</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {orders.data.length > 0 ? (
                                orders.data.map((order, index) => {
                                    const formattedDate = new Date(order.updated_at).toLocaleString("en-US", {
                                        month: "long",
                                        day: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                    });

                                    return (
                                        <tr className='align-middle' key={order_id[index].order_id}>
                                            <td className='text-center'>
                                                <input
                                                    className="form-check-input shadow-sm"
                                                    type="checkbox"
                                                    value={order_id[index].order_id}
                                                />
                                            </td>
                                            <td className='text-start'>
                                                #{order_id[index].order_id}
                                            </td>
                                            <td>{order.quantity}</td>
                                            <td>₱{order.total}</td>
                                            <td>₱{order.cash_recieved}</td>
                                            <td>₱{order.change}</td>
                                            <td className='text-success'>{order.order_status}</td>
                                            <td>{formattedDate}</td>
                                            <td>
                                                <Link
                                                    href={route('customer.invoice', { order_id: order_id[index].order_id })}
                                                    className='fs-5 text-dark'
                                                >
                                                    <IoReceipt />
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

Orders.layout = page => <CustomerLayout children={page} />
export default Orders