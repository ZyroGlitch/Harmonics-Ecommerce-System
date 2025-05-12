import React from 'react'
import ManagerLayout from '../../Layout/ManagerLayout'

function Profile() {
    return (
        <div>
            <h1>Profile Page</h1>
        </div>
    )
}

Profile.layout = page => <ManagerLayout children={page} />
export default Profile