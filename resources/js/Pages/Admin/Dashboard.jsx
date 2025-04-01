import React from 'react'
import { FaCoins } from "react-icons/fa6";
import { BsBagFill } from "react-icons/bs";
import SalesChart from '../../Layout/SalesChart';
import AdminLayout from '../../Layout/AdminLayout'
import InventoryLevelChart from '../../Layout/InventoryLevelChart';
import { Head } from '@inertiajs/react';

function Dashboard({ sales_revenue, product_sold, topSellingProducts, inventoryLevels }) {
    // console.log(sales_revenue);
    // console.log(product_sold);
    // console.log(topSellingProducts);

    return (
        <div>
            <div className="d-flex align-items-center gap-3 mb-4">
                <div className="card shadow rounded border-0 bg-success text-white w-100">
                    <div className="card-body d-flex align-items-center gap-3">
                        <div className="bg-white text-dark rounded-circle shadow-lg p-3 d-flex justify-content-center align-items-center" >
                            <FaCoins className='fs-4' />
                        </div>

                        <div className='d-flex flex-column'>
                            <h4 className="card-title">Total Sales Revenue</h4>
                            <h4 className="card-text">₱{sales_revenue}</h4>
                        </div>
                    </div>
                </div>
                <div className="card shadow rounded border-0 bg-success text-white w-100">
                    <div className="card-body d-flex align-items-center gap-3">
                        <div className="bg-white text-dark rounded-circle shadow-lg p-3 d-flex justify-content-center align-items-center" >
                            <BsBagFill className='fs-4' />
                        </div>

                        <div className='d-flex flex-column'>
                            <h4 className="card-title">Total Products Sold</h4>
                            <h4 className="card-text">{product_sold}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mb-5'>
                <SalesChart topSellingProducts={topSellingProducts} />
            </div>
            <div className='mb-5'>
                <InventoryLevelChart inventoryData={inventoryLevels} />
            </div>
        </div>
    )
}

Dashboard.layout = page => <AdminLayout children={page} />
export default Dashboard