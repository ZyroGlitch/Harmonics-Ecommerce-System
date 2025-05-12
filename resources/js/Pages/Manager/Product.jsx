import ManagerLayout from '../../Layout/ManagerLayout'
import React, { useEffect } from 'react'
import product from '../../../../public/assets/products/music2.png'
import { Link, useForm } from '@inertiajs/react'
import { BsBagFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5"
import { FaEye } from "react-icons/fa6";
import { useRoute } from '../../../../vendor/tightenco/ziggy';

function Product({ products }) {
    console.log(products);

    const route = useRoute();

    const { data, setData, get } = useForm({
        searchByName: '',
        sortByPrice: '',
        sortByStatus: '',
        currentPage: '',
    });


    // useEffect(() => {
    //     const timeoutID = setTimeout(() => {
    //         get(route('admin.product'), {
    //             preserveState: true,
    //             searchByName: data.searchByName,
    //             sortByPrice: data.sortByPrice,
    //             sortByStatus: data.sortByStatus,
    //             page: data.currentPage,
    //         });
    //     }, 300);

    //     return () => clearTimeout(timeoutID);
    // }, [data]);

    return (
        <div className='py-3'>
            <div className="d-flex justify-content-between align-items-center mb-5">
                <input
                    type="text"
                    className="form-control shadow-sm"
                    placeholder='Search product'
                    style={{ width: '300px' }}
                    value={data.searchByName}
                    onChange={e => setData('searchByName', e.target.value)}
                />

                <select
                    class="form-select shadow-sm"
                    style={{ width: '200px' }}
                    value={data.sortByPrice}
                    onChange={e => setData('sortByPrice', e.target.value)}
                >
                    <option value="low price">Less than ₱1,000</option>
                    <option value="mid price">₱1,000 to ₱4,999</option>
                    <option value="high price">₱5,000 and above</option>
                </select>

                <select
                    class="form-select shadow-sm"
                    style={{ width: '200px' }}
                    value={data.sortByStatus}
                    onChange={e => setData('sortByStatus', e.target.value)}
                >
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                </select>

                <Link
                    href={route('admin.addProduct')}
                    className='btn btn-success shadow-sm d-flex align-items-center gap-2'
                >
                    <BsBagFill /> Add Product
                </Link>
            </div>

            <div className="row">
                {
                    products.data.length > 0 ? (
                        products.data.map(product => (
                            <div className="col-md-4 mb-5" key={product.id}>
                                <div className="card shadow rounded w-100">
                                    <div className="card-header text-center position-relative">
                                        <img
                                            src={`/storage/${product.image}`}
                                            alt="Image"
                                            className="object-fit-contain"
                                            style={{ width: '200px', height: '200px' }}
                                        />

                                        <div
                                            className="position-absolute p-2"
                                            style={{ top: '-20px', right: '-15px' }}
                                        >
                                            <span className={`badge shadow-sm fs-6 
                                        ${product.status === 'In Stock' ? 'bg-success' : ''}
                                        ${product.status === 'Low Stock' ? 'bg-warning' : ''}
                                        ${product.status === 'Out of Stock' ? 'bg-danger' : ''}
                                        `}>
                                                {product.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <h3>{product.product_name}</h3>
                                        <h5 className='mb-3'>₱{product.price}</h5>

                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <p>Stock available:</p>
                                            <p>{product.stocks} left</p>
                                        </div>

                                        <Link
                                            href={route('admin.viewProduct', { product_id: product.id })}
                                            className="btn btn-success shadow w-100 d-flex justify-content-center align-items-center gap-2"
                                        >
                                            <FaEye /> View
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <tr>
                            <h3 className="text-center text-muted py-3">
                                No products found.
                            </h3>
                        </tr>
                    )
                }

                {/* <div className="d-flex justify-content-between align-items-center bg-light p-3">
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
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setData('page', new URL(link.url).searchParams.get('page'));
                                        }}
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
                </div> */}
            </div>
        </div>
    )
}

Product.layout = page => <ManagerLayout children={page} />
export default Product