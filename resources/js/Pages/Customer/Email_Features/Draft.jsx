import React from 'react'
import EmailLayout from '../../../Layout/EmailLayout'

function Draft() {
    return (
        <div>
            <h1>DRAFT SECTION</h1>
        </div>
    )
}

Draft.layout = page => <EmailLayout children={page} />
export default Draft