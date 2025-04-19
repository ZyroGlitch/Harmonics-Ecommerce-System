import React, { useEffect, useState } from 'react'
import CustomerLayout from '../../../Layout/CustomerLayout'
import { useRoute } from '../../../../../vendor/tightenco/ziggy'
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { BsCartFill, BsBagFill } from "react-icons/bs";
import { FaStar, FaCommentDots } from "react-icons/fa6";
import profile from '../../../../../public/assets/images/profile.png'
import feedback from '../../../../../public/assets/images/feedback.png'
import { Modal } from 'bootstrap';

function ShowProduct({ product, feedbackLists }) {
    // console.log(product);
    console.log(feedbackLists);

    const route = useRoute();

    const { data: cartData, setData: seCartData, post: postAddCart, processing: processingAddCart, errors: errorAddCart, reset: resetAddCart } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    function cartSubmit(e) {
        e.preventDefault();
        postAddCart(route('customer.addToCart'), {
            onSuccess() {
                resetAddCart();
            }
        });
    }

    const { data: feedbackData, setData: setFeedbackData, post: postFeedbackData, processing: processingFeedbackData, errors: errorFeedbackData, reset: resetFeedbackData } = useForm({
        product_id: product.id,
        stars: '',
        title: '',
        appearance_rating: '',
        quality_rating: '',
        message: '',
        images: [],
    });

    const [imagePreview, setImagePreview] = useState([]);

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);

        if (files.length > 3) {
            // Trigger Modal for exceeding image limit
            const feedbackModal = new Modal(document.getElementById('maxImagesModal'));
            feedbackModal.show();

            e.target.value = ''; // Reset the file input
            return;
        }

        // Set images to form data
        setFeedbackData('images', files);

        // Generate preview URLs
        const previews = files.map(file => URL.createObjectURL(file));
        setImagePreview(previews);
    };



    function feedbackSubmit(e) {
        e.preventDefault();
        postFeedbackData(route('customer.feedback'), {
            onSuccess() {
                resetFeedbackData();

                setImagePreview(null);
                setFeedbackData('images', null);
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
        <div className='p-4'>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' expand={true} richColors />

            <form onSubmit={cartSubmit}>
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
                                value={cartData.quantity}
                                onChange={(e) => seCartData('quantity', e.target.value)}
                            />

                            {
                                errorAddCart.quantity && <p className='text-danger mt-2'>{errorAddCart.quantity}</p>
                            }
                        </div>

                        <div className="d-flex align-items-center gap-3">
                            <Link
                                href={route('customer.buyProduct', { product_id: product.id, quantity: cartData.quantity })}
                                className='btn btn-primary shadow-sm d-flex justify-content-center align-items-center gap-2 w-100'
                            >
                                <BsBagFill /> Buy
                            </Link>

                            <button
                                type='submit'
                                className='btn btn-danger shadow-sm d-flex justify-content-center align-items-center gap-2 w-100'
                                disabled={processingAddCart}
                            >
                                <BsCartFill /> Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </form>

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

                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className='fs-5 text-muted fw-bold'>Reviews</p>

                        <button
                            className='btn btn-success shadow-sm d-flex align-items-center gap-2'
                            data-bs-toggle="modal" data-bs-target="#feedbackModal"
                        >
                            <FaCommentDots /> Add feedback
                        </button>
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <p>Showing {feedbackLists.to} out of {feedbackLists.total} Reviews</p>

                        <div>
                            {
                                feedbackLists.links.map((link) => (
                                    link.url ?
                                        <Link
                                            key={link.label}
                                            href={link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className={`btn btn-sm me-3 ${link.active ? 'btn-success' : 'btn-outline-success'}`}
                                            style={{ textDecoration: 'none' }}
                                            preserveScroll
                                        />

                                        :
                                        <span
                                            key={link.label}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                            className='me-3 text-muted'
                                        >

                                        </span>
                                ))
                            }
                        </div>
                    </div>

                    {
                        feedbackLists.data.length > 0 ? (
                            feedbackLists.data.map(feedback => {
                                const formattedDate = new Date(feedback.updated_at).toLocaleString("en-US", {
                                    month: "long",
                                    day: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                });

                                return (
                                    <>
                                        <hr />
                                        <div className="row" key={feedback.id}>
                                            <div className="col-lg-1 col-md-1 text-end">
                                                <img
                                                    src={feedback.user.profile ? `/storage/${feedback.user.profile}` : profile}
                                                    alt="profile"
                                                    className="object-fit-cover rounded-circle shadow-sm"
                                                    style={{ width: '50px', height: '50px' }}
                                                />
                                            </div>

                                            <div className='col-lg-11 col-md-11'>
                                                <p className='fs-5'>
                                                    {feedback.user.firstname + ' ' + feedback.user.lastname}
                                                </p>

                                                <div className="d-flex align-items-center gap-1 mb-2">
                                                    {[...Array(5)].map((_, index) => (
                                                        <FaStar
                                                            key={index}
                                                            className={index < feedback.stars ? 'text-warning' : 'text-secondary'}
                                                        />
                                                    ))}
                                                </div>

                                                <p className='text-muted mb-3'>{formattedDate}</p>

                                                {
                                                    feedback.appearance_rating && (
                                                        <p className='d-flex align-items-center gap-2'>
                                                            <span className="text-muted fw-semibold">
                                                                Appearance:
                                                            </span>
                                                            <p>{feedback.appearance_rating}</p>
                                                        </p>
                                                    )
                                                }

                                                {
                                                    feedback.quality_rating && (
                                                        <p className='d-flex align-items-center gap-2 mb-4'>
                                                            <span className="text-muted fw-semibold">
                                                                Quality:
                                                            </span>
                                                            <p>{feedback.quality_rating}</p>
                                                        </p>
                                                    )
                                                }

                                                <p className='mb-3'>
                                                    {feedback.message}
                                                </p>

                                                <div className="d-flex align-items-center gap-3">
                                                    {
                                                        feedback.images &&
                                                        JSON.parse(feedback.images || '[]').map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={`/storage/${image}`}
                                                                alt={`Preview ${index}`}
                                                                className='object-fit-cover rounded shadow-sm'
                                                                style={{ width: '80px', height: '80px' }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )

                            })
                        ) : (
                            <div className="text-center text-muted fs-5 py-3">
                                <p>No reviews found.</p>
                            </div>
                        )
                    }
                </div>
            </div>



            {/* Feedback Modal */}
            <div class="modal fade" id='feedbackModal' data-bs-backdrop="static" data-bs-keyboard="false">
                <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <form onSubmit={feedbackSubmit}>
                            <div class="modal-body row justify-content-center p-4">
                                <div className='col-md-6'>
                                    <h2 className='text-success'>Feel free <br /> to drop us your <br /> feedback.</h2>

                                    <img
                                        src={feedback}
                                        alt="Image"
                                        className="object-fit-cover"
                                        style={{ width: '350px', height: '350px' }}
                                    />
                                </div>


                                <div className="col-md-6 d-flex flex-column" style={{ maxHeight: '450px', overflowY: 'auto' }}
                                >
                                    <div className="mb-3">
                                        <label htmlFor="title" className="form-label">Feedback Title (optional)</label>
                                        <input
                                            type="text"
                                            className="form-control shadow-sm"
                                            id='title'
                                            value={feedbackData.title}
                                            onChange={(e) => setFeedbackData('title', e.target.value)}
                                        />
                                        {
                                            errorFeedbackData.title && <p className='text-danger mt-2'>{errorFeedbackData.title}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="rating" className="form-label">Overall Rating</label>
                                        <select
                                            className="form-select"
                                            id='rating'
                                            value={feedbackData.stars}
                                            onChange={(e) => setFeedbackData('stars', e.target.value)}
                                        >
                                            <option value="">Select stars</option>
                                            <option value="5">★★★★★ - Excellent</option>
                                            <option value="4">★★★★☆ - Good</option>
                                            <option value="3">★★★☆☆ - Average</option>
                                            <option value="2">★★☆☆☆ - Poor</option>
                                            <option value="1">★☆☆☆☆ - Very Bad</option>
                                        </select>
                                        {
                                            errorFeedbackData.stars && <p className='text-danger mt-2'>{errorFeedbackData.stars}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="appearance" className="form-label">Appearance (optional)</label>
                                        <select
                                            className="form-select"
                                            id='appearance'
                                            value={feedbackData.appearance_rating}
                                            onChange={(e) => setFeedbackData('appearance_rating', e.target.value)}
                                        >
                                            <option value="">Rate appearance</option>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                        {
                                            errorFeedbackData.appearance_rating && <p className='text-danger mt-2'>{errorFeedbackData.appearance_rating}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="quality" className="form-label">Quality (optional)</label>
                                        <select
                                            className="form-select"
                                            id='quality'
                                            value={feedbackData.quality_rating}
                                            onChange={(e) => setFeedbackData('quality_rating', e.target.value)}
                                        >
                                            <option value="">Rate quality</option>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Fair">Fair</option>
                                            <option value="Poor">Poor</option>
                                        </select>
                                        {
                                            errorFeedbackData.quality_rating && <p className='text-danger mt-2'>{errorFeedbackData.quality_rating}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="message" className="form-label">Your Feedback (optional)</label>
                                        <textarea
                                            id='message'
                                            className="form-control shadow-sm"
                                            rows="4"
                                            placeholder="Tell us about your experience..."
                                            value={feedbackData.message}
                                            onChange={(e) => setFeedbackData('message', e.target.value)}
                                        >
                                        </textarea>
                                        {
                                            errorFeedbackData.message && <p className='text-danger mt-2'>{errorFeedbackData.message}</p>
                                        }
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Upload Images (optional)</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            multiple accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <p className="text-muted">You can upload up to 3 images.</p>

                                        {
                                            imagePreview ? (
                                                <div>
                                                    {
                                                        imagePreview.map((image, index) => (
                                                            <img
                                                                key={index}
                                                                src={image}
                                                                alt={`Preview ${index}`}
                                                                className='object-fit-cover rounded shadow-sm me-2 my-3'
                                                                style={{ width: '80px', height: '80px' }}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                            ) : ''
                                        }

                                        {
                                            errorFeedbackData.images && <p className='text-danger mt-2'>{errorFeedbackData.images}</p>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={processingFeedbackData}
                                >
                                    Submit Feedback
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal: Triggered when image selection exceeds 3 */}
            <div className="modal fade" id="maxImagesModal">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-danger text-white">
                            <h5 className="modal-title" id="maxImagesModalLabel">Image Upload Limit</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>You can only upload a maximum of 3 images. Please remove extra images and try again.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">I understand!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

ShowProduct.layout = page => <CustomerLayout children={page} />
export default ShowProduct