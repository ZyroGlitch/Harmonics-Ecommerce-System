import React, { useEffect, useState } from 'react';
import AdminLayout from '../../Layout/AdminLayout';
import Calendar from 'react-calendar';
import { Link, useForm } from '@inertiajs/react';
import { BsPrinterFill } from "react-icons/bs";
import { FaEye, FaPencil } from "react-icons/fa6";
import customer from '../../../../public/assets/images/people.png'
import returnProduct from '../../../../public/assets/images/return-box.png'
import sales_img from '../../../../public/assets/images/sales.png'
import orders from '../../../../public/assets/images/shopping-bag.png'
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import DailySalesChart from '../../Layout/DailySalesChart';
import SalesChart from '../../Layout/SalesChart';
import OrderStatusChart from '../../Layout/OrderStatusChart';
import PaymentChart from '../../Layout/PaymentChart';

function SalesReport({ sales, salesID, totalSales, totalOrders,
    totalCustomers, dailySales, topSellingProduct,
    orderStatusChart, totalCountOrders, mostSelectedPayment, totalPaymentMethod }) {
    // console.log(sales);
    // console.log(salesID);
    // console.log(totalSales);
    // console.log(totalOrders);
    // console.log(totalCustomers);
    console.log(mostSelectedPayment);
    console.log(totalPaymentMethod);

    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // 0-indexed
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDateChange = (newDate) => {
        setDate(newDate);

        const formattedDate = formatDate(newDate); // This will match what you clicked
        setData('sortByDate', formattedDate);
        setShowCalendar(false);

        console.log(formattedDate);
    };


    const route = useRoute();

    const { data, setData, get } = useForm({
        sortByDate: '',
        sortByMonth: 'Monthly',
    });


    useEffect(() => {
        const timeoutID = setTimeout(() => {
            get(route('admin.salesReport'), {
                preserveState: true,
                sortByDate: data.sortByDate,
                sortByMonth: data.sortByMonth,
            });
        }, 300);

        return () => clearTimeout(timeoutID);
    }, [data]);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex align-items-center gap-3 position-relative">
                    <button className="btn btn-success" onClick={toggleCalendar}>
                        {showCalendar ? 'Hide Calendar' : 'Select Date'}
                    </button>

                    {showCalendar && (
                        <div className="calendar-popup position-absolute shadow bg-white rounded p-2">
                            <Calendar
                                onChange={handleDateChange}
                                value={date}
                                className="bootstrap-calendar"
                            />
                        </div>
                    )}

                    <select
                        className="form-select"
                        style={{ width: '200px' }}
                        value={data.sortByMonth}
                        onChange={e => setData('sortByMonth', e.target.value)}
                    >
                        <option value="Today">Today</option>
                        <option value="Weekly">This Week</option>
                        <option value="Monthly">This Month</option>
                    </select>
                </div>

                <Link
                    href={route('admin.salesInvoice')}
                    className='btn btn-success d-flex align-items-center gap-2'
                >
                    <BsPrinterFill /> Download PDF
                </Link>
            </div>

            <div className="d-flex align-items-center gap-3 mb-4">
                <div className="card shadow-sm rounded w-100">
                    <div className="card-body">
                        <img
                            src={sales_img}
                            alt="image"
                            className="object-fit-cover mb-3"
                            style={{ width: '50px', height: '50px' }}
                        />

                        <h5>₱{totalSales}</h5>
                        <p>Total Sales</p>
                    </div>
                </div>

                <div className="card shadow-sm rounded w-100">
                    <div className="card-body">
                        <img
                            src={orders}
                            alt="image"
                            className="object-fit-cover mb-3"
                            style={{ width: '50px', height: '50px' }}
                        />

                        <h5>{totalOrders}</h5>
                        <p>Total Orders</p>
                    </div>
                </div>

                <div className="card shadow-sm rounded w-100">
                    <div className="card-body">
                        <img
                            src={returnProduct}
                            alt="image"
                            className="object-fit-cover mb-3"
                            style={{ width: '50px', height: '50px' }}
                        />

                        <h5>5</h5>
                        <p>Returned Orders</p>
                    </div>
                </div>

                <div className="card shadow-sm rounded w-100">
                    <div className="card-body">
                        <img
                            src={customer}
                            alt="image"
                            className="object-fit-cover mb-3"
                            style={{ width: '50px', height: '50px' }}
                        />

                        <h5>{totalCustomers}</h5>
                        <p>Customers</p>
                    </div>
                </div>
            </div>

            <div className="card rounded shadow mb-4">
                <div className="card-header bg-success text-light">
                    <h4>Sales</h4>
                </div>
                <div className="card-body">
                    <table class="table">
                        <thead className='text-center'>
                            <tr className='align-middle'>
                                <th className='text-start'>Order ID</th>
                                <th className='text-start'>Customer Name</th>
                                <th>Item Sold</th>
                                <th>Total Amount</th>
                                <th>Payment Method</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                sales.data.length > 0 ? (
                                    sales.data.map((sale, index) => {
                                        const formattedDate = new Date(sale.updated_at).toLocaleString("en-US", {
                                            month: "long",
                                            day: "2-digit",
                                            year: "numeric",
                                        });

                                        return (
                                            <tr className='align-middle' key={salesID[index].order_id}>
                                                <td className='text-start'>{salesID[index].order_id}</td>
                                                <td className='text-start'>{sale.user.firstname} {sale.user.lastname}</td>
                                                <td>{sale.quantity}</td>
                                                <td>₱{sale.total}</td>
                                                <td>{sale.payment_method}</td>
                                                <td className='text-success'>{sale.order_status}</td>
                                                <td>{formattedDate}</td>
                                                <td>
                                                    <Link className="btn btn-primary btn-sm">
                                                        <FaEye />
                                                    </Link>
                                                </td>
                                            </tr>
                                        )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="text-center text-muted py-3">
                                            No orders found.
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center bg-light p-3">
                    <p>Showing {sales.to} out of {sales.total} products</p>

                    <div>
                        {
                            sales.links.map((link) => (
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

            <div className="card shadow rounded mb-4">
                <div className="card-body">
                    <h3>Sales of each Product</h3>
                    <DailySalesChart dailySales={dailySales} />
                </div>
            </div>

            <div className="card shadow rounded mb-4">
                <div className="card-body">
                    <h3>Top Selling Products</h3>
                    <SalesChart topSellingProducts={topSellingProduct} />
                </div>
            </div>

            <div className="d-flex align-items-center gap-3">
                <div className="card shadow rounded w-100">
                    <div className="card-body d-flex flex-column align-items-center">
                        <OrderStatusChart
                            orderStatus={orderStatusChart}
                            totalCountOrders={totalCountOrders}
                        />
                    </div>
                </div>

                <div className="card shadow rounded w-100">
                    <div className="card-body d-flex flex-column align-items-center">
                        <PaymentChart
                            orderStatus={mostSelectedPayment}
                            totalCountOrders={totalPaymentMethod}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

SalesReport.layout = (page) => <AdminLayout children={page} />;
export default SalesReport;
