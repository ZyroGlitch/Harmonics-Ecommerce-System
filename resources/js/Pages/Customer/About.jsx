import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import illustration1 from '../../../../public/assets/images/illustration1.png'
import quality from '../../../../public/assets/images/quality.png'
import affordable from '../../../../public/assets/images/affordable.png'
import fastdelivery from '../../../../public/assets/images/deliver.png'
import friendly from '../../../../public/assets/images/user-friendly.png'
import reviews from '../../../../public/assets/images/reviews.png'
import support from '../../../../public/assets/images/support.png'
import profile from '../../../../public/assets/images/profile1.jpg'
import { FaArrowRightLong, FaArrowLeftLong, FaStore } from "react-icons/fa6";
import { Link } from '@inertiajs/react'
import { useRoute } from '../../../../vendor/tightenco/ziggy'

function About() {
    const route = useRoute();

    return (
        <div style={{ overflowX: 'hidden' }}>
            <div className="row py-5 gap-4 text-muted mb-5">
                <div className="col-md-5">
                    <div className="d-flex flex-column justify-content-center justify-content-end">
                        <img
                            src={illustration1}
                            alt="image"
                            className="object-fit-contain"
                            style={{ width: '450px', height: '450px' }}
                        />
                    </div>

                </div>
                <div className="col-md-6 d-flex flex-column justify-content-center gap-3">
                    <div>
                        <h5>WHO WE ARE</h5>
                        <h2 className='text-dark'>Fueling Passion for Music, Sports, and Fitness</h2>
                    </div>

                    <p>At HARMONICS, we believe in empowering every individual to express themselves—whether it’s through rhythm, movement, or strength. Our platform is dedicated to offering top-quality music instruments, sports essentials, and fitness gear to help you pursue your passions.</p>

                    <p>Driven by innovation and convenience, we bring the store to your fingertips—saving you the hassle of physical shopping while providing an exciting online experience tailored to your active lifestyle.</p>

                    <div>
                        <p className='d-flex align-items-center gap-2'>
                            <span>✔</span>
                            Seamless Online Shopping
                        </p>
                        <p className='d-flex align-items-center gap-2'>
                            <span>✔</span>
                            No More Queues or Crowds
                        </p>
                        <p className='d-flex align-items-center gap-2'>
                            <span>✔</span>
                            Delivered Right to Your Doorstep
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-success text-light py-5">
                <div className="d-flex justify-content-center mb-5">
                    <div className='text-center' style={{ maxWidth: '600px' }}>
                        <h2 className='mb-2'>Why Choose Us</h2>
                        <p>
                            Harmonics offers top-quality music, sports, and fitness gear with a smooth, hassle-free online shopping experience tailored to your lifestyle.
                        </p>
                    </div>
                </div>

                <div className='d-flex align-items-center gap-3 px-4 mb-4'>
                    <div className="w-100">
                        <div className="card shadow rounded">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-3">
                                <img
                                    src={quality}
                                    alt="image"
                                    className="object-fit-cover"
                                    style={{ width: '60px', height: '60px' }}
                                />

                                <div className="text-center">
                                    <h5 className='text-success mb-1'>High Quality Products</h5>
                                    <p className='text-muted'>Built to last with performance and durability you can trust.</p>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="card shadow rounded">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-3">
                                <img
                                    src={affordable}
                                    alt="image"
                                    className="object-fit-cover"
                                    style={{ width: '60px', height: '60px' }}
                                />

                                <div className="text-center">
                                    <h5 className='text-success mb-1'>Affordable Prices</h5>
                                    <p className='text-muted'>Get premium gear without spending beyond your budget.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="card shadow rounded">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-3">
                                <img
                                    src={fastdelivery}
                                    alt="image"
                                    className="object-fit-cover"
                                    style={{ width: '60px', height: '60px' }}
                                />

                                <div className="text-center">
                                    <h5 className='text-success mb-1'>Fast & Reliable Delivery</h5>
                                    <p className='text-muted'>Quick and secure delivery right to your doorstep.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='d-flex align-items-stretch gap-3 px-4 mb-4'>
                    <div className="w-100">
                        <div className="card shadow rounded h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-3 h-100">
                                <img
                                    src={friendly}
                                    alt="image"
                                    className="object-fit-cover"
                                    style={{ width: '60px', height: '60px' }}
                                />
                                <div className="text-center">
                                    <h5 className='text-success mb-1'>User-Friendly Shopping Experience</h5>
                                    <p className='text-muted'>Simple navigation and smooth checkout for easy browsing.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="card shadow rounded h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-3 h-100">
                                <img
                                    src={reviews}
                                    alt="image"
                                    className="object-fit-cover"
                                    style={{ width: '60px', height: '60px' }}
                                />
                                <div className="text-center">
                                    <h5 className='text-success mb-1'>Verified Customer Reviews</h5>
                                    <p className='text-muted'>Honest feedback from real buyers to guide your choice.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-100">
                        <div className="card shadow rounded h-100">
                            <div className="card-body d-flex flex-column justify-content-center align-items-center gap-3 h-100">
                                <img
                                    src={support}
                                    alt="image"
                                    className="object-fit-cover"
                                    style={{ width: '60px', height: '60px' }}
                                />
                                <div className="text-center">
                                    <h5 className='text-success mb-1'>Excellent Customer Support</h5>
                                    <p className='text-muted'>Friendly, fast help whenever you need assistance.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="py-5">
                <div className="d-flex flex-column align-items-center gap-3 mb-5">
                    <div className='d-flex flex-column align-items-center' style={{ width: '600px' }}>
                        <h2 className='d-flex align-items-center gap-4 mb-2'>
                            <FaArrowRightLong className='text-success' />
                            What Customer Says
                            <FaArrowLeftLong className='text-success' />
                        </h2>
                        <p className='text-center text-muted'>
                            Hear real stories from our satisfied customers <br />
                            who love shopping with Harmonics.
                        </p>
                    </div>
                </div>

                {/* Bootstrap Carousel with Auto-Slide & Infinite Loop */}
                <section
                    id="carouselExampleAutoslide"
                    className="carousel slide position-relative"
                    data-bs-ride="carousel"
                // data-bs-interval="5000"
                // data-bs-wrap="true"
                >
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="d-flex align-items-center gap-3 px-4 mb-4">
                                {/* 1st Card */}
                                <div className="w-100">
                                    <div className="card shadow rounded">
                                        <div className="card-body">
                                            <img
                                                src={profile}
                                                alt="image"
                                                className="object-fit-cover rounded-circle border border-3 border-success shadow mb-3"
                                                style={{ width: "60px", height: "60px" }}
                                            />
                                            <div>
                                                <h5 className="text-success mb-1">John Ford Buliag</h5>
                                                <p className="text-muted">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam, alias tempore consequatur...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-100">
                                    <div className="card shadow rounded">
                                        <div className="card-body">
                                            <img
                                                src={profile}
                                                alt="image"
                                                className="object-fit-cover rounded-circle border border-3 border-success shadow mb-3"
                                                style={{ width: "60px", height: "60px" }}
                                            />
                                            <div>
                                                <h5 className="text-success mb-1">John Ford Buliag</h5>
                                                <p className="text-muted">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam, alias tempore consequatur...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-100">
                                    <div className="card shadow rounded">
                                        <div className="card-body">
                                            <img
                                                src={profile}
                                                alt="image"
                                                className="object-fit-cover rounded-circle border border-3 border-success shadow mb-3"
                                                style={{ width: "60px", height: "60px" }}
                                            />
                                            <div>
                                                <h5 className="text-success mb-1">John Ford Buliag</h5>
                                                <p className="text-muted">
                                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi aperiam, alias tempore consequatur...
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Add more carousel-item elements here as needed */}
                        <div className="carousel-item"></div>
                        <div className="carousel-item"></div>
                    </div>

                    {/* Previous and Next Controls */}
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleAutoslide"
                        data-bs-slide="prev"
                        style={{
                            left: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            border: 'none',
                            borderRadius: '50%',
                            zIndex: '10',
                        }}
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                            style={{ filter: 'invert(1)', width: '100%', height: '100%' }}
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>

                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleAutoslide"
                        data-bs-slide="next"
                        style={{
                            right: '10px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: '50px',
                            height: '50px',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            border: 'none',
                            borderRadius: '50%',
                            zIndex: '10',
                        }}
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                            style={{ filter: 'invert(1)', width: '100%', height: '100%' }}
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </section>
            </div>

            <footer className="py-5 h-1/2 bg-success text-light">
                <div className="row justify-content-evenly">
                    <div className="col-md-3 d-flex flex-column gap-3">
                        <h4 className='d-flex gap-3'><FaStore /> Branches</h4>
                        <a
                            href='https://maps.app.goo.gl/CG5gtE4LEhU9tupTA'
                            target='_blank'
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            648 Sta. Ana Ave, Poblacion District, Davao City
                        </a>

                        <a
                            href='https://maps.app.goo.gl/KBntSaQAHDvYBcBM7'
                            target='_blank'
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            Metro Manila
                        </a>

                        <a
                            href='https://maps.app.goo.gl/KBntSaQAHDvYBcBM7'
                            target='_blank'
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            Feelmore Iloilo
                        </a>
                    </div>
                    <div className="col-md-3 d-flex flex-column gap-3">
                        <h5>Get Started</h5>
                        <p>
                            <a className='text-light' style={{ textDecoration: 'none' }}>Create an Account</a>
                        </p>

                        <p>
                            <a className='text-light' style={{ textDecoration: 'none' }}>Frequently Asked Questions</a>
                        </p>

                    </div>
                    <div className="col-md-3 d-flex flex-column gap-3">
                        <h5>Links</h5>

                        <Link
                            href={route('customer.dashboard')}
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            Products
                        </Link>

                        <Link
                            href={route('customer.cart')}
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            Cart
                        </Link>

                        <Link
                            href={route('customer.orders')}
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            Orders
                        </Link>

                        <Link
                            href={route('customer.about')}
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            About
                        </Link>

                        <Link
                            href={route('customer.profile')}
                            className='text-light'
                            style={{ textDecoration: 'none' }}
                        >
                            Profile
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}

About.layout = page => <CustomerLayout children={page} />
export default About