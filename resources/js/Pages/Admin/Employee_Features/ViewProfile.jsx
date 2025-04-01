import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../Layout/AdminLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import cover from '../../../../../public/assets/images/coverpage.jpg'
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useRoute } from '../../../../../vendor/tightenco/ziggy';
import { Toaster, toast } from 'sonner';

function ViewProfile({ user_info }) {
    console.log(user_info);

    const route = useRoute();

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

    const {
        data: userData, setData: setUserData,
        post: postUserInfo, processing: processingUserInfo,
        errors: errorsUserInfo, reset: resetUserInfo
    } = useForm({
        'id': user_info.id,
        'firstname': user_info.firstname,
        'lastname': user_info.lastname,
        'contact_number': user_info.contact_number,
        'username': user_info.username,
    });

    function submitUserInfo(e) {
        e.preventDefault();
        postUserInfo(route('employee.updateUserInfo'), {
            onSuccess() {
                resetUserInfo();
            }
        });
    }

    function cancelUserInfo(e) {
        e.preventDefault();
        resetUserInfo();
    }

    const {
        data: userPassword, setData: setUserPassword,
        post: postUserPassword, processing: processingPassword,
        errors: errorsUserPassword, reset: resetUserPassword
    } = useForm({
        'id': user_info.id,
        'new_password': '',
        'confirm_password': ''
    });

    function submitUpdatePassword(e) {
        e.preventDefault();
        postUserPassword(route('employee.updatePassword'), {
            onSuccess() {
                resetUserPassword();
            }
        });
    }

    function cancelUpdatePassword(e) {
        e.preventDefault();
        resetUserPassword();
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

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb fw-semibold">
                    <Link href={route('admin.employee')} className="breadcrumb-item text-muted" style={{ textDecoration: 'none' }}>Back</Link>
                    <li class="breadcrumb-item active text-success" aria-current="page">{user_info.firstname} Profile</li>
                </ol>
            </nav>

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
                            src={`/storage/${user_info.profile}`}
                            alt="profile"
                            className="rounded-circle object-fit-cover shadow border border-3 border-light"
                            style={{ width: '150px', height: '150px' }}
                        />
                        <div className="d-flex flex-column mt-5">
                            <h3 className='text-success'>{user_info.firstname} {user_info.lastname}</h3>
                            <p className="text-muted">{user_info.role}</p>
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
                                    id="setting-tab"
                                    data-bs-toggle="tab"
                                    data-bs-target="#setting"
                                    type="button"
                                    role="tab"
                                    aria-controls="setting"
                                    aria-selected="false"
                                >
                                    Setting
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="profileTabsContent">
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
                                                >Firstname</label>

                                                <label
                                                    htmlFor="lastname"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >Lastname</label>

                                                <label
                                                    htmlFor="contact"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >Contact Number</label>

                                                <label
                                                    htmlFor="username"
                                                    className="form-label d-flex align-items-center" style={{ height: '38px' }}
                                                >Username</label>
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
                                                        value={userData.contact_number}
                                                        onChange={(e) => setUserData('contact_number', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.contact_number && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.contact_number}</div>
                                                        )
                                                    }
                                                </div>

                                                <div>
                                                    <input
                                                        type="text"
                                                        className="form-control shadow-sm"
                                                        id='username'
                                                        style={{ width: '500px' }}
                                                        value={userData.username}
                                                        onChange={(e) => setUserData('username', e.target.value)}
                                                    />
                                                    {
                                                        errorsUserInfo.username && (
                                                            <div className="text-danger mt-2">{errorsUserInfo.username}</div>
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
                            <div
                                className="tab-pane fade"
                                id="setting"
                                role="tabpanel"
                                aria-labelledby="setting-tab"
                            >
                                <form onSubmit={submitUpdatePassword}>
                                    <div className="p-3">
                                        <h5>Account Settings</h5>
                                        <p className='mb-4'>Change password or update account information here.</p>

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
    );
}

ViewProfile.layout = page => <AdminLayout children={page} />;
export default ViewProfile;
