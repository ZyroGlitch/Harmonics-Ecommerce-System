import React, { useEffect } from 'react'
import AdminLayout from '../../../Layout/AdminLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { useRoute } from '../../../../../vendor/tightenco/ziggy';
import ManagerLayout from '../../../Layout/ManagerLayout';

function ViewProduct({ product }) {
    console.log(product);

    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        product_name: product.product_name,
        description: product.description,
        category: product.category,
        price: product.price,
        stocks: product.stocks,
    });

    function submit(e) {
        e.preventDefault();

        post(route('manager.updateProduct'), {
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

    function cancelUpdateProduct(e) {
        e.preventDefault();
        reset();
    }

    return (
        <div className='py-3'>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' richColors closeButton />

            <form onSubmit={submit}>
                <nav aria-label="breadcrumb" className='mb-5'>
                    <ol class="breadcrumb fw-semibold">
                        <Link
                            href={route('manager.product')}
                            className="breadcrumb-item text-muted"
                            style={{ textDecoration: 'none' }}
                        >Back</Link>

                        <li className="breadcrumb-item active text-success" aria-current="page">{product.product_name}</li>
                    </ol>
                </nav>

                <div className="row align-items-center gap-3"
                    style={{ height: '60vh', marginBottom: '80px' }}
                >
                    <div className="col-md-5 text-center">
                        <img
                            src={`/storage/${product.image}`}
                            alt="product"
                            className="object-fit-contain"
                            style={{ width: '350px', height: '350px' }}
                        />
                    </div>

                    <div className='col-md-5'>
                        <h1 className='text-success mb-3'>{product.product_name}</h1>
                        <div className="d-flex justify-content-between">
                            <div className='d-flex flex-column gap-2'>

                                <h5>Price</h5>
                                <h5>Stock available</h5>
                                <h6 className={`mb-2
                                ${product.status === 'In Stock' ? 'text-success' : ''} 
                                ${product.status === 'Low of Stock' ? 'text-warning' : ''} 
                                ${product.status === 'Out of Stock' ? 'text-danger' : ''} 
                            `}
                                >{product.status}
                                </h6>
                            </div>
                            <div className='d-flex flex-column gap-2'>
                                <p>₱{product.price}</p>
                                <p>{product.stocks} stocks left</p>
                            </div>
                        </div>
                        <hr />
                        <h5>Description</h5>
                        <p>{product.description}</p>
                    </div>
                </div>

                <div className="row justify-content-between mb-4">
                    <div className="col-md-6">
                        <div className="card shadow rounded-lg border-0 bg-light">
                            <div className="card-body">
                                <h5 className='mb-3'>General Information</h5>

                                <div className="mb-3">
                                    <label htmlFor="product_name" className="form-label">Name Product</label>
                                    <input
                                        type="text"
                                        className={
                                            `form-control shadow-sm ${errors.product_name ? 'border border-danger' : ''}`
                                        }
                                        id='product_name'
                                        value={data.product_name}
                                        onChange={(e) => setData('product_name', e.target.value)}
                                    />

                                    {
                                        errors.product_name && (
                                            <div className="text-danger mt-2">{errors.product_name}</div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Product Description</label>
                                    <textarea
                                        className={
                                            `form-control shadow-sm ${errors.description ? 'border border-danger' : ''}`
                                        }
                                        id="description"
                                        style={{ height: '150px' }}
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                    ></textarea>

                                    {
                                        errors.description && (
                                            <div className="text-danger mt-2">{errors.description}</div>
                                        )
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
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card shadow rounded-lg border-0 bg-light">
                            <div className="card-body">
                                <h5 className='mb-3'>Pricing And Stock</h5>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">Base Pricing</label>
                                    <input
                                        type="number"
                                        className={
                                            `form-control shadow-sm ${errors.price ? 'border border-danger' : ''}`
                                        }
                                        id='price'
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                    />

                                    {
                                        errors.price && (
                                            <div className="text-danger mt-2">{errors.price}</div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="stocks" className="form-label">Stock</label>
                                    <input
                                        type="number"
                                        className={
                                            `form-control shadow-sm ${errors.stocks ? 'border border-danger' : ''}`
                                        }
                                        id='stocks'
                                        min='0'
                                        value={data.stocks}
                                        onChange={(e) => setData('stocks', e.target.value)}
                                    />

                                    {
                                        errors.stocks && (
                                            <div className="text-danger mt-2">{errors.stocks}</div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                    <Link
                        className='btn btn-outline-secondary shadow-sm'
                        onClick={cancelUpdateProduct}
                    >Cancel</Link>

                    <input
                        type="submit"
                        className="btn btn-success shadow-sm"
                        value='Update product'
                        disabled={processing}
                    />
                </div>
            </form>
        </div>
    )
}

ViewProduct.layout = page => <ManagerLayout children={page} />
export default ViewProduct
