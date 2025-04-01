import React, { useEffect } from 'react'
import CustomerLayout from '../../../Layout/CustomerLayout'
import { useRoute } from '../../../../../vendor/tightenco/ziggy'
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { BsCartFill } from "react-icons/bs";

function ShowProduct({ product }) {
    console.log(product);

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
                        <Link href={route('customer.product')} className="breadcrumb-item text-muted" style={{ textDecoration: 'none' }}>Back</Link>
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
                        <h1 className='text-success mb-3'>{product.product_name}</h1>
                        <div className="d-flex justify-content-between">
                            <div className='d-flex flex-column gap-2'>
                                <h5>Price</h5>
                                <h5>Stock available</h5>
                                <h6 className={`mb-2
                                ${product.status === 'Active' ? 'text-success' : 'text-danger'} 
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
                            <button
                                type='submit'
                                className='btn btn-primary shadow-sm d-flex justify-content-center align-items-center gap-2 w-100'
                                disabled={processing}
                            >
                                <BsCartFill /> Add to cart
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

ShowProduct.layout = page => <CustomerLayout children={page} />
export default ShowProduct