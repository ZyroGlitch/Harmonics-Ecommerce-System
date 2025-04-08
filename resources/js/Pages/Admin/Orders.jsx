import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'

function Orders() {
    return (
        <div>
            <h1>ORDERS PAGE</h1>
        </div>
    )
}

Orders.layout = page => <AdminLayout children={page} />
export default Orders