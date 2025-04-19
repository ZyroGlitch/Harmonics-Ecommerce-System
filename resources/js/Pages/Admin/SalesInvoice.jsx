import React from 'react';
import { FaPrint, FaArrowLeft } from "react-icons/fa6";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import logo from '../../../../public/assets/images/logo.png'
import { Link } from '@inertiajs/react';
import AdminLayout from '../../Layout/AdminLayout';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

function SalesInvoice({ sales, salesID, totalSales, totalOrders }) {
    console.log(sales);
    console.log(salesID);
    console.log(totalSales);
    console.log(totalOrders);

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
        pdf.save('harmonics_salesInvoice.pdf');
    };

    return (
        <div className='p-3'>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb fw-semibold">
                        <Link
                            href={route('admin.salesReport')}
                            className="breadcrumb-item text-success d-flex align-items-center gap-1"
                            style={{ textDecoration: 'none' }}
                        >
                            <FaArrowLeft /> Back to sales report
                        </Link>
                        <li class="breadcrumb-item active text-muted" aria-current="page">Sales Invoice</li>
                    </ol>
                </nav>

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
                        <h3 className='fw-bold'>Sales Invoice</h3>
                        <p className="text-muted">Date Issued:{' '}
                            {
                                new Date().toLocaleString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                })
                            }
                        </p>
                    </div>
                    <div className="text-end">
                        <div className="d-flex justify-content-end gap-5">
                            <div className="d-flex flex-column gap-2 text-muted fw-bold">
                                {
                                    sales == null ? '' : (
                                        <>
                                            <p>Total Sales:</p>
                                            <p>Item Sold:</p>
                                        </>
                                    )
                                }
                            </div>
                            <div className="d-flex flex-column align-items-end gap-2 text-muted fw-bold">

                                {
                                    sales == null ? '' : (
                                        <>
                                            <p>₱{totalSales ? totalSales : 0}</p >
                                            <p>{totalOrders ? totalOrders : 0}</p>
                                        </>
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>

                <table className="table table-bordered mb-4">
                    <thead className='table-secondary text-center'>
                        <tr>
                            <th className='text-start'>Order ID</th>
                            <th className='text-start'>Customer Name</th>
                            <th>Item Sold</th>
                            <th>Total Amount</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Date</th>
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
                                            <td>{sale.order_status}</td>
                                            <td>{formattedDate}</td>
                                        </tr>
                                    )
                                })
                            ) : (
                                <tr>
                                    <td colSpan="8" className="text-center text-muted py-3">
                                        No sales record found.
                                    </td>
                                </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div >
    );
}

SalesInvoice.layout = page => <AdminLayout children={page} />;
export default SalesInvoice;
