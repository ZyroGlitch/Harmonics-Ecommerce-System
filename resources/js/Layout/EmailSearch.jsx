import React from 'react'
import profile from '../../../public/assets/images/profile1.jpg'

export default function EmailSearch() {
    return (
        <div className='mb-3'>
            <div className="row justify-content-between align-items-center mb-3">
                <div className="col-md-8">
                    <input
                        type="search"
                        className="form-control shadow-sm"
                        placeholder='Search email'
                        style={{ height: '48px' }}
                    />
                </div>

                <div className="col-md-3 d-flex justify-content-end">
                    <div className='d-flex align-items-center gap-2'>
                        <img
                            src={profile}
                            alt="profile"
                            className="object-fit-cover rounded-circle shadow-sm"
                            style={{ width: '45px', height: '45px' }}
                        />

                        <div>
                            <h5 className='text-success'>John Ford Buliag</h5>
                            <p className='text-muted'>Customer</p>
                        </div>
                    </div>
                </div>



            </div>
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <div class="form-check fs-5">
                        <input class="form-check-input shadow-sm" type="checkbox" value="" />
                    </div>

                    <select class="form-select form-select-sm shadow-sm" style={{ width: '150px' }}>
                        <option value="latest" selected>Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>
                </div>

                <p>1-50 to 5000</p>
            </div>
        </div>
    )
}
