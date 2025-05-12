import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Layout/AdminLayout'
import { useRoute } from '../../../../../vendor/tightenco/ziggy/src/js';
import { Link, useForm, usePage } from '@inertiajs/react';
import product from '../../../../../public/assets/images/product.png'
import { toast, Toaster } from 'sonner';
import { FaCircleInfo } from "react-icons/fa6";

function AddProduct() {
    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        product_name: '',
        description: '',
        category: 'Music',
        price: '',
        stocks: '',
        status: '',
        image: '',
    });

    function submit(e) {
        e.preventDefault();

        post(route('admin.storeProduct'), {
            onSuccess() {
                reset();

                setData('image', 'null');
                setImagePreview(null);
            }
        });
    }

    // State for image preview
    const [imagePreview, setImagePreview] = useState(null);

    // Handle file selection and set image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file); // Set the file to the Inertia form

        if (file) {
            setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        } else {
            setImagePreview(null); // Reset preview if no file is selected
        }
    };

    // Set the product status
    const handleProductStatus = (e) => {
        const stocks = e.target.value;

        if (stocks > 20) {
            setData('status', 'In Stock'); // Set the status to Available

        } else if (stocks > 0 && stocks <= 20) {
            setData('status', 'Low Stock'); // Set the status to Low Stock

        } else {
            setData('status', 'Out of Stock'); // Set the status to Out of Stock
        }
    };


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

            <form onSubmit={submit}>
                <nav aria-label="breadcrumb" className='mb-4'>
                    <ol class="breadcrumb fw-semibold">
                        <Link
                            href={route('admin.product')}
                            className="breadcrumb-item text-muted"
                            style={{ textDecoration: 'none' }}
                        >
                            Back
                        </Link>
                        <li class="breadcrumb-item active text-success" aria-current="page">New Product</li>
                    </ol>
                </nav>

                <div className="row justify-content-evenly">
                    <div className="col-md-4 d-flex flex-column align-items-center">
                        {/* Image Preview */}
                        {
                            imagePreview ? (
                                <div className="text-center mb-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview Image"
                                        className="object-fit-contain rounded-lg shadow mb-3"
                                        style={{ width: '250px', height: '250px' }}
                                    />
                                </div>
                            ) : (
                                <div className="text-center mb-3">
                                    <img
                                        src={product}
                                        alt="Default Profile"
                                        className="object-fit-cover mb-3"
                                        style={{ width: '250px', height: '250px' }}
                                    />
                                </div>
                            )
                        }

                        <input
                            type="file"
                            className="form-control"
                            onChange={handleImageChange}
                        />

                        {
                            errors.image && (
                                <div className="text-danger mt-2">{errors.image}</div>
                            )
                        }
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow rounded border-0">
                            <div className="card-header bg-success text-light p-3">
                                <h5 className='d-flex align-items-center gap-2'><FaCircleInfo /> Product Information</h5>
                            </div>
                            <div className="card-body bg-light">

                                <div className='mb-3'>
                                    <label htmlFor="product_name" className="form-label">Product Name</label>
                                    <input
                                        type="text"
                                        className={
                                            `form-control shadow-sm ${errors.product_name ? 'border border-danger' : 'mb-3'}`
                                        }
                                        id='product_name'
                                        value={data.product_name}
                                        onChange={(e) => setData('product_name', e.target.value)}
                                    />

                                    {
                                        errors.product_name && <p className='text-danger mt-2'>{errors.product_name}</p>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className='form-label'>Description</label>
                                    <textarea
                                        className={
                                            `form-control shadow-sm ${errors.description ? 'border border-danger' : 'mb-3'}`
                                        }
                                        id="description"
                                        style={{ height: '125px' }}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    ></textarea>
                                    {
                                        errors.description && <p className='text-danger mt-2'>{errors.description}</p>
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="category" className="form-label">Category</label>
                                    <select
                                        class="form-select shadow-sm"
                                        id='category'
                                        value={data.category}
                                        onChange={(e) => setData('category', e.target.value)}
                                    >
                                        <option value="Music">Music</option>
                                        <option value="Sport">Sport</option>
                                        <option value="Gym">Gym</option>
                                    </select>
                                </div>

                                <div className='d-flex align-items-center gap-3 mb-4'>
                                    <div className="w-100">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input
                                            type="number"
                                            className={
                                                `form-control shadow-sm ${errors.price ? 'border border-danger' : 'mb-3'}`
                                            }
                                            id='price'
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                        />

                                        {
                                            errors.price && <p className='text-danger mt-2'>{errors.price}</p>
                                        }
                                    </div>

                                    <div className="w-100">
                                        <label htmlFor="stocks" className="form-label">Stocks</label>
                                        <input
                                            type="number"
                                            className={
                                                `form-control shadow-sm ${errors.stocks ? 'border border-danger' : 'mb-3'}`
                                            }
                                            id='stocks'
                                            value={data.stocks}
                                            onChange={(e) => {
                                                setData('stocks', e.target.value);
                                                handleProductStatus(e);
                                            }}
                                        />

                                        {
                                            errors.stocks && <p className='text-danger mt-2'>{errors.stocks}</p>
                                        }
                                    </div>
                                </div>

                                <input type="submit" value='Add' className="btn btn-success shadow w-100 mb-2" disabled={processing} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

AddProduct.layout = page => <AdminLayout children={page} />
export default AddProduct