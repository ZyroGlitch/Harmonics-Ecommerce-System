import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'

function Customers() {
    return (
        <div>
            <h1>Customers PAGE</h1>
        </div>
    )
}

Customers.layout = page => <AdminLayout children={page} />
export default Customers