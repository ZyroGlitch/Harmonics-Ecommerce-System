import React from 'react'
import logo from '../../../public/assets/images/logo.png'
import profile from '../../../public/assets/images/profile.png'
import { Link, useForm, usePage } from '@inertiajs/react'
import { BsFillGridFill, BsBagFill, BsCartFill, BsClipboard2CheckFill } from "react-icons/bs";
import { IoExit } from "react-icons/io5";
import { FaBars, FaUserLarge } from "react-icons/fa6";
import { useRoute } from '../../../vendor/tightenco/ziggy'
import MetaTagsLayout from './MetaTagsLayout';


export default function CustomerLayout({ children }) {
    const route = useRoute();

    // Get the authenticated user credentials
    const { auth } = usePage().props

    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('employee.logout'), {
            onSuccess: () => {
                console.log("Logged out successfully");
            },
            onError: (errors) => {
                console.error("Logout failed", errors);
            }
        });

    };

    return (
        <>
            <MetaTagsLayout />

            <div className="d-flex vh-100 bg-light">
                {/* Sidebar (Fixed, Non-Scrollable) */}
                <div className="bg-light shadow p-3 sidebar" style={{ width: '20%', height: '100vh', position: 'fixed' }}>
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="text-center">
                            <img src={logo} alt="logo" className="object-fit-cover" style={{ width: '50px', height: '50px' }} />
                        </div>

                        <h2 className='text-success'>EverBloom</h2>
                    </div>


                    <nav className="d-flex flex-column gap-1">
                        <Link
                            href={route('customer.product')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.product') ? 'active' : ''}`}
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
                            href={route('customer.profile')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.profile') ? 'active' : ''}`}
                        >
                            <FaUserLarge /> Profile
                        </Link>
                    </nav>

                    <div style={{ position: 'absolute', bottom: '2vh' }}>
                        <Link
                            href={route('customer.index')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.index') ? 'active' : ''}`}
                        ><IoExit /> Logout
                        </Link>
                    </div>
                </div>

                {/* Content Area (Scrollable) */}
                <div className="bg-light content">
                    <nav className="d-flex justify-content-between align-items-center bg-primary text-light px-3 py-2 sticky-top">
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-light humburger-hidden" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"><FaBars /></button>

                            <img src={auth.user ? `/storage/${auth.user.profile}` : profile} alt="profile" className="object-fit-cover rounded-circle border border-2 border-light shadow-lg" style={{ width: '45px', height: '45px' }} />
                            <h5 className="text-light"><span className="text-warning">Hi!</span> {auth.user ? `${auth.user.firstname} ${auth.user.lastname}` : 'Guest'}</h5>
                        </div>
                    </nav>

                    {/* Dynamic Content Section */}
                    <section className="p-3">
                        {children}
                    </section>
                </div>


                {/* Offcanvas */}
                <div className="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" style={{ width: '300px' }}>
                    <div class="offcanvas-header d-flex align-items-center bg-light">
                        <div className="d-flex align-items-center gap-2">
                            <img src={logo} alt="logo" className="object-fit-cover" style={{ width: '50px', height: '50px' }} />

                            <h5 className="offcanvas-title text-success" id="offcanvasExampleLabel">EverBloom</h5>
                        </div>


                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-flex flex-column gap-1 bg-light">
                        <nav className="d-flex flex-column gap-1">
                            <Link
                                href={route('customer.product')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.product') ? 'active' : ''}`}
                            >
                                <BsBagFill /> Products
                            </Link>

                            <Link
                                href={route('customer.cart')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.dashboard') ? 'active' : ''}`}
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
                                href={route('customer.profile')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.profile') ? 'active' : ''}`}
                            >
                                <FaUserLarge /> Profile
                            </Link>
                        </nav>

                        <div style={{ position: 'absolute', bottom: '2vh' }}>
                            <Link
                                href={route('customer.index')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.index') ? 'active' : ''}`}
                            ><IoExit /> Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
