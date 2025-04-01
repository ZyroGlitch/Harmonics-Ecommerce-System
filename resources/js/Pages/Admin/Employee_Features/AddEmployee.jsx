import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Layout/AdminLayout'
import profile from '../../../../../public/assets/images/profile.png'
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../../../vendor/tightenco/ziggy'
import { Toaster, toast } from 'sonner';


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
        'firstname': '',
        'lastname': '',
        'contact_number': '',
        'role': 'Employee',
        'username': '',
        'password': '',
        'profile': '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('employee.storeEmployeeData'), {
            onSuccess() {
                reset();

                setData('profile', 'null');
                setImagePreview(null);
            }
        });
    }

    // console.log(useForm()); to show all the useForm functions

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
                        <Link href={route('admin.employee')} className="breadcrumb-item text-success" style={{ textDecoration: 'none' }}>Back</Link>
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
                                <div className="text-danger mt-2 mt-2">{errors.profile}</div>
                            )
                        }
                    </div>
                    <div className="col-md-7">
                        <div className="card shadow rounded border-0">
                            <div className="card-header bg-primary text-light p-3">
                                <p>Fill in all the information.</p>
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

                                <div className="mb-3">
                                    <label htmlFor="contact" className="form-label">Contact Number</label>
                                    <input
                                        type="text"
                                        className={
                                            `form-control shadow-sm ${errors.contact_number ? 'border border-danger' : 'mb-3'}`
                                        }
                                        id='contact'
                                        value={data.contact_number}
                                        onChange={(e) => setData('contact_number', e.target.value)}
                                    />

                                    {
                                        errors.contact_number && <p className='text-danger mt-2'>{errors.contact_number}</p>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="role" className="form-label">Role</label>
                                    <select
                                        className="form-select"
                                        id='role'
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                    >
                                        <option value="Employee">Employee</option>
                                        <option value="Admin">Admin</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className={
                                            `form-control shadow-sm ${errors.username ? 'border border-danger' : 'mb-3'}`
                                        }
                                        id='username'
                                        value={data.username}
                                        onChange={(e) => setData('username', e.target.value)}
                                    />

                                    {
                                        errors.username && <p className='text-danger mt-2'>{errors.username}</p>
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