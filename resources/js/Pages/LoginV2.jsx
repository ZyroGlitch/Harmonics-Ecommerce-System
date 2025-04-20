import React, { useState } from 'react';
import background from '../../../public/assets/images/auth_background.jpg';
import logo from '../../../public/assets/images/logo.png';
import google from '../../../public/assets/images/google.png';
import facebook from '../../../public/assets/images/facebook.png';
import { useRoute } from '../../../vendor/tightenco/ziggy/src/js';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function LoginV2() {
    const route = useRoute();
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('guest.authentication'), {
            onSuccess() {
                reset();
            }
        });
    }

    const { flash } = usePage().props
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="row justify-content-center bg-light">
            <div
                className="col-md-7 vh-100 position-relative"
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

            <div className='col-md-5 px-5 py-4'>
                <form onSubmit={submit}>
                    <div className="text-center mb-2">
                        <img src={logo} alt="logo" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '80px', height: '80px' }} />
                    </div>

                    <h2 className="text-success text-center mb-4">Harmonics</h2>

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

                    <div className="mb-3">
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

                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => setShowPassword(!showPassword)} />
                        <label className="form-check-label" htmlFor="flexCheckDefault">Show password</label>
                    </div>

                    <input
                        type="submit"
                        className="btn btn-success btn-lg rounded-pill shadow w-100 mb-4"
                        disabled={processing} value="Sign In"
                    />

                    <p className='text-center'>or continue with</p>
                    <hr className='m-0 mb-3' />

                    <div className="d-flex justify-content-center mb-2">
                        <Link
                            href={route('guest.google_login')}
                            className="btn btn-light btn-sm rounded-pill d-flex justify-content-center align-items-center gap-2 p-2"
                            style={{ width: '50%' }}
                        >
                            <div className="text-center">
                                <img src={google} alt="google" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '18px', height: '18px' }} />
                            </div>
                            <p>Continue with Google</p>
                        </Link>
                    </div>

                    <div className="d-flex justify-content-center mb-4">
                        <button className="btn btn-primary btn-sm rounded-pill d-flex justify-content-center align-items-center gap-2 p-2" style={{ width: '50%' }}>
                            <div className="text-center">
                                <img src={facebook} alt="facebook" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '18px', height: '18px' }} />
                            </div>
                            <p>Continue with Facebook</p>
                        </button>
                    </div>

                    <div className="text-center">
                        <Link
                            href={route('guest.register')}
                            className='text-dark'
                            style={{ textDecoration: 'none' }}
                        >
                            Don't have an account?
                            <span className="text-success"> Sign up</span>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

LoginV2.noLayout = true;