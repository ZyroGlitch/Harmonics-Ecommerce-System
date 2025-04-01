import React, { useEffect } from 'react'
import AdminLayout from '../../../Layout/AdminLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../../../vendor/tightenco/ziggy';
import { Toaster, toast } from 'sonner';

function ViewProduct({ products }) {
    console.log(products);

    const route = useRoute();

    const { data, setData, post, processing, errors, reset } = useForm({
        'id': products.id,
        'product_name': products.product_name,
        'description': products.description,
        'price': products.price,
        'stocks': products.stocks,
    });

    function submit(e) {
        e.preventDefault();

        post(route('inventory.updateProduct'), {
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
        <div>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' expand={true} richColors />

            <form onSubmit={submit}>
                <nav aria-label="breadcrumb" className='mb-5'>
                    <ol class="breadcrumb fw-semibold">
                        <Link href={route('admin.inventory')} className="breadcrumb-item text-muted" style={{ textDecoration: 'none' }}>Back</Link>
                        <li className="breadcrumb-item active text-success" aria-current="page">{products.product_name}</li>
                    </ol>
                </nav>

                <div className="row gap-3" style={{ marginBottom: '125px' }}>
                    <div className="col-md-5 text-center">
                        <img
                            src={`/storage/${products.image}`}
                            alt="product"
                            className="object-fit-contain"
                            style={{ width: '350px', height: '350px' }}
                        />
                    </div>

                    <div className='col-md-5'>
                        <h1 className='text-success mb-3'>{products.product_name}</h1>
                        <div className="d-flex justify-content-between">
                            <div className='d-flex flex-column gap-2'>
                                <h5>Price</h5>
                                <h5>Stock available</h5>
                                <h6 className={`mb-2
                                ${products.status === 'Active' ? 'text-success' : 'text-danger'} 
                            `}>{products.status}</h6>
                            </div>
                            <div className='d-flex flex-column gap-2'>
                                <p>₱{products.price}</p>
                                <p>{products.stocks} stocks left</p>
                            </div>
                        </div>
                        <hr />
                        <h5>Description</h5>
                        <p>{products.description}</p>
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

ViewProduct.layout = page => <AdminLayout children={page} />
export default ViewProduct
