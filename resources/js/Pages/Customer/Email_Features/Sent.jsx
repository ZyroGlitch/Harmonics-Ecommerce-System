import React from 'react'
import EmailLayout from '../../../Layout/EmailLayout'

function Sent() {
    return (
        <div>
            <h1>SENT SECTION</h1>
        </div>
    )
}

Sent.layout = page => <EmailLayout children={page} />
export default Sent