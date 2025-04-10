import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'

function About() {
    return (
        <div>
            <h1>ABOUT PAGE</h1>
        </div>
    )
}

About.layout = page => <CustomerLayout children={page} />
export default About