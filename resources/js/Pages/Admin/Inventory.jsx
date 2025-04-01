import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'
import { Link } from '@inertiajs/react'
import { FaEye } from "react-icons/fa6";
import image from '../../../../public/assets/flowers/flower1.png'
import { useRoute } from '../../../../vendor/tightenco/ziggy';

function Inventory({ products }) {
    console.log(products);
    const route = useRoute();

    return (
        <div className='py-2'>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>Products</h4>

                <Link href={route('inventory.addProduct')} className='btn btn-success shadow-sm'>New Product</Link>
            </div>

            <div className="card shadow rounded border-0">
                <div className="card-body">
                    <table class="table">
                        <thead className='text-center'>
                            <tr>
                                <th style={{ width: '50px' }}></th>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Stocks</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {
                                products.data.map(product => (
                                    <tr className='align-middle' key={product.id}>
                                        <td style={{ width: '50px' }}>
                                            <div class="form-check d-flex justify-content-center">
                                                <input
                                                    class="form-check-input shadow-sm"
                                                    type="checkbox"
                                                    value={product.id}
                                                />
                                            </div>
                                        </td>
                                        <td className='d-flex align-items-center gap-3'>
                                            <img src={`/storage/${product.image}`} alt="image" className="object-fit-cover" style={{ width: '50px', height: '50px' }} />
                                            {product.product_name}
                                        </td>
                                        <td>₱{product.price}</td>
                                        <td>{product.stocks}</td>
                                        <td className='text-success'>{product.status}</td>
                                        <td>
                                            <Link
                                                href={route('inventory.viewProduct', { product_id: product.id })}
                                                className='btn btn-primary'
                                            ><FaEye /></Link>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
                <div className="card-footer d-flex justify-content-between align-items-center bg-light p-3">
                    <p className='fw-semibold'>{products.to} out of {products.total} Products</p>

                    <div>
                        {
                            products.links.map((link) => (
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
            </div>
        </div>
    )
}

Inventory.layout = page => <AdminLayout children={page} />
export default Inventory
