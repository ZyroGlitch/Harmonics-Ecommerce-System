import React from 'react'
import logo from '../../../public/assets/images/logo.png'
import profile from '../../../public/assets/images/profile.png'
import { Link, usePage } from '@inertiajs/react'
import { BsFillGridFill, BsBagFill, BsCartFill } from "react-icons/bs";
import { IoExit, IoPeople } from "react-icons/io5";
import {
    FaBars, FaUserLarge, FaCubes, FaCoins,
    FaBell, FaEnvelope, FaChartPie, FaStore
} from "react-icons/fa6";
import { useRoute } from '../../../vendor/tightenco/ziggy'
import MetaTagsLayout from './MetaTagsLayout';


export default function ManagerLayout({ children }) {
    const route = useRoute();

    // Get the authenticated user credentials
    const { auth } = usePage().props

    return (

        <>
            <MetaTagsLayout />

            <div className="d-flex vh-100 bg-light">
                {/* Sidebar (Fixed, Non-Scrollable) */}
                <div className="bg-light shadow p-3 sidebar" style={{ width: '20%', height: '100vh', position: 'fixed' }}>
                    <div className="d-flex align-items-center gap-2 mb-4">
                        <div className="text-center">
                            <img src={logo} alt="logo" className="object-fit-cover rounded-circle shadow-sm" style={{ width: '50px', height: '50px' }} />
                        </div>

                        <h3 className='text-success'>Harmonics</h3>
                    </div>

                    <nav className="d-flex flex-column gap-1">
                        <Link
                            href={route('manager.dashboard')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('manager.dashboard') ? 'active' : ''}`}
                        >
                            <FaStore /> On-Site Orders
                        </Link>

                        <Link
                            href={route('manager.cart')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('manager.cart') ? 'active' : ''}`}
                        >
                            <BsCartFill /> Cart
                        </Link>

                        <Link
                            href={route('manager.product')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('manager.product') ? 'active' : ''}`}
                        >
                            <BsBagFill /> Product
                        </Link>

                        <Link
                            href={route('manager.orders')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('manager.orders') ? 'active' : ''}`}
                        >
                            <FaCubes /> Orders
                        </Link>

                        <Link
                            href={route('manager.profile')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('manager.profile') ? 'active' : ''}`}
                        >
                            <FaUserLarge /> Profile
                        </Link>
                    </nav>

                    <div style={{ position: 'absolute', bottom: '2vh' }}>
                        <Link
                            href={route('manager.logout')}
                            className="d-flex align-items-center gap-2 rounded p-2 sidebar-item"
                        >
                            <IoExit /> Logout
                        </Link>
                    </div>
                </div>

                {/* Content Area (Scrollable) */}
                <div className="bg-light content">
                    <nav className="d-flex justify-content-between align-items-center bg-success text-light px-3 py-2 sticky-top">
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-light humburger-hidden" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"><FaBars /></button>

                            <img
                                src={auth.user.profile ? `/storage/${auth.user.profile}` : profile} alt="profile"
                                className="object-fit-cover rounded-circle border border-2 border-light shadow-lg"
                                style={{ width: '45px', height: '45px' }} />

                            <h5 className="text-light"><span className="text-warning">Hi!</span> {auth.user ? `${auth.user.firstname} ${auth.user.lastname}` : 'Guest'}</h5>
                        </div>

                        <div className='d-flex align-items-center gap-4'>
                            <Link href='' className='text-light fs-5'><FaEnvelope /></Link>
                            <Link href='' className='text-light fs-5'><FaBell /></Link>
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

                            <h5 className="offcanvas-title text-success" id="offcanvasExampleLabel">Harmonics</h5>
                        </div>


                        <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body d-flex flex-column gap-1 bg-light">
                        <nav className="d-flex flex-column gap-1">
                            <Link
                                // href={route('admin.dashboard')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${/* route().current('admin.dashboard') ? 'active' : '' */ ''}`}
                            >
                                <BsFillGridFill /> Dashboard
                            </Link>

                            <Link
                                // href={route('admin.sales')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${/* route().current('admin.sales') ? 'active' : '' */ ''}`}
                            >
                                <FaCoins /> Sales
                            </Link>

                            <Link
                                // href={route('admin.inventory')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${/* route().current('admin.inventory') ? 'active' : '' */ ''}`}
                            >
                                <FaCubes /> Inventory
                            </Link>

                            <Link
                                // href={route('admin.employee')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${/* route().current('admin.employee') ? 'active' : '' */ ''}`}
                            >
                                <IoPeople /> Employee
                            </Link>

                            <Link
                                // href={route('admin.profile')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${/* route().current('admin.profile') ? 'active' : '' */ ''}`}
                            >
                                <FaUserLarge /> Profile
                            </Link>
                        </nav>

                        <div style={{ marginTop: '235px' }}>
                            <Link
                                // href={route('guest.index')}
                                className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${/* route().current('admin.index') ? 'active' : '' */ ''}`}
                            >
                                <IoExit /> Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}
