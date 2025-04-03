import React, { useEffect, useState } from 'react';
import logo from '../../../public/assets/images/logo.png';
import { Link } from '@inertiajs/react';
import carousel_music from '../../../public/assets/images/carousel1.jpg';
import carousel_sports from '../../../public/assets/images/carousel2.jpg';
import carousel_gym from '../../../public/assets/images/carousel3.jpg';
import about from '../../../public/assets/images/about.jpg';
import mission from '../../../public/assets/images/mission.jpg';
import vision from '../../../public/assets/images/vision.jpg';
import { FaStore, FaPhone, FaLocationDot } from "react-icons/fa6";
import music1 from '../../../public/assets/products/music1.png';
import sport1 from '../../../public/assets/products/sport1.png';
import gym1 from '../../../public/assets/products/gym1.png';

import AOS from "aos";
import "aos/dist/aos.css";
import { useRoute } from '../../../vendor/tightenco/ziggy';

export default function Index() {

    const route = useRoute();

    const dummyData = [
        { id: 1, image: music1, name: "Music", price: "$500" },
        { id: 2, image: sport1, name: "Sports", price: "$30" },
        { id: 3, image: gym1, name: "Gym", price: "$800" },
        { id: 4, image: music1, name: "Music", price: "$500" },
        { id: 5, image: sport1, name: "Sports", price: "$30" },
        { id: 6, image: gym1, name: "Gym", price: "$800" },
    ];

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration in milliseconds
        });
    }, []);

    return (
        <div>
            <nav className={`navbar navbar-expand-lg fixed-top ${isScrolled ? "bg-light shadow" : "navbar-transparent"}`}>
                <div className="container-fluid">
                    <Link
                        className={`navbar-brand d-flex align-items-center gap-2 fw-bold ${isScrolled ? 'text-dark' : 'text-light'}`}
                        href="#home"
                    >
                        <img src={logo} alt="Logo" className="object-fit-contain rounded-pill me-2" style={{ width: "40px", height: "40px" }} />
                        Harmonics
                    </Link>

                    {/* Responsive Hamburger Menu */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-5">
                            <li className="nav-item">
                                <a
                                    className={`nav-link active ${isScrolled ? 'text-dark' : 'text-light'}`}
                                    aria-current="page"
                                    href="#home"
                                >
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${isScrolled ? 'text-dark' : 'text-light'}`}
                                    href="#products"
                                >
                                    Products
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${isScrolled ? 'text-dark' : 'text-light'}`}
                                    href="#about"
                                >
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className={`nav-link ${isScrolled ? 'text-dark' : 'text-light'}`}
                                    href="#contact"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>

                        <Link
                            href={route('guest.register')}
                            className={`btn login-btn ${isScrolled ? 'btn-outline-success' : 'btn-outline-light'}`}
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Bootstrap Carousel with Auto-Slide & Infinite Loop */}
            <section
                id="carouselExampleAutoslide"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-interval="5000"
                data-bs-wrap="true"
            >
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div
                            className="d-block w-100 d-flex justify-content-center align-items-center position-relative text-center px-3"
                            style={{
                                backgroundImage: `url(${carousel_music})`,
                                height: '100vh',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Darker Overlay */}
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 }}>
                            </div>

                            {/* Content Wrapper */}
                            <div
                                className="d-flex flex-column align-items-center gap-4 position-relative"
                                style={{ zIndex: 2, width: '850px' }}>
                                {/* Text with Better Readability */}
                                <h3
                                    className="text-light fw-bold px-3 py-2 rounded"
                                    style={{

                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0)', // Adds contrast
                                    }}>
                                    Feel the rhythm and express yourself with top-quality instruments built for every skill level
                                </h3>

                                {/* Improved Button Styling */}
                                <Link
                                    href={route('guest.login')}
                                    className="btn btn-success fw-bold px-4 py-2 rounded-lg shadow-lg"
                                    style={{ fontSize: '1.2rem', width: '250px' }}
                                >
                                    Buy Now!
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="d-block w-100 d-flex justify-content-center align-items-center position-relative text-center px-3"
                            style={{
                                backgroundImage: `url(${carousel_sports})`,
                                height: '100vh',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Darker Overlay */}
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 }}>
                            </div>

                            {/* Content Wrapper */}
                            <div
                                className="d-flex flex-column align-items-center gap-4 position-relative"
                                style={{ zIndex: 2, width: '850px' }}>
                                {/* Text with Better Readability */}
                                <h3
                                    className="text-light fw-bold px-3 py-2 rounded"
                                    style={{

                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0)', // Adds contrast
                                    }}>
                                    Stay ahead of the competition with premium sports gear designed for performance and durability.
                                </h3>

                                {/* Improved Button Styling */}
                                <Link
                                    href={route('guest.login')}
                                    className="btn btn-success fw-bold px-4 py-2 rounded-lg shadow-lg"
                                    style={{ fontSize: '1.2rem', width: '250px' }}
                                >
                                    Buy Now!
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div
                            className="d-block w-100 d-flex justify-content-center align-items-center position-relative text-center px-3"
                            style={{
                                backgroundImage: `url(${carousel_gym})`,
                                height: '100vh',
                                backgroundSize: 'cover',
                                backgroundPosition: 'center center',
                                backgroundRepeat: 'no-repeat',
                            }}
                        >
                            {/* Darker Overlay */}
                            <div
                                className="position-absolute top-0 start-0 w-100 h-100"
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1 }}>
                            </div>

                            {/* Content Wrapper */}
                            <div
                                className="d-flex flex-column align-items-center gap-4 position-relative"
                                style={{ zIndex: 2, width: '850px' }}>
                                {/* Text with Better Readability */}
                                <h3
                                    className="text-light fw-bold px-3 py-2 rounded"
                                    style={{

                                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0)', // Adds contrast
                                    }}>
                                    Train Hard. Stay Strong. Keep Going. Get the best gym gear today and power up your fitness journey!
                                </h3>

                                {/* Improved Button Styling */}
                                <Link
                                    href={route('guest.login')}
                                    className="btn btn-success fw-bold px-4 py-2 rounded-lg shadow-lg"
                                    style={{ fontSize: '1.2rem', width: '250px' }}
                                >
                                    Buy Now!
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Previous and Next Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoslide" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoslide" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </section>

            <section className="px-5 h-100" style={{ paddingTop: '95px' }} id='products'>
                <h3 className='mb-4' data-aos="zoom-out-down">PRODUCTS</h3>

                <div className="row">
                    {
                        dummyData.map(product => (
                            <div
                                className="col-md-4 mb-4"
                                key={product.id}
                                data-aos="fade-up"
                                data-aos-duration="2000"
                            >
                                <div className="card shadow rounded">
                                    <div className="card-header bg-light text-center">
                                        <img
                                            src={product.image}
                                            alt="product" className="object-fit-contain"
                                            style={{ width: '200px', height: '200px' }}
                                        />
                                    </div>
                                    <div className="card-body">
                                        <h3>{product.name}</h3>
                                        <h5>{product.price}</h5>
                                        <p className="mb-3">50 stocks left</p>

                                        <div className="d-grid">
                                            <Link
                                                href={route('guest.login')}
                                                className="btn btn-success"
                                            >
                                                Buy
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>

            <section className="container h-100 mb-5" style={{ paddingTop: '120px' }} id='about'>
                <div className="d-flex gap-5 mb-5">
                    <img
                        src={about}
                        alt="Photo"
                        className="object-fit-cover rounded-lg shadow"
                        style={{ width: '500px', height: '300px' }}
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                    />

                    <d-flex className="flex-column gap-3"
                        data-aos="fade-left"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                    >
                        <h2>About Us</h2>

                        <p style={{ textAlign: 'justify' }}>Founded in 1996, our business was created to bring together the worlds of sports, music, and fitness through high-quality gear. Starting as a small venture, we quickly grew by focusing on delivering durable and affordable products that meet the needs of athletes, musicians, and fitness enthusiasts. Today, we proudly offer a diverse range of sports equipment, gym equipment, and musical instruments, serving customers worldwide. Our commitment to quality and customer satisfaction continues to drive our growth and success.</p>
                    </d-flex>
                </div>
                <div className="d-flex gap-5 mb-5">
                    <img
                        src={mission}
                        alt="Photo"
                        className="object-fit-cover rounded-lg shadow"
                        style={{ width: '500px', height: '300px' }}
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                    />

                    <d-flex className="flex-column gap-3"
                        data-aos="fade-left"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                    >
                        <h2>Mission</h2>

                        <p style={{ textAlign: 'justify' }}>Our mission is simple: to provide top-tier products and exceptional service to every customer. We believe in the harmony between music, sports, and gym equipment, offering a way to express passion, creativity, and discipline. Our goal is to be the go-to shop for individuals who want to embrace both sides of their talents.</p>
                    </d-flex>
                </div>
                <div className="d-flex gap-5">
                    <img
                        src={vision}
                        alt="Photo"
                        className="object-fit-cover rounded-lg shadow"
                        style={{ width: '500px', height: '300px' }}
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                    />

                    <d-flex className="flex-column gap-3"
                        data-aos="fade-left"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                    >
                        <h2>Vision</h2>

                        <p style={{ textAlign: 'justify' }}>To be the leading global destination for sports, music, and fitness enthusiasts, providing high-quality sports gear, musical instruments, and gym equipment that inspire passion, creativity, and peak performance. We strive to empower individuals to embrace their talents and achieve their goals through exceptional products and outstanding service.</p>
                    </d-flex>
                </div>
            </section>

            <section className="container vh-100" style={{ paddingTop: '120px' }} id='contact'>
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-5"
                        data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000"
                    >
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.423289919323!2d125.61305387404973!3d7.0768250164880415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32f96d2158dc90d5%3A0x54ad2ae082c5865a!2sFEELMORE%20DAVAO%20CITY!5e0!3m2!1sen!2sph!4v1743516387822!5m2!1sen!2sph" width="500" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                    <div className="col-md-6 d-flex flex-column gap-3"
                        data-aos="fade-left"
                        data-aos-easing="ease-in-sine"
                    >
                        <div>
                            <h2>Get in Touch</h2>
                            <p className='mb-3' style={{ textAlign: 'justify' }}>Have questions or need assistance? We're here to help! Contact us for inquiries about our sports gear, musical instruments, or gym equipment. Let's connect and bring your passion to life!</p>
                        </div>

                        <p className='d-flex align-items-center gap-2'>
                            <FaPhone />
                            +639615607681
                        </p>
                        <p className='d-flex align-items-center gap-2'>
                            <FaLocationDot />
                            648 Sta. Ana Ave, Poblacion District, Davao City
                        </p>
                        <a href="https://www.facebook.com/feelmore.davao" className='text-light' style={{ textDecoration: 'none' }}>

                            feelmore.davao
                        </a>
                    </div>
                </div>
            </section>

            <footer className="py-5 h-1/2 bg-secondary text-light"
                data-aos="fade-up"
                data-aos-easing="ease-in-sine"
            >
                <div className="container h-100">
                    <div className="row">
                        <div className="col-md-4 d-flex flex-column gap-3">
                            <h4 className='d-flex gap-3'><FaStore /> Branches</h4>
                            <p>648 Sta. Ana Ave, Poblacion District, Davao City</p>
                            <p>Sm Center Muntinlupa</p>
                            <p>Feelmore Iloilo</p>
                        </div>
                        <div className="col-md-4 d-flex flex-column gap-3">
                            <h5>Get Started</h5>
                            <p>
                                <a href={route('guest.register')} className='text-light' style={{ textDecoration: 'none' }}>Create an Account</a>
                            </p>

                            <p>
                                <a href="#" className='text-light' style={{ textDecoration: 'none' }}>Frequently Asked Questions</a>
                            </p>

                        </div>
                        <div className="col-md-4 d-flex flex-column gap-3">
                            <h5>Links</h5>
                            <p>
                                <a href="#home" className='text-light' style={{ textDecoration: 'none' }}>Home</a>
                            </p>
                            <p>
                                <a href="#products" className='text-light' style={{ textDecoration: 'none' }}>Products</a>
                            </p>
                            <p>
                                <a href="#about" className='text-light' style={{ textDecoration: 'none' }}>About</a>
                            </p>
                            <p>
                                <a href="#contact" className='text-light' style={{ textDecoration: 'none' }}>Contact</a>
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

Index.noLayout = true;
