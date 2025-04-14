import React from 'react'
import EmailLayout from '../../../Layout/EmailLayout'

function Trash() {
    return (
        <div>
            <h1>TRASH SECTION</h1>
        </div>
    )
}

Trash.layout = page => <EmailLayout children={page} />
export default Trash