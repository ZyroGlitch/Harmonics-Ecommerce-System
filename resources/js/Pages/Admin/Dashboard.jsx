import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'
import orders from '../../../../public/assets/images/orders.png'
import person from '../../../../public/assets/images/person.png'
import sales from '../../../../public/assets/images/sales.png'
import sold from '../../../../public/assets/images/sold.png'
import SalesChart from '../../Layout/SalesChart'

function Dashboard() {

    const dummyData = [
        { product: { product_name: "Product A" }, total_sales: 120 },
        { product: { product_name: "Product B" }, total_sales: 95 },
        { product: { product_name: "Product C" }, total_sales: 75 },
        { product: { product_name: "Product D" }, total_sales: 60 },
        { product: { product_name: "Product E" }, total_sales: 45 },
    ];


    return (
        <div>
            <div className="card shadow rounded mb-4">
                <div className="card-body d-flex flex-column gap-3">
                    <div>
                        <h3>Today's Sales</h3>
                        <p>Sales Summary</p>
                    </div>

                    <div className="d-flex align-items-center gap-3">
                        <div className="card shadow rounded w-100">
                            <div className="card-body">
                                <img
                                    src={sales}
                                    alt="image"
                                    className="object-fit-cover mb-3"
                                    style={{ width: '50px', height: '50px' }}
                                />

                                <h5>₱500</h5>
                                <p>Total Sales</p>
                            </div>
                        </div>

                        <div className="card shadow rounded w-100">
                            <div className="card-body">
                                <img
                                    src={orders}
                                    alt="image"
                                    className="object-fit-cover mb-3"
                                    style={{ width: '50px', height: '50px' }}
                                />

                                <h5>100</h5>
                                <p>Total Order</p>
                            </div>
                        </div>

                        <div className="card shadow rounded w-100">
                            <div className="card-body">
                                <img
                                    src={sold}
                                    alt="image"
                                    className="object-fit-cover mb-3"
                                    style={{ width: '50px', height: '50px' }}
                                />

                                <h5>100</h5>
                                <p>Total Sold</p>
                            </div>
                        </div>

                        <div className="card shadow rounded w-100">
                            <div className="card-body">
                                <img
                                    src={person}
                                    alt="image"
                                    className="object-fit-cover mb-3"
                                    style={{ width: '50px', height: '50px' }}
                                />

                                <h5>50</h5>
                                <p>New Customers</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card shadow rounded">
                <div className="card-body">
                    <h3>Top Selling Products</h3>
                    <SalesChart topSellingProducts={dummyData} />
                </div>
            </div>
        </div>
    )
}

Dashboard.layout = page => <AdminLayout children={page} />
export default Dashboard