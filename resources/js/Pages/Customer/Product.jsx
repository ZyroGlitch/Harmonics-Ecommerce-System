import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import { Link } from '@inertiajs/react';
import { useRoute } from '../../../../vendor/tightenco/ziggy';

function Product({ products }) {
    console.log(products);

    const route = useRoute();

    return (
        <div className='py-2'>
            <div className="row">
                {
                    products.data.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card shadow rounded border-0">
                                <div className="card-header bg-light text-center">
                                    <img src={`/storage/${product.image}`} alt="image" className="object-fit-contain" style={{ width: '180px', height: '180px' }} />
                                </div>
                                <div className="card-body bg-success text-light">
                                    <h4>{product.product_name}</h4>
                                    <h5>₱{product.price}</h5>
                                    <p className='mb-3'>{product.stocks} stocks available</p>
                                    <div className="d-flex align-items-stretch gap-3">
                                        <Link
                                            href={route('customer.showProduct', { product_id: product.id })}
                                            className="btn btn-dark shadow w-100"
                                        >Buy</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>

            <div className="d-flex justify-content-between align-items-center bg-light p-3">
                <p className='fw-semibold'>{products.to} out of {products.total} Products</p>

                <div>
                    {
                        products.links.map((link) => (
                            link.url ?
                                <Link
                                    key={link.label}
                                    href={link.url}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                    className={`btn btn-sm me-3 ${link.active ? 'btn-dark' : 'btn-outline-dark'}`}
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
        </div>
    )
}

Product.layout = page => <CustomerLayout children={page} />
export default Product