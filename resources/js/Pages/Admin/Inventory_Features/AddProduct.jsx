import React, { useEffect, useState } from 'react'
import AdminLayout from '../../../Layout/AdminLayout'
import { useRoute } from '../../../../../vendor/tightenco/ziggy/src/js';
import { Link, useForm, usePage } from '@inertiajs/react';
import product from '../../../../../public/assets/images/product.png'
import { toast, Toaster } from 'sonner';

function AddProduct() {
    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        'product_name': '',
        'description': '',
        'price': '',
        'stocks': '',
        'image': ''
    });

    function submit(e) {
        e.preventDefault();

        post(route('inventory.storeProduct'), {
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
                <nav aria-label="breadcrumb" className='mb-3'>
                    <ol class="breadcrumb fw-semibold">
                        <Link href={route('admin.inventory')} className="breadcrumb-item text-muted" style={{ textDecoration: 'none' }}>Back</Link>
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
                                        className="object-fit-cover rounded-lg shadow mb-3"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>
                            ) : (
                                <div className="text-center mb-3">
                                    <img
                                        src={product}
                                        alt="Default Profile"
                                        className="object-fit-cover mb-3"
                                        style={{ width: '200px', height: '200px' }}
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
                            <div className="card-header bg-primary text-light p-3">
                                <p>General Information</p>
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

                                <div className="form-floating mb-3">
                                    <textarea
                                        className={
                                            `form-control shadow-sm ${errors.description ? 'border border-danger' : 'mb-3'}`
                                        }
                                        id="description"
                                        style={{ height: '125px' }}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    ></textarea>
                                    <label htmlFor="description">Description</label>

                                    {
                                        errors.description && <p className='text-danger mt-2'>{errors.description}</p>
                                    }
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
                                            onChange={(e) => setData('stocks', e.target.value)}
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
