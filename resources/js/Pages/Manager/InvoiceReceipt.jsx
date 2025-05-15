import React from 'react';
import { FaPrint, FaArrowLeft } from "react-icons/fa6";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/assets/images/logo.png'
import { Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import ManagerLayout from '../../Layout/ManagerLayout';

function InvoiceReceipt({ order_details, total }) {
    console.log(order_details);
    console.log(total);

    const route = useRoute();

    const printRef = React.useRef(null);

    const handleInvoicePdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element, { scale: 2, useCORS: true });
        const data = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4",
        });

        const imgWidth = 190; // A4 width - margins
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(data, 'PNG', 10, 10, imgWidth, imgHeight);
        pdf.save('everbloom_receipt.pdf');
    };

    return (
        <div className='container py-5'>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fw-semibold">
                        <Link
                            // href={route('customer.cart')}
                            className="breadcrumb-item text-success d-flex align-items-center gap-1"
                            style={{ textDecoration: 'none' }}
                        >
                            <FaArrowLeft /> Back to cart
                        </Link>
                        <li class="breadcrumb-item active text-muted" aria-current="page">Invoice Receipt</li>
                    </ol>
                </nav>

                <button
                    className="btn btn-success d-flex align-items-center gap-2"
                    onClick={handleInvoicePdf}
                >
                    <FaPrint /> Download Invoice
                </button>
            </div>

            <div ref={printRef} className='p-3'>
                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <h3 className='fw-bold'>INVOICE</h3>
                        <p className="text-muted">Invoice #XYZ-{order_details[0].checkout_rec_id}</p>
                    </div>
                    <div className="text-end">

                        <h4 className='d-flex align-items-center gap-2 fw-bold text-success'><img
                            src={logo}
                            alt="logo"
                            className="object-fit-cover rounded shadow-sm"
                            style={{ width: '30px', height: '30px' }}
                        /> HARMONICS</h4>
                        <p className="text-muted">Gravahan, Matina</p>
                        <p className="text-muted">Davao City</p>
                    </div>
                </div>

                <h5 className='fw-bold'>Bill To:</h5>
                <p className="text-muted mb-3">
                    {order_details[0].checkout_orders.customer_name}
                </p>

                <table className="table table-bordered mb-4">
                    <thead className='table-secondary text-center'>
                        <tr>
                            <th className='text-start'>Product</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            order_details.map((orderDetail) => (
                                <tr className='align-middle' key={orderDetail.id}>
                                    <td className='text-start'>{orderDetail.products.product_name}</td>
                                    <td>{orderDetail.quantity}</td>
                                    <td>₱{orderDetail.products.price}</td>
                                    <td>₱{orderDetail.subtotal}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <div className="d-flex justify-content-end gap-5 border-top pt-3" style={{ marginBottom: '100px' }}>
                    <div className="d-flex flex-column gap-2 text-muted fw-bold">
                        <p>Payment Method:</p>
                        <p>Total:</p>
                        <p>Cash received:</p>
                        <p>Change:</p>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2 text-muted fw-bold">
                        <p>{order_details[0].checkout_orders.payment_method}</p>
                        <p>₱{total}</p>
                        <p>₱{order_details[0].checkout_orders.cash_received}</p>
                        <p>₱{order_details[0].checkout_orders.change}</p>
                    </div>
                </div>

                <div className="d-flex justify-content-center align-items-center">
                    <div className="d-flex flex-column align-items-center gap-3" style={{ width: '80%' }}>
                        <div className='text-center'>
                            <h5>Thank you for your order with Harmonics!</h5>
                            <p className='text-center'>
                                We truly appreciate your support and trust in our products. <br />
                                We hope you enjoyed shopping with us and we look forward to serving you again!
                            </p>
                        </div>

                        <p className='text-center fw-semibold'>
                            Feel free to visit our branches or connect with us online: <br />
                            <a href="" className='text-success fw-normal' style={{ textDecoration: 'none' }}>www.harmonics.com</a>
                        </p>

                        <p className='text-center fw-semibold'>
                            Follow us on Facebook <br />
                            <a href="" className='text-success fw-normal' style={{ textDecoration: 'none' }}>@harmonics.ph</a>
                        </p>

                        <div className='text-center fw-semibold'>
                            <p>Got questions or concerns?</p>
                            <p className='fw-normal'>
                                Email us anytime at <a href="" className='text-success' style={{ textDecoration: 'none' }}>harmonics@gmail.com</a>  — we’re here to help!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

InvoiceReceipt.layout = page => <ManagerLayout children={page} />;
export default InvoiceReceipt;
