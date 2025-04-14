import React, { useState } from 'react'
import logo from '../../../public/assets/images/logo.png'
import { Link } from '@inertiajs/react'
import { FaCircle, FaPaperPlane, FaFile, FaRegTrashCan, FaArrowLeftLong, FaSquareCaretRight, FaSquareCaretDown, FaTag, FaCircleExclamation, FaBagShopping, FaPencil } from "react-icons/fa6";
import { useRoute } from '../../../vendor/tightenco/ziggy'
import MetaTagsLayout from './MetaTagsLayout';
import product from '../../../public/assets/products/gym1.png'
import { HiFolderArrowDown } from "react-icons/hi2";
import EmailSearch from './EmailSearch';


// import AOS from "aos";
// import "aos/dist/aos.css";


export default function EmailLayout({ children }) {
    const route = useRoute();

    const [category, setCategory] = useState(false);

    const toggleCategory = () => {
        var state = category;
        setCategory(!state);
    }
    console.log(category);

    // useEffect(() => {
    //     AOS.init({
    //         duration: 1000, // Animation duration in milliseconds
    //         once: true, // Whether animation should happen only once
    //     });
    // }, []);

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
                        <button
                            className="btn btn-success shadow-sm d-flex align-items-center gap-2 mb-3 compose-btn"
                            style={{ height: '50px' }}
                        >
                            <FaPencil /> Compose
                        </button>

                        <Link
                            href={route('customer.inbox')}
                            className={`d-flex justify-content-between align-items-center rounded p-2 sidebar-item ${route().current('customer.inbox') ? 'active' : ''}`}
                        >
                            <div className='d-flex align-items-center gap-2'>
                                <HiFolderArrowDown />
                                <p>Inbox</p>
                            </div>

                            <p>5000</p>
                        </Link>
                        <Link
                            href={route('customer.sent')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.sent') ? 'active' : ''}`}
                        >
                            <FaPaperPlane /> Sent
                        </Link>
                        <Link
                            href={route('customer.drafts')}
                            className={`d-flex justify-content-between align-items-center rounded p-2 sidebar-item ${route().current('customer.drafts') ? 'active' : ''}`}
                        >
                            <div className='d-flex align-items-center gap-2'>
                                <FaFile />
                                <p>Drafts</p>
                            </div>

                            <p>10</p>
                        </Link>
                        <Link
                            href={route('customer.trash')}
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.trash') ? 'active' : ''}`}
                        >
                            <FaRegTrashCan /> Trash
                        </Link>
                        <a
                            className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ${route().current('customer.profile') ? 'active' : ''}`}
                            style={{ cursor: 'pointer' }}
                            onClick={toggleCategory}
                        >
                            {
                                category ? (
                                    <>
                                        <FaSquareCaretDown /> Categories
                                    </>
                                ) : (
                                    <>
                                        <FaSquareCaretRight /> Categories
                                    </>
                                )
                            }
                        </a>

                        {
                            category ? (
                                <>
                                    <Link
                                        // href={route('customer.profile')}
                                        className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ms-3 ${route().current('customer.profile') ? 'active' : ''}`}
                                        onClick={toggleCategory}
                                    >
                                        <FaBagShopping /> Orders
                                    </Link>

                                    <Link
                                        // href={route('customer.profile')}
                                        className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ms-3 ${route().current('customer.profile') ? 'active' : ''}`}
                                        onClick={toggleCategory}
                                    >
                                        <FaCircleExclamation /> Updates
                                    </Link>

                                    <Link
                                        // href={route('customer.profile')}
                                        className={`d-flex align-items-center gap-2 rounded p-2 sidebar-item ms-3 ${route().current('customer.profile') ? 'active' : ''}`}
                                        onClick={toggleCategory}
                                    >
                                        <FaTag /> Promotion
                                    </Link>
                                </>
                            ) : (
                                ''
                            )
                        }
                    </nav>

                    <div style={{ position: 'absolute', bottom: '2vh' }}>
                        <Link
                            href={route('customer.dashboard')}
                            className="d-flex align-items-center gap-2 rounded p-2 sidebar-item"
                        >
                            <FaArrowLeftLong />Back to dashboard
                        </Link>
                    </div>
                </div>

                <div className="bg-light content p-4">
                    <EmailSearch />

                    <section>
                        {children}
                    </section>
                </div>
            </div>

            {/* Notification Offcanvas  */}
            <div className="offcanvas offcanvas-end" tabindex="-1" id="notifications" aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header border border-bottom">
                    <div className="d-flex flex-column gap-1">
                        <h4 className='text-success'>
                            Notifications
                        </h4>
                        <p className='text-muted'>You have 3 Notifications today.</p>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body p-0">
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
        </>
    )
}
