import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Layout/AdminLayout'
import profile from '../../../../../public/assets/images/profile.png'
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { FaCircleInfo } from "react-icons/fa6";
import { useRoute } from '../../../../../vendor/tightenco/ziggy';

function AddEmployee() {

    const route = useRoute();

    // Toggle Show / Hide Password
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    // State for image preview
    const [imagePreview, setImagePreview] = useState(null);

    // Handle file selection and set image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('profile', file); // Set the file to the Inertia form

        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        } else {
            setImagePreview(null); // Reset preview if no file is selected
        }
    };

    // Inertia Form Helper
    const { data, setData, post, processing, errors, reset } = useForm({
        firstname: '',
        lastname: '',
        phone: '',
        role: 'Manager',
        address: '',
        email: '',
        password: '',
        profile: '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('admin.storeEmployeeData'), {
            onSuccess() {
                reset();

                setData('profile', 'null');
                setImagePreview(null);
            }
        });
    }

    // Use useEffect to trigger toast notifications
    const { flash } = usePage().props

    useEffect(() => {
        flash.success ? toast.success(flash.success) : null;
        flash.error ? toast.error(flash.error) : null;
    }, [flash]);

    return (
        <div className='py-3'>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' expand={true} richColors />

            <form onSubmit={submit}>
                <nav aria-label="breadcrumb" className='mb-3'>
                    <ol class="breadcrumb fw-semibold">
                        <Link className="breadcrumb-item text-success" style={{ textDecoration: 'none' }}>Back</Link>
                        <li class="breadcrumb-item active" aria-current="page">Add Employee</li>
                    </ol>
                </nav>

                <div className="row justify-content-evenly">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        {/* Image Preview */}
                        {
                            imagePreview ? (
                                <div className="text-center mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview Image"
                                        className="object-fit-cover rounded-lg shadow mb-3"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>
                            ) : (
                                <div className="text-center mb-3">
                                    <img
                                        src={profile}
                                        alt="Default Profile"
                                        className="object-fit-cover mb-3"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>
                            )
                        }

                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />

                        {
                            errors.profile && (
                                <div className="text-danger mt-2">{errors.profile}</div>
                            )
                        }
                    </div>
                    <div className="col-md-7">
                        <div className="card shadow rounded border-0">
                            <div className="card-header bg-primary text-light p-3">
                                <p className='d-flex align-items-center gap-2'><FaCircleInfo /> Fill in all the information.</p>
                            </div>
                            <div className="card-body bg-light">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div className='w-100'>
                                        <label htmlFor="firstname" className="form-label">Firstname</label>
                                        <input
                                            type="text"
                                            className={
                                                `form-control shadow-sm ${errors.firstname ? 'border border-danger' : 'mb-3'}`
                                            }
                                            id='firstname'
                                            value={data.firstname}
                                            onChange={(e) => setData('firstname', e.target.value)}
                                        />

                                        {
                                            errors.firstname && <p className='text-danger mt-2'>{errors.firstname}</p>
                                        }
                                    </div>

                                    <div className='w-100'>
                                        <label htmlFor="lastname" className="form-label">Lastname</label>
                                        <input
                                            type="text"
                                            className={
                                                `form-control shadow-sm ${errors.lastname ? 'border border-danger' : 'mb-3'}`
                                            }
                                            id='lastname'
                                            value={data.lastname}
                                            onChange={(e) => setData('lastname', e.target.value)}
                                        />

                                        {
                                            errors.lastname && <p className='text-danger mt-2'>{errors.lastname}</p>
                                        }
                                    </div>
                                </div>

                                <div className="d-flex gap-3 mb-3">
                                    <div className="w-100">
                                        <label htmlFor="phone" className="form-label">Contact Number</label>
                                        <input
                                            type="text"
                                            className={
                                                `form-control shadow-sm ${errors.phone ? 'border border-danger' : ''}`
                                            }
                                            id='phone'
                                            value={data.phone}
                                            onChange={(e) => setData('phone', e.target.value)}
                                        />

                                        {
                                            errors.phone && <p className='text-danger mt-2'>{errors.phone}</p>
                                        }
                                    </div>

                                    <div className="w-100">
                                        <label htmlFor="role" className="form-label">Role</label>
                                        <select
                                            className="form-select"
                                            id='role'
                                            value={data.role}
                                            onChange={(e) => setData('role', e.target.value)}
                                        >
                                            <option value="Manager">Manager</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input
                                        type="text"
                                        className={
                                            `form-control shadow-sm ${errors.address ? 'border border-danger' : ''}`
                                        }
                                        id='address'
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                    />

                                    {
                                        errors.address && <p className='text-danger mt-2'>{errors.address}</p>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className={
                                            `form-control shadow-sm ${errors.email ? 'border border-danger' : ''}`
                                        }
                                        id='email'
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                    />

                                    {
                                        errors.email && <p className='text-danger mt-2'>{errors.email}</p>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className={
                                            `form-control shadow-sm ${errors.password ? 'border border-danger' : 'mb-3'}`
                                        }
                                        id='password'
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    {
                                        errors.password && <p className='text-danger mt-2'>{errors.password}</p>
                                    }
                                </div>

                                <div class="form-check mb-4">
                                    <input
                                        className="form-check-input shadow-sm"
                                        type="checkbox"
                                        id="show"
                                        onClick={togglePassword}
                                    />
                                    <label class="form-check-label" for="show">
                                        Show password
                                    </label>
                                </div>

                                <input type="submit" className="btn btn-success shadow w-100 mb-2" disabled={processing} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    )
}

AddEmployee.layout = page => <AdminLayout children={page} />
export default AddEmployee