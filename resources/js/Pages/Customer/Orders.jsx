import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'

function Orders() {
    return (
        <div>
            <h1>ORDERS PAGE</h1>
        </div>
    )
}

Orders.layout = page => <CustomerLayout children={page} />
export default Orders