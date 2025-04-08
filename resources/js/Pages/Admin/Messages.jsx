import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'

function Messages() {
    return (
        <div>
            <h1>Messages PAGE</h1>
        </div>
    )
}

Messages.layout = page => <AdminLayout children={page} />
export default Messages