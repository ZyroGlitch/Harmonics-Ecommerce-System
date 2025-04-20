import React, { useState } from 'react';
import background from '../../../public/assets/images/auth_background.jpg';
import google from '../../../public/assets/images/google.png';
import facebook from '../../../public/assets/images/facebook.png';
import { useRoute } from '../../../vendor/tightenco/ziggy/src/js';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function RegisterV2() {
    const { flash } = usePage().props
    const [showPassword, setShowPassword] = useState(false);
    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        phone: '',
        address: '',
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('guest.create_account'), {
            onSuccess() {
                reset();
            }
        });
    }

    return (
        <div className="row justify-content-center bg-light">
            <div
                className="col-md-6 vh-100 position-relative"
                style={{
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat',
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
                >
                </div>
                <div className="d-flex justify-content-center align-items-center h-100 position-relative text-light px-5">
                    <div>
                        <h1>Welcome to Harmonics!</h1>
                        <p className='fs-5'>
                            Tune into your rhythm with Harmonics.
                            <br />Log in to manage your gear, track orders, and enjoy a seamless experience built for music and sports enthusiasts.
                        </p>
                    </div>
                </div>
            </div>

            <div className='col-md-6 px-5 py-3'>
                <form onSubmit={submit}>
                    <h3 className='text-center mb-3'>Sign up for an account</h3>

                    <div className="d-flex justify-content-center align-items-center gap-3 mb-4">
                        <div className="d-flex justify-content-center">
                            <Link
                                href={route('guest.google_login')}
                                className="btn btn-light btn-sm rounded-pill d-flex justify-content-center align-items-center gap-2 p-2">
                                <div className="text-center">
                                    <img src={google} alt="google" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '18px', height: '18px' }} />
                                </div>
                                <p>Continue with Google</p>
                            </Link>
                        </div>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-primary btn-sm rounded-pill d-flex justify-content-center align-items-center gap-2 p-2">
                                <div className="text-center">
                                    <img src={facebook} alt="facebook" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '18px', height: '18px' }} />
                                </div>
                                <p>Continue with Facebook</p>
                            </button>
                        </div>
                    </div>
                    <p className='text-center'>or with email</p>
                    <hr className='m-0 mb-4' />

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className='w-100'>
                            <label htmlFor="firstname" className="form-label">Firstname</label>
                            <input
                                type="text"
                                className="form-control rounded-pill shadow-sm"
                                id='firstname'
                                value={data.firstname}
                                onChange={e => setData('firstname', e.target.value)}
                            />

                            {
                                errors.firstname && (
                                    <p className='text-danger mt-2'>
                                        {errors.firstname}
                                    </p>
                                )
                            }
                        </div>

                        <div className='w-100'>
                            <label htmlFor="lastname" className="form-label">Lastname</label>
                            <input
                                type="text"
                                className="form-control rounded-pill shadow-sm"
                                id='lastname'
                                value={data.lastname}
                                onChange={e => setData('lastname', e.target.value)}
                            />

                            {
                                errors.lastname && (
                                    <p className='text-danger mt-2'>
                                        {errors.lastname}
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 mb-3">
                        <div className="w-100">
                            <label htmlFor="phone" className="form-label">Phone</label>
                            <input
                                type="text"
                                className="form-control rounded-pill shadow-sm"
                                id='phone'
                                value={data.phone}
                                onChange={e => setData('phone', e.target.value)}
                            />

                            {
                                errors.phone && (
                                    <p className='text-danger mt-2'>
                                        {errors.phone}
                                    </p>
                                )
                            }
                        </div>

                        <div className="w-100">
                            <label htmlFor="address" className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control rounded-pill shadow-sm"
                                id='address'
                                value={data.address}
                                onChange={e => setData('address', e.target.value)}
                            />

                            {
                                errors.address && (
                                    <p className='text-danger mt-2'>
                                        {errors.address}
                                    </p>
                                )
                            }
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-pill shadow-sm"
                            id="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {
                            errors.email &&
                            <p className='text-danger mt-2'>
                                {errors.email}
                            </p>
                        }
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={showPassword ? 'text' : 'password'} className="form-control rounded-pill shadow-sm" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        {
                            errors.password && (
                                <p
                                    className='text-danger mt-2'
                                    style={{ maxWidth: '380px', wordWrap: 'break-word' }}>
                                    {errors.password}
                                </p>
                            )
                        }
                    </div>

                    <div className="form-check mb-2">
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => setShowPassword(!showPassword)} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Show password</label>
                    </div>

                    <p className='d-flex align-items-center gap-1 mb-2'>By creating an account, you agreeing to our
                        <a
                            className="text-success"
                            style={{ textDecoration: 'none', cursor: 'pointer' }}
                        >
                            Term and Conditions.
                        </a>
                    </p>

                    <input
                        type="submit"
                        className="btn btn-success rounded-pill shadow w-100 mb-3"
                        disabled={processing} value="Sign Up"
                    />

                    <div className="text-center">
                        <Link
                            href={route('guest.login')}
                            className='text-dark'
                            style={{ textDecoration: 'none' }}
                        >
                            Already have an account?
                            <span className="text-success"> Sign In</span>
                        </Link>
                    </div>
                </form >
            </div >
        </div >
    );
}

RegisterV2.noLayout = true;