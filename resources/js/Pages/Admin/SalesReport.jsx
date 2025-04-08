import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'

function SalesReport() {
    return (
        <div>
            <h1>SalesReport PAGE</h1>
        </div>
    )
}

SalesReport.layout = page => <AdminLayout children={page} />
export default SalesReport