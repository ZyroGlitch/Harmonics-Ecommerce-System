import React from 'react'
import ManagerLayout from '../../Layout/ManagerLayout'

function Orders() {
    return (
        <div>
            <h1>Orders Page</h1>
        </div>
    )
}

Orders.layout = page => <ManagerLayout children={page} />
export default Orders