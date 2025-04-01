import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'
import { Link, router, useForm } from '@inertiajs/react'
import { FaEye, FaArrowLeftLong } from "react-icons/fa6";
import { IoSearchSharp } from "react-icons/io5";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { IoReceipt } from "react-icons/io5";

function Sales({ employees, order_id, orders, currentSelected_ID }) {
    console.log(employees);
    console.log(order_id);
    console.log(orders);
    console.log('The current employee filter : ' + currentSelected_ID);

    const route = useRoute();

    const { data, setData, post, processing, reset } = useForm({
        order_id: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('admin.searchedOrderID'), {
            onSuccess() {
                reset();
            }
        })
    }


    const handleEmployeeChange = (e) => {
        e.preventDefault();

        const selectedId = e.target.value;
        router.get(route('admin.selectedEmployee', { user_id: selectedId }));
    };


    return (
        <div className='py-3'>
            <div className="row align-items-center gap-4 mb-4">
                <form onSubmit={submit} className='col-md-5 d-flex align-items-center gap-2'>
                    <input
                        type="text"
                        className="form-control shadow-sm"
                        placeholder='Search Order ID'
                        value={data.order_id}
                        onChange={(e) => setData('order_id', e.target.value)}
                    />
                    <button
                        type='submit'
                        className='btn btn-primary'
                        disabled={processing}
                    >
                        <IoSearchSharp />
                    </button>
                </form>

                <div className="col-md-6 d-flex align-items-center gap-3">
                    <label htmlFor="employee" className="form-label">Select Employee</label>
                    <select
                        className="form-select shadow-sm"
                        id="employee"
                        style={{ width: '300px' }}
                        onChange={handleEmployeeChange}
                    >
                        <option value="All" selected={currentSelected_ID === 'All'}>All</option>

                        {employees.map(employee => (
                            <option
                                value={employee.id}
                                key={employee.id}
                                selected={currentSelected_ID == employee.id}
                            >
                                {employee.firstname} {employee.lastname}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            <div className="card shadow-sm rounded-lg">
                {
                    order_id ?
                        ''
                        :
                        <div className="card-header d-flex justify-content-between align-items-center bg-success">
                            <Link
                                href={route('admin.sales')}
                                className='d-flex align-items-center gap-2 text-light'
                                style={{ textDecoration: 'none' }}
                            >
                                <FaArrowLeftLong />
                                Back
                            </Link>

                            <Link
                                href={route('admin.invoice', { order_id: orders.data[0].order_id })}
                                className='btn btn-light btn-sm shadow-sm d-flex align-items-center gap-2'
                                style={{ textDecoration: 'none' }}
                            >
                                <IoReceipt />
                                View Invoice
                            </Link>
                        </div>
                }

                <div className="card-body">
                    <table class="table">
                        <thead className='text-center'>
                            {
                                order_id ?
                                    <tr>
                                        <th className='text-start'>Order ID</th>
                                        <th>Employee ID</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Cash Received</th>
                                        <th>Change</th>
                                        <th>Status</th>
                                        <th></th>
                                    </tr>
                                    :
                                    <tr>
                                        <th className='text-start'>Product</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Total</th>
                                        <th>Date Ordered</th>
                                    </tr>
                            }

                        </thead>
                        <tbody className='text-center'>
                            {
                                orders.data.length > 0 ? (
                                    order_id ? (
                                        orders.data.map((order, index) => (
                                            <tr className='align-middle' key={index}>
                                                <td className='text-start'>
                                                    {Array.isArray(order_id)
                                                        ? order_id[index]?.order_id
                                                        : order_id?.order_id
                                                    }
                                                </td>
                                                <td>{order.user_id}</td>
                                                <td>{order.quantity}</td>
                                                <td>₱{order.total}</td>
                                                <td>₱{order.cash_recieved}</td>
                                                <td>₱{order.change}</td>
                                                <td className='text-success'>{order.order_status}</td>
                                                <td>
                                                    <Link
                                                        href={route('admin.sales', {
                                                            order_id:
                                                                Array.isArray(order_id)
                                                                    ? order_id[index]?.order_id
                                                                    : order_id?.order_id
                                                        })}
                                                        className='text-dark'
                                                    >
                                                        <FaEye />
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        orders.data.map(order => (
                                            <tr className='align-middle' key={order.id}>
                                                <td className='d-flex align-items-center gap-3'>
                                                    <img
                                                        src={`/storage/${order.product.image}`}
                                                        alt="product"
                                                        className="object-fit-cover"
                                                        style={{ width: '50px', height: '50px' }}
                                                    />
                                                    <p>{order.product.product_name}</p>
                                                </td>
                                                <td>₱{order.product.price}</td>
                                                <td>{order.quantity}</td>
                                                <td>₱{order.total}</td>
                                                <td>
                                                    {new Date(order.updated_at).toLocaleString('en-US', {
                                                        month: 'long',
                                                        day: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </td>
                                            </tr>
                                        ))
                                    )
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="text-center text-muted py-3">
                                            No orders found.
                                        </td>
                                    </tr>
                                )
                            }
                        </tbody>

                    </table>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center p-3">
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

Sales.layout = page => <AdminLayout children={page} />
export default Sales
