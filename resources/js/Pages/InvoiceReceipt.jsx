import React from 'react';
import CustomerLayout from '../Layout/CustomerLayout';
import { FaPrint } from "react-icons/fa6";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function InvoiceReceipt({ order, orderDetails }) {
    console.log(order);
    console.log(orderDetails);

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
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn btn-dark d-flex align-items-center gap-2"
                    onClick={handleInvoicePdf}
                >
                    <FaPrint /> Download Invoice
                </button>
            </div>

            <div ref={printRef} className='p-3'>
                <div className="d-flex justify-content-between mb-4">
                    <div>
                        <h3 className='fw-bold'>INVOICE</h3>
                        <p className="text-muted">Invoice #{orderDetails[0].order_id}</p>
                    </div>
                    <div className="text-end">
                        <h4 className='fw-bold'>EVERBLOOM</h4>
                        <p className="text-muted">Gravahan, Matina</p>
                        <p className="text-muted">Davao City</p>
                    </div>
                </div>

                <h5 className='fw-bold'>Bill To:</h5>
                <p className="text-muted mb-3">{orderDetails[0].user.firstname} {orderDetails[0].user.lastname}</p>

                <table className="table table-bordered mb-4">
                    <thead className='table-secondary text-center'>
                        <tr>
                            <th className='text-start'>Description</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody className='text-center'>
                        {
                            orderDetails.map((orderDetail) => (
                                <tr className='align-middle' key={orderDetail.id}>
                                    <td className='text-start'>{orderDetail.product.product_name}</td>
                                    <td>{orderDetail.quantity}</td>
                                    <td>₱{orderDetail.product.price}</td>
                                    <td>₱{orderDetail.total}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>

                <div className="d-flex justify-content-end gap-5 border-top pt-3">
                    <div className="d-flex flex-column gap-2 text-muted fw-bold">
                        <p>Total:</p>
                        <p>Cash received:</p>
                        <p>Change:</p>
                    </div>
                    <div className="d-flex flex-column align-items-end gap-2 text-muted fw-bold">
                        <p>₱{order.total}</p>
                        <p>₱{order.cash_recieved}</p>
                        <p>₱{order.change}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

InvoiceReceipt.layout = page => <CustomerLayout children={page} />;
export default InvoiceReceipt;
