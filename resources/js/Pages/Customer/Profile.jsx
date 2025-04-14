import React, { useEffect, useState } from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import cover from '../../../../public/assets/images/coverpage.jpg'
import { toast, Toaster } from 'sonner';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import profile from '../../../../public/assets/images/profile.png'
import { useRoute } from '../../../../vendor/tightenco/ziggy';

function Profile({ customer }) {
    console.log(customer);

    const route = useRoute();

    const { auth } = usePage().props;

    // Toggle Show / Hide Password
    const [newPass, setNewPass] = useState(false);

    const toggleNewPassword = () => {
        setNewPass(!newPass);
    };

    // Toggle Show / Hide Password
    const [confirmPass, setConfirmPass] = useState(false);

    const toggleConfirmPassword = () => {
        setConfirmPass(!confirmPass);
    };

    // -------------------------------------------------------------------

    // Form for user information
    const {
        data: userData, setData: setUserData,
        post: postUserInfo, processing: processingUserInfo,
        errors: errorsUserInfo, reset: resetUserInfo
    } = useForm({
        'firstname': customer.firstname,
        'lastname': customer.lastname,
        'phone': customer.phone,
        'address': customer.address,
        'email': customer.email,
    });

    function submitUserInfo(e) {
        e.preventDefault();
        postUserInfo(route('customer.updateProfile'), {
            onSuccess() {
                resetUserInfo();
            }
        });
    }

    function cancelUserInfo(e) {
        e.preventDefault();
        resetUserInfo();
    }

    // -------------------------------------------------------------------

    // Form for customer profile image
    const {
        data: customer_profile, setData: setCustomer_profile,
        post: postCustomer, processing: processCustomer,
        errors: errorCustomer, reset: resetCustomer
    } = useForm({
        profile: '',
    });

    // State for image preview
    const [imagePreview, setImagePreview] = useState
        (`${auth.user ? `/storage/${auth.user.profile}` : null}`);

    // Handle file selection and set image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setCustomer_profile('profile', file); // Set the file to the Inertia form

        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        } else {
            setImagePreview(null); // Reset preview if no file is selected
        }
    };

    function submitProfileImage(e) {
        e.preventDefault();
        postCustomer(route('customer.updateImageProfile'), {
            onSuccess() {
                resetCustomer();

                setCustomer_profile('profile', null);
                setImagePreview(null);
            }
        });
    }

    function cancelUpdateImage(e) {
        e.preventDefault();
        resetCustomer();

        setCustomer_profile('profile', `${auth.user ? `/storage/${auth.user.profile}` : null}`);
        setImagePreview(`${auth.user ? `/storage/${auth.user.profile}`
            : null}`);
    }

    // -------------------------------------------------------------------

    // Form for customer password
    const {
        data: userPassword, setData: setUserPassword,
        post: postUserPassword, processing: processingPassword,
        errors: errorsUserPassword, reset: resetUserPassword
    } = useForm({
        'new_password': '',
        'confirm_password': ''
    });

    function submitUpdatePassword(e) {
        e.preventDefault();
        postUserPassword(route('customer.updatePassword'), {
            onSuccess() {
                resetUserPassword();
            }
        });
    }

    function cancelUpdatePassword(e) {
        e.preventDefault();
        resetUserPassword();
    }

    // -------------------------------------------------------------------

    // Use useEffect to trigger toast notifications
    const { flash } = usePage().props

    useEffect(() => {
        flash.success ? toast.success(flash.success) : null;
        flash.error ? toast.error(flash.error) : null;
    }, [flash]);

    return (
        <div className='p-4'>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' expand={true} richColors />

            <div className="card shadow rounded border-0">
                <div className="card-body bg-light p-0">
                    {/* Background Container */}
                    <div
                        className="container-fluid bg-secondary position-relative"
                        style={{
                            height: '200px',
                            backgroundImage: `url(${cover})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    ></div>

                    {/* Profile Image Positioned on the Left */}
                    <div className="position-absolute d-flex align-items-center gap-4" style={{ top: '155px', left: '20px' }}>
                        <img
                            src={`${auth.user ? `/storage/${auth.user.profile}` : profile}`}
                            alt="profile"
                            className="rounded-circle object-fit-cover shadow border border-3 border-light"
                            style={{ width: '150px', height: '150px' }}
                        />
                        <div className="d-flex flex-column mt-5">
                            <h3 className='text-success'>John Ford Buliag</h3>
                            <p className="text-muted">Customer</p>
                        </div>
                    </div>

                    {/* Tabs Section */}
                    <div className="mx-3" style={{ marginTop: '150px' }}>
                        <ul className="nav nav-tabs" id="profileTabs" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link active"
                                    id="details-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#details"
                                    type="button"
                                    role="tab"
                                    aria-controls="details"
                                    aria-selected="true"
                                >
                                    Details
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="profile-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="profile"
                                    aria-selected="false"
                                >
                                    Profile
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    className="nav-link"
                                    id="password-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#password"
                                    type="button"
                                    role="tab"
                                    aria-controls="password"
                                    aria-selected="false"
                                >
                                    Password
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="profileTabsContent">
                            {/* User Information Content */}
                            <div
                                className="tab-pane fade show active"
                                id="details"
                                role="tabpanel"
                                aria-labelledby="details-tab"
                            >
                                <form onSubmit={submitUserInfo}>
                                    <div className="px-3 py-4">
                                        <h5 className='mb-4'>Personal Details</h5>
                                        <div className="d-flex mb-5" style={{ gap: '180px' }}>
                                            <div className="d-flex flex-column gap-4">
                                                <label
                                                    htmlFor="firstname"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >
                                                    Firstname
                                                </label>

                                                <label
                                                    htmlFor="lastname"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >
                                                    Lastname
                                                </label>

                                                <label
                                                    htmlFor="contact"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >
                                                    Contact Number
                                                </label>

                                                <label
                                                    htmlFor="address"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >
                                                    Address
                                                </label>

                                                <label
                                                    htmlFor="email"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >
                                                    Email
                                                </label>
                                            </div>

                                            <div className="d-flex flex-column gap-4">
                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control shadow-sm"
                                                        id='firstname'
                                                        style={{ width: '500px' }}
                                                        value={userData.firstname}
                                                        onChange={(e) => setUserData('firstname', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.firstname && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.firstname}</div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control shadow-sm"
                                                        id='lastname'
                                                        style={{ width: '500px' }}
                                                        value={userData.lastname}
                                                        onChange={(e) => setUserData('lastname', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.lastname && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.lastname}</div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control shadow-sm"
                                                        id='contact'
                                                        style={{ width: '500px' }}
                                                        value={userData.phone}
                                                        onChange={(e) => setUserData('phone', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.phone && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.phone}</div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control shadow-sm"
                                                        id='address'
                                                        style={{ width: '500px' }}
                                                        value={userData.address}
                                                        onChange={(e) => setUserData('address', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.address && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.address}</div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <input
                                                        type="email"
                                                        className="form-control shadow-sm"
                                                        id='email'
                                                        style={{ width: '500px' }}
                                                        value={userData.email}
                                                        onChange={(e) => setUserData('email', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.email && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.email}</div>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">
                                            {/* <Link href={route('employee.viewProfile', { user_id: user_info.id })} className='btn btn-outline-secondary shadow-sm'>Cancel</Link> */}
                                            <Link
                                                className='btn btn-outline-secondary shadow-sm'
                                                onClick={cancelUserInfo}
                                            >Cancel</Link>

                                            <input
                                                type='submit'
                                                className='btn btn-success shadow-sm'
                                                value='Update information'
                                                disabled={processingUserInfo}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Profile Image Content */}
                            <div
                                className="tab-pane fade"
                                id="profile"
                                role="tabpanel"
                                aria-labelledby="profile-tab"
                            >
                                <form onSubmit={submitProfileImage}>
                                    <div className="p-3">
                                        <h5>Profile Settings</h5>
                                        <p className='mb-4'>Upload a new profile picture to personalize your account.</p>

                                        <div className="d-flex gap-5 mb-5">

                                            {/* Image Preview */}
                                            {
                                                imagePreview ? (
                                                    <div className="text-center mb-3">
                                                        <img
                                                            src={imagePreview}
                                                            alt="profile"
                                                            className="object-fit-cover rounded shadow"
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


                                            <div className="d-flex flex-column gap-2">
                                                <label htmlFor='uploadImage' className='form-label'>Upload Profile Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control shadow-sm"
                                                    style={{ width: '500px' }}
                                                    onChange={handleImageChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">
                                            <Link
                                                className='btn btn-outline-secondary shadow-sm'
                                                onClick={cancelUpdateImage}
                                            >Cancel</Link>

                                            <input
                                                type='submit'
                                                className='btn btn-success shadow-sm'
                                                value='Update profile'
                                                disabled={processCustomer}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Update Password Content */}
                            <div
                                className="tab-pane fade"
                                id="password"
                                role="tabpanel"
                                aria-labelledby="password-tab"
                            >
                                <form onSubmit={submitUpdatePassword}>
                                    <div className="p-3">
                                        <h5>Change Password</h5>
                                        <p className='mb-4'>Update your password to keep your account secure.</p>

                                        <div className="d-flex mb-5" style={{ gap: '160px' }}>
                                            <div className="d-flex flex-column gap-4">
                                                <label
                                                    htmlFor="current"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >Current password</label>

                                                <label
                                                    htmlFor="new"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >New password</label>

                                                <label
                                                    htmlFor="confirm"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >Confirm new password</label>
                                            </div>

                                            <div className="d-flex flex-column gap-4">
                                                <input
                                                    type="text"
                                                    className="form-control shadow-sm"
                                                    id='current'
                                                    style={{ width: '500px' }}
                                                    value='********'
                                                />

                                                <div className="d-flex align-items-center gap-3">
                                                    <input
                                                        type={newPass ? 'text' : 'password'}
                                                        className="form-control shadow-sm"
                                                        id='new'
                                                        style={{ width: '500px' }}
                                                        value={userPassword.new_password}
                                                        onChange={(e) => setUserPassword('new_password', e.target.value)}
                                                    />
                                                    {
                                                        newPass ?
                                                            <FaEye
                                                                type='button'
                                                                className='fs-4'
                                                                onClick={toggleNewPassword}
                                                            />
                                                            :
                                                            <FaEyeSlash
                                                                type='button'
                                                                className='fs-4'
                                                                onClick={toggleNewPassword}
                                                            />
                                                    }
                                                </div>
                                                {
                                                    errorsUserPassword.new_password && (
                                                        <div className="text-danger mt-2">{errorsUserPassword.new_password}</div>
                                                    )
                                                }

                                                <div className="d-flex align-items-center gap-3">
                                                    <input
                                                        type={confirmPass ? 'text' : 'password'}
                                                        className="form-control shadow-sm"
                                                        id='confirm'
                                                        style={{ width: '500px' }}
                                                        value={userPassword.confirm_password}
                                                        onChange={(e) => setUserPassword('confirm_password', e.target.value)}
                                                    />

                                                    {
                                                        confirmPass ?
                                                            <FaEye
                                                                type='button'
                                                                className='fs-4'
                                                                onClick={toggleConfirmPassword}
                                                            />
                                                            :
                                                            <FaEyeSlash
                                                                type='button'
                                                                className='fs-4'
                                                                onClick={toggleConfirmPassword}
                                                            />
                                                    }
                                                </div>
                                                {
                                                    errorsUserPassword.confirm_password && (
                                                        <div className="text-danger mt-2">{errorsUserPassword.confirm_password}</div>
                                                    )
                                                }

                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center gap-3">
                                            <Link
                                                className='btn btn-outline-secondary shadow-sm'
                                                onClick={cancelUpdatePassword}
                                            >Cancel</Link>

                                            <input
                                                type='submit'
                                                className='btn btn-success shadow-sm'
                                                value='Update password'
                                                disabled={processingPassword}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Profile.layout = page => <CustomerLayout children={page} />
export default Profile