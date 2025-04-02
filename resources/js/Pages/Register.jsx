import React, { useState } from 'react';
import background from '../../../public/assets/images/auth_background.jpg';
import logo from '../../../public/assets/images/logo.png';
import { useRoute } from '../../../vendor/tightenco/ziggy/src/js';
import { Link, useForm, usePage } from '@inertiajs/react';
import register from '../../../public/assets/images/register.png'

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="vh-100 position-relative"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <div className="row justify-content-center align-items-center h-100 position-relative">
                <div className="col-md-9">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-body d-flex justify-content-between align-items-center ">
                            <div>
                                <div className="d-flex align-items-center gap-3">
                                    <div className="text-center">
                                        <img
                                            src={logo}
                                            alt="logo"
                                            className="object-fit-cover rounded-circle shadow-sm"
                                            style={{ width: '45px', height: '45px' }}
                                        />
                                    </div>

                                    <h4 className='text-success'>Harmonics</h4>
                                </div>

                                <div className="text-center">
                                    <img
                                        src={register}
                                        alt="image"
                                        className="object-fit-cover"
                                        style={{ width: '500px', height: '500px' }}
                                    />
                                </div>
                            </div>

                            <div>
                                <h4 className='text-success mb-3'>Create Account</h4>

                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className='w-100'>
                                        <label htmlFor="firstname" className="form-label">Firstname</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-sm"
                                            id='firstname'
                                        />
                                    </div>

                                    <div className='w-100'>
                                        <label htmlFor="lastname" className="form-label">Lastname</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-sm"
                                            id='lastname'
                                        />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">Phone</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-sm"
                                        id='phone'
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-sm"
                                        id='address'
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control shadow-sm"
                                        id='email'
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-control shadow-sm"
                                        id='password'
                                    />
                                </div>

                                <div className="form-check mb-4">
                                    <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => setShowPassword(!showPassword)} />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">Show password</label>
                                </div>

                                <input type="submit" className="btn btn-success shadow w-100 mb-3" value='Register' />

                                <div className="text-center">
                                    <Link href={route('guest.login')} className='text-dark' style={{ textDecoration: 'none' }}>Already have an account?
                                        <span className="text-success"> Log in</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

Register.noLayout = true
