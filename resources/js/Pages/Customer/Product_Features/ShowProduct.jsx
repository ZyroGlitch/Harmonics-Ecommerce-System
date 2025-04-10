import React, { useEffect } from 'react'
import CustomerLayout from '../../../Layout/CustomerLayout'
import { useRoute } from '../../../../../vendor/tightenco/ziggy'
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { BsCartFill, BsBagFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa6";
import profile from '../../../../../public/assets/images/profile1.jpg'

function ShowProduct({ product }) {
    // console.log(product);

    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        'product_id': product.id,
        'quantity': 1,
    });

    function submit(e) {
        e.preventDefault();
        post(route('customer.addToCart'), {
            onSuccess() {
                reset();
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
        <div>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' expand={true} richColors />

            <form onSubmit={submit}>
                <nav aria-label="breadcrumb" className='mb-5'>
                    <ol class="breadcrumb fw-semibold">
                        <Link
                            href={route('customer.dashboard')}
                            className="breadcrumb-item text-muted"
                            style={{ textDecoration: 'none' }}
                        >Back</Link>

                        <li className="breadcrumb-item active text-success" aria-current="page">{product.product_name}</li>
                    </ol>
                </nav>

                <div className="row gap-3" style={{ marginBottom: '125px' }}>
                    <div className="col-md-5 text-center">
                        <img
                            src={`/storage/${product.image}`}
                            alt="product"
                            className="object-fit-contain"
                            style={{ width: '350px', height: '350px' }}
                        />
                    </div>

                    <div className='col-md-5'>
                        <h2 className='text-success mb-3'>{product.product_name}</h2>
                        <div className="d-flex justify-content-between">
                            <div className='d-flex flex-column gap-2'>
                                <h5>Price</h5>
                                <h5>Stock available</h5>
                                <h6 className={`mb-2
                                ${product.status === 'In Stock' ? 'text-success' : ''} 
                                ${product.status === 'Low of Stock' ? 'text-warning' : ''} 
                                ${product.status === 'Out of Stock' ? 'text-danger' : ''} 
                            `}>{product.status}</h6>
                            </div>
                            <div className='d-flex flex-column gap-2'>
                                <p>₱{product.price}</p>
                                <p>{product.stocks} stocks left</p>
                            </div>
                        </div>
                        <hr />
                        <h5>Description</h5>
                        <p className=''>{product.description}</p>
                        <hr />

                        <div className="mb-4">
                            <label htmlFor="quantity" className="form-label mb-2">Quantity</label>
                            <input
                                type="number"
                                className="form-control shadow-sm"
                                id='quantity'
                                min='1'
                                value={data.quantity}
                                onChange={(e) => setData('quantity', e.target.value)}
                            />

                            {
                                errors.quantity && <p className='text-danger mt-2'>{errors.quantity}</p>
                            }
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <Link
                                href={route('customer.buyProduct', { product_id: product.id, quantity: data.quantity })}
                                className='btn btn-primary shadow-sm d-flex justify-content-center align-items-center gap-2 w-100'
                            >
                                <BsBagFill /> Buy
                            </Link>

                            <button
                                type='submit'
                                className='btn btn-danger shadow-sm d-flex justify-content-center align-items-center gap-2 w-100'
                                disabled={processing}
                            >
                                <BsCartFill /> Add to cart
                            </button>
                        </div>
                    </div>
                </div>

                <div className="card shadow-sm rounded mb-4">
                    <div className="card-body">
                        <h3 className='text-success mb-3'>Product Ratings</h3>

                        <div className="card shadow-sm rounded mb-5">
                            <div className="card-body d-flex align-items-center gap-3">
                                <div className="col-md-3">
                                    <h4 className='text-success text-center mb-2'>4.5 out of 5</h4>

                                    <div className="d-flex justify-content-center fs-4 gap-1">
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                    </div>
                                </div>
                                <div className="col-md-9 row align-items-center">
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            All
                                        </button>

                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            With Comments
                                        </button>

                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            With Media
                                        </button>
                                    </div>

                                    <div className="d-flex align-items-center gap-3">
                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            5 Star
                                        </button>

                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            4 Star
                                        </button>

                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            3 Star
                                        </button>

                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            2 Star
                                        </button>

                                        <button className="btn btn-outline-dark shadow-sm d-flex justify-content-center align-items-center w-100">
                                            1 Star
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p className='fs-5 text-muted fw-bold mb-3'>Reviews</p>

                        <hr />
                        <div className="row">
                            <div className="col-lg-1 col-md-1 text-end">
                                <img
                                    src={profile}
                                    alt="profile"
                                    className="object-fit-cover rounded-circle shadow-sm"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </div>

                            <div className='col-lg-11 col-md-11'>
                                <p className='fs-5'>John Ford Buliag</p>

                                <div className="d-flex align-items-center gap-1 mb-2">
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                </div>

                                <p className='text-muted mb-3'>April 4, 2025 10:31 AM</p>
                                <p className='d-flex align-items-center gap-2'>
                                    <span className="text-muted fw-semibold">
                                        Appearance:
                                    </span>
                                    <p> Very Good</p>
                                </p>

                                <p className='d-flex align-items-center gap-2 mb-4'>
                                    <span className="text-muted fw-semibold">
                                        Quality:
                                    </span>
                                    <p> Very Good</p>
                                </p>

                                <p className='mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet suscipit cupiditate necessitatibus ut temporibus officia illum cum ea, dicta rerum optio sequi. Ipsum, ex. Sed corrupti nesciunt provident, illo aliquam voluptatibus nihil vero, aspernatur fugiat, voluptatem maxime nemo. A voluptatem minima et expedita inventore similique! Itaque ab harum alias consequuntur quo libero eum laborum sunt incidunt autem sint quaerat molestias hic nisi molestiae necessitatibus maxime deleniti nesciunt, pariatur, quae temporibus quidem! Iusto eveniet aperiam laborum eos, repudiandae aut odio adipisci fugit dolorum provident unde reprehenderit maiores, omnis est. Corporis sed officiis nisi quaerat. Voluptatum asperiores, quae eum quia saepe suscipit.</p>

                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={profile}
                                        alt="profile"
                                        className="object-fit-cover rounded shadow-sm"
                                        style={{ width: '80px', height: '80px' }}
                                    />

                                    <img
                                        src={profile}
                                        alt="profile"
                                        className="object-fit-cover rounded shadow-sm"
                                        style={{ width: '80px', height: '80px' }}
                                    />

                                    <img
                                        src={profile}
                                        alt="profile"
                                        className="object-fit-cover rounded shadow-sm"
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        <hr />
                        <div className="row">
                            <div className="col-lg-1 col-md-1 text-end">
                                <img
                                    src={profile}
                                    alt="profile"
                                    className="object-fit-cover rounded-circle shadow-sm"
                                    style={{ width: '50px', height: '50px' }}
                                />
                            </div>

                            <div className='col-lg-11 col-md-11'>
                                <p className='fs-5'>John Ford Buliag</p>

                                <div className="d-flex align-items-center gap-1 mb-2">
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                    <FaStar className='text-warning' />
                                </div>

                                <p className='text-muted mb-3'>April 4, 2025 10:31 AM</p>
                                <p className='d-flex align-items-center gap-2'>
                                    <span className="text-muted fw-semibold">
                                        Appearance:
                                    </span>
                                    <p> Very Good</p>
                                </p>

                                <p className='d-flex align-items-center gap-2 mb-4'>
                                    <span className="text-muted fw-semibold">
                                        Quality:
                                    </span>
                                    <p> Very Good</p>
                                </p>

                                <p className='mb-3'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet suscipit cupiditate necessitatibus ut temporibus officia illum cum ea, dicta rerum optio sequi. Ipsum, ex. Sed corrupti nesciunt provident, illo aliquam voluptatibus nihil vero, aspernatur fugiat, voluptatem maxime nemo. A voluptatem minima et expedita inventore similique! Itaque ab harum alias consequuntur quo libero eum laborum sunt incidunt autem sint quaerat molestias hic nisi molestiae necessitatibus maxime deleniti nesciunt, pariatur, quae temporibus quidem! Iusto eveniet aperiam laborum eos, repudiandae aut odio adipisci fugit dolorum provident unde reprehenderit maiores, omnis est. Corporis sed officiis nisi quaerat. Voluptatum asperiores, quae eum quia saepe suscipit.</p>

                                <div className="d-flex align-items-center gap-3">
                                    <img
                                        src={profile}
                                        alt="profile"
                                        className="object-fit-cover rounded shadow-sm"
                                        style={{ width: '80px', height: '80px' }}
                                    />

                                    <img
                                        src={profile}
                                        alt="profile"
                                        className="object-fit-cover rounded shadow-sm"
                                        style={{ width: '80px', height: '80px' }}
                                    />

                                    <img
                                        src={profile}
                                        alt="profile"
                                        className="object-fit-cover rounded shadow-sm"
                                        style={{ width: '80px', height: '80px' }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

ShowProduct.layout = page => <CustomerLayout children={page} />
export default ShowProduct