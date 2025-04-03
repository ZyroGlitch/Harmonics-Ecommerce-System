import React, { useState } from 'react';
import background from '../../../public/assets/images/auth_background.jpg';
import logo from '../../../public/assets/images/logo.png';
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { Link, useForm, usePage } from '@inertiajs/react';
import register from '../../../public/assets/images/register.png'
import { FaArrowRightLong } from "react-icons/fa6";

export default function Register() {
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
        post(route('guest.authentication'), {
            onSuccess() {
                reset();
            }
        });
    }

    return (
        <div className="h-100 py-5 position-relative"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <div className="row justify-content-center align-items-center h-100 position-relative">
                <div className="col-md-10">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-body row">
                            <div className='col-md-6'>
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

                                <div className="d-flex justify-content-center align-items-center h-auto">
                                    <img
                                        src={register}
                                        alt="image"
                                        className="object-fit-contain"
                                        style={{ width: errors ? '500px' : '400px', height: errors ? '500px' : '400px' }}
                                    />
                                </div>
                            </div>

                            <div className='col-md-6'>
                                <form onSubmit={submit}>
                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <h4 className='text-success'>Create Account</h4>

                                        <Link
                                            href={route('guest.login')}
                                            className='d-flex align-items-center gap-2 text-success'
                                            style={{ textDecoration: 'none' }}
                                        >
                                            Log in <FaArrowRightLong />
                                        </Link>
                                    </div>

                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <div className='w-100'>
                                            <label htmlFor="firstname" className="form-label">Firstname</label>
                                            <input
                                                type="text"
                                                className="form-control shadow-sm"
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
                                                className="form-control shadow-sm"
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

                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-sm"
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

                                    <div className="mb-3">
                                        <label htmlFor="address" className="form-label">Address</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-sm"
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

                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            className="form-control shadow-sm"
                                            id='email'
                                            value={data.email}
                                            onChange={e => setData('email', e.target.value)}
                                        />

                                        {
                                            errors.email && (
                                                <p className='text-danger mt-2'>
                                                    {errors.email}
                                                </p>
                                            )
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            className="form-control shadow-sm"
                                            id='password'
                                            value={data.password}
                                            onChange={e => setData('password', e.target.value)}
                                        />

                                        {
                                            errors.password && (
                                                <p className='text-danger mt-2'>
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
                                        className="btn btn-success shadow w-100" value='Register'
                                        disabled={processing}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

Register.noLayout = true
