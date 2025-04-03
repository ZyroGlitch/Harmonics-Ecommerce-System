import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'

function Dashboard() {
    return (
        <div>
            <h1>DASHBOARD PAGE</h1>
        </div>
    )
}

Dashboard.layout = page => <CustomerLayout children={page} />
export default Dashboard