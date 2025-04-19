import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import { Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { IoReceipt } from "react-icons/io5";
import { FaCommentDots } from "react-icons/fa6";

function Orders({ orders, order_id }) {
    console.log(orders);
    console.log(order_id);

    const route = useRoute();

    return (
        <div className='p-4'>
            <h2 className='text-success mb-3'>{orders.total} Orders</h2>
            <div className="card shadow rounded-lg border-0">
                <div className="card-body">
                    <table class="table">
                        <thead>
                            <tr className='text-center'>
                                <th className='text-start'>Order ID</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Ordered Date</th>
                                <th>Invoice</th>
                                <th>Feedback</th>
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
                                            <td className='text-start'>
                                                #{order_id[index].order_id}
                                            </td>
                                            <td>{order.quantity}</td>
                                            <td>₱{order.total}</td>
                                            <td
                                                className={`
                                                    ${order.order_status === 'Pending' ? 'text-warning' : ''}

                                                    ${order.order_status === 'Processing' ? 'text-secondary' : ''}

                                                    ${order.order_status === 'Shipped' ? 'text-primary' : ''}

                                                    ${order.order_status === 'Delivered' ? 'text-info' : ''}

                                                    ${order.order_status === 'Completed' ? 'text-success' : ''}
                                                    `}
                                            >
                                                {order.order_status}
                                            </td>
                                            <td>{formattedDate}</td>
                                            <td>
                                                <Link
                                                    href={route('customer.invoice', { order_id: order_id[index].order_id })}
                                                    className='fs-5 text-dark'
                                                >
                                                    <IoReceipt />
                                                </Link>
                                            </td>
                                            {
                                                order.order_status === 'Completed' ? (
                                                    <td>
                                                        <Link
                                                            href={route('customer.invoice', { order_id: order_id[index].order_id })}
                                                            className='fs-5 text-dark'
                                                        >
                                                            <FaCommentDots />
                                                        </Link>
                                                    </td>
                                                ) : (
                                                    ''
                                                )
                                            }
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