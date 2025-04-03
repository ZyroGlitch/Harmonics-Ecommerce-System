import React, { useState } from 'react';
import background from '../../../public/assets/images/auth_background.jpg';
import logo from '../../../public/assets/images/logo.png';
import { useRoute } from '../../../vendor/tightenco/ziggy/src/js';
import { Link, useForm, usePage } from '@inertiajs/react';

export default function Login() {
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
        <div
            className="vh-100 position-relative"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <div className="d-flex justify-content-center align-items-center h-100 position-relative">
                <div className="card shadow-lg rounded-lg border-0 w-100" style={{ maxWidth: '450px' }}>
                    <div className="card-body bg-light px-5 py-3">
                        <form onSubmit={submit}>
                            <div className="text-center mb-2">
                                <img src={logo} alt="logo" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '120px', height: '120px' }} />
                            </div>

                            <h2 className="text-success text-center mb-4">Harmonics</h2>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-control shadow-sm"
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
                                <input type={showPassword ? 'text' : 'password'} className="form-control shadow-sm" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
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

                            <div className="form-check mb-4">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => setShowPassword(!showPassword)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">Show password</label>
                            </div>

                            <input
                                type="submit"
                                className="btn btn-success shadow w-100 mb-3"
                                disabled={processing} value="Log In"
                            />
                            {
                                flash.error && (
                                    <p className='text-danger text-center'>
                                        {flash.error}
                                    </p>
                                )
                            }

                            <div className="text-center">
                                <Link
                                    href={route('guest.register')}
                                    className='text-dark'
                                    style={{ textDecoration: 'none' }}
                                >
                                    Don't have an account?
                                    <span className="text-success"> Sign up now.</span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Login.noLayout = true;