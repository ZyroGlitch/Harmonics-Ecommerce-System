import React from 'react'
import EmailLayout from '../../../Layout/EmailLayout'
import { Link } from '@inertiajs/react'

function Inbox() {
    return (
        <div>
            <a className="row align-items-center rounded p-2 email-message" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>
                    <p className='fw-semibold text-muted truncate'>New Black Friday Sales</p>
                </div>

                <div className="col-md-9">
                    <p className='truncate'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repellendus similique, voluptate numquam consectetur eveniet?</p>
                </div>

            </a>

            <a className="row align-items-center rounded p-2 email-message" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>
                    <p className='fw-semibold text-muted truncate'>New Black Friday Sales</p>
                </div>

                <div className="col-md-9">
                    <p className='truncate'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repellendus similique, voluptate numquam consectetur eveniet?</p>
                </div>

            </a>

            <a className="row align-items-center rounded p-2 email-message" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>
                    <p className='fw-semibold text-muted truncate'>New Black Friday Sales</p>
                </div>

                <div className="col-md-9">
                    <p className='truncate'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repellendus similique, voluptate numquam consectetur eveniet?</p>
                </div>

            </a>

            <a className="row align-items-center rounded p-2 email-message" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>
                    <p className='fw-semibold text-muted truncate'>New Black Friday Sales</p>
                </div>

                <div className="col-md-9">
                    <p className='truncate'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repellendus similique, voluptate numquam consectetur eveniet?</p>
                </div>

            </a>

            <a className="row align-items-center rounded p-2 email-message" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>
                    <p className='fw-semibold text-muted truncate'>New Black Friday Sales</p>
                </div>

                <div className="col-md-9">
                    <p className='truncate'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repellendus similique, voluptate numquam consectetur eveniet?</p>
                </div>

            </a>

            <a className="row align-items-center rounded p-2 email-message" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                <div className="col-md-3 d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>
                    <p className='fw-semibold text-muted truncate'>New Black Friday Sales</p>
                </div>

                <div className="col-md-9">
                    <p className='truncate'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Commodi repellendus similique, voluptate numquam consectetur eveniet?</p>
                </div>

            </a>
        </div>
    )
}

Inbox.layout = page => <EmailLayout children={page} />
export default Inbox