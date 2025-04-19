import React, { useEffect, useRef } from 'react'
import logo from '../../../public/assets/images/logo.png'
import profile from '../../../public/assets/images/profile.png'
import { Link, usePage } from '@inertiajs/react'
import { BsBagFill, BsCartFill, BsClipboard2CheckFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { FaBars, FaUserLarge, FaStore, FaBell, FaEnvelope, FaCircle } from "react-icons/fa6";
import { useRoute } from '../../../vendor/tightenco/ziggy'
import MetaTagsLayout from './MetaTagsLayout';
import product from '../../../public/assets/products/gym1.png'

import AOS from "aos";
import "aos/dist/aos.css";
import { Modal } from 'bootstrap';

export default function CustomerLayout({ children }) {
    const route = useRoute();

    // Get the authenticated user credentials
    const { auth } = usePage().props

    const { props } = usePage();

    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
            once: true, // Whether animation should happen only once
        });
    }, []);

    // useEffect(() => {
    //     if (props.showFeedbackModal) {
    //         const feedbackModal = new Modal(document.getElementById('feedbackModal'));
    //         feedbackModal.show();

    //         // Optional: prevent modal from closing when clicking outside
    //         document.getElementById('feedbackModal').addEventListener('hide.bs.modal', function (event) {
    //             // You might want to prevent closing or mark feedback as given here
    //         });
    //     }
    // }, [props.showFeedbackModal]);



    return (
        <>
            <MetaTagsLayout />

            <div className="d-flex vh-100 bg-light">
                <div className="bg-light shadow p-3 sidebar" style={{ width: '20%', height: '100vh', position: 'fixed' }}>
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="text-center">
                            <img src={logo} alt="logo" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '50px', height: '50px' }} />
                        </div>
                        <h3 className='text-success'>Harmonics</h3>
                    </div>

                    <nav className="d-flex flex-column gap-1">
                        <Link
                            href={route('customer.dashboard')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.dashboard') ? 'active' : ''}`}
                        >
                            <BsBagFill /> Products
                        </Link>
                        <Link
                            href={route('customer.cart')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.cart') ? 'active' : ''}`}
                        >
                            <BsCartFill /> Cart
                        </Link>
                        <Link
                            href={route('customer.orders')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.orders') ? 'active' : ''}`}
                        >
                            <BsClipboard2CheckFill /> Orders
                        </Link>
                        <Link
                            href={route('customer.about')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.about') ? 'active' : ''}`}
                        >
                            <FaStore /> About
                        </Link>
                        <Link
                            href={route('customer.profile')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.profile') ? 'active' : ''}`}
                        >
                            <FaUserLarge /> Profile
                        </Link>
                    </nav>

                    <div style={{ position: 'absolute', bottom: '2vh' }}>
                        <Link
                            href={route('customer.logout')}
                            className="d-flex align-items-center gap-2 rounded p-2 sidebar-item"
                        >
                            <IoExit /> Logout
                        </Link>
                    </div>
                </div>

                <div className="bg-light content">
                    <nav className="d-flex justify-content-between align-items-center bg-success shadow-sm px-3 py-2 sticky-top">
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-light humburger-hidden" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"><FaBars /></button>

                            <img src={auth.user.profile ? `/storage/${auth.user.profile}` : profile} alt="profile" className="object-fit-cover rounded-circle border border-2 border-light shadow-lg" style={{ width: '45px', height: '45px' }} />
                            <h5 className="text-light"><span className="text-warning">Hi!</span> {auth.user ? `${auth.user.firstname} ${auth.user.lastname}` : 'Guest'}</h5>
                        </div>

                        <div className='d-flex align-items-center gap-4'>
                            <Link
                                href={route('customer.inbox')}
                                className='text-light fs-5'
                            >
                                <FaEnvelope />
                            </Link>

                            <Link
                                href=''
                                className='text-light fs-5'
                                data-bs-toggle="offcanvas"
                                data-bs-target="#notifications"
                                aria-controls="offcanvasRight"
                            >
                                <FaBell />
                            </Link>
                        </div>
                    </nav>

                    <section>
                        {children}
                    </section>
                </div>
            </div>

            {/* Notification Offcanvas  */}
            <div class="offcanvas offcanvas-end" id="notifications" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border border-bottom">
                    <div className="d-flex flex-column gap-1">
                        <h4 className='text-success'>
                            Notifications
                        </h4>
                        <p className='text-muted'>You have 3 Notifications today.</p>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body p-0">
                    <Link
                        href={route('customer.orders')}
                        className="d-flex align-items-center gap-3 py-1 px-3 border-bottom"
                        style={{ textDecoration: 'none' }}>
                        <FaCircle className='text-success' style={{ fontSize: '12px' }} />

                        <img
                            src={product}
                            alt="image"
                            className="object-fit-cover"
                            style={{ width: '80px', height: '80px' }}
                        />

                        <div className="d-flex flex-column gap-1">
                            <h6 className='text-success'>Order Confirmed</h6>
                            <p className='text-muted'>10 mins ago</p>
                        </div>
                    </Link>

                    <div className="d-flex align-items-center gap-3 py-2 px-3 border-bottom">
                        <FaCircle className='text-success' style={{ fontSize: '12px' }} />

                        <img
                            src={product}
                            alt="image"
                            className="object-fit-cover"
                            style={{ width: '80px', height: '80px' }}
                        />

                        <div className="d-flex flex-column gap-1">
                            <h6 className='text-success'>Order Confirmed</h6>
                            <p className='text-muted'>10 mins ago</p>
                        </div>
                    </div>

                    <div className="d-flex align-items-center gap-3 py-2 px-3 border-bottom">
                        <FaCircle className='text-success' style={{ fontSize: '12px' }} />

                        <img
                            src={product}
                            alt="image"
                            className="object-fit-cover"
                            style={{ width: '80px', height: '80px' }}
                        />

                        <div className="d-flex flex-column gap-1">
                            <h6 className='text-success'>Order Confirmed</h6>
                            <p className='text-muted'>10 mins ago</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feedback Modal trigger after the order status become processing */}
            <div className="modal fade" id="feedbackModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">We'd love your feedback!</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Please tell us about your order experience.</p>
                            {/* Add form or textarea here */}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary">Submit Feedback</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
