import React, { useEffect } from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import product from '../../../../public/assets/products/music1.png'
import { Link, useForm } from '@inertiajs/react'
import { FaStar } from "react-icons/fa6";

function Products({ products }) {
    console.log(products);

    const { data, setData, get } = useForm({
        searchByName: '',
        sortByPrice: '',
        sortByStatus: '',
        sortByRatings: '',
    });


    useEffect(() => {
        const timeoutID = setTimeout(() => {
            get(route('customer.dashboard'), {
                preserveState: true,
                searchByName: data.searchByName,
                sortByPrice: data.sortByPrice,
                sortByStatus: data.sortByStatus,
                sortByRatings: data.sortByRatings,
            });
        }, 300);

        return () => clearTimeout(timeoutID);
    }, [data]);

    return (
        <div className='py-3'>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="d-flex flex-column gap-2">
                    <label htmlFor="search" className="form-label">Product name</label>

                    <input
                        type="text"
                        className="form-control shadow shadow-sm"
                        placeholder='Search product'
                        id='search'
                        style={{ width: '300px' }}
                        value={data.searchByName}
                        onChange={e => setData('searchByName', e.target.value)}
                    />
                </div>

                <div className="d-flex flex-column gap-2">
                    <label htmlFor="price" className="form-label">Sort by price</label>

                    <select
                        class="form-select shadow-sm"
                        style={{ width: '200px' }}
                        id='price'
                        value={data.sortByPrice}
                        onChange={e => setData('sortByPrice', e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="low price">Less than ₱1,000</option>
                        <option value="mid price">₱1,000 to ₱4,999</option>
                        <option value="high price">₱5,000 and above</option>
                    </select>
                </div>

                <div className="d-flex flex-column gap-2">
                    <label htmlFor="stock" className="form-label">Sort by stocks</label>

                    <select
                        class="form-select shadow-sm"
                        style={{ width: '200px' }}
                        id='stock'
                        value={data.sortByStatus}
                        onChange={e => setData('sortByStatus', e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="In Stock">In Stock</option>
                        <option value="Low of Stock">Low of Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                    </select>
                </div>

                <div className="d-flex flex-column gap-2">
                    <label htmlFor="ratings" className="form-label">Sort by ratings</label>

                    <select
                        class="form-select shadow-sm"
                        style={{ width: '200px' }}
                        id='ratings'
                        value={data.sortByRatings}
                        onChange={e => setData('sortByRatings', e.target.value)}
                    >
                        <option value="All">All</option>
                        <option value="5 Stars">5 Stars</option>
                        <option value="4 Stars">4 Stars</option>
                        <option value="3 Stars">3 Stars</option>
                        <option value="2 Stars">2 Stars</option>
                        <option value="1 Stars">1 Stars</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {
                    products.data.map(product => (
                        <div className="col-md-4 mb-4" key={product.id}>
                            <div className="card shadow-sm rounded-lg">
                                <div className="card-header bg-light text-center">
                                    <img
                                        src={`/storage/${product.image}`}
                                        alt="Image"
                                        className="object-fit-contain"
                                        style={{ width: '200px', height: '200px' }}
                                    />
                                </div>
                                <div className="card-body">
                                    <h4 className='text-success'>{product.product_name}</h4>
                                    <h5 className='mb-2'>₱{product.price}</h5>

                                    <div className="d-flex justify-content-between align-items-center mb-3">
                                        <p>Stock available:</p>
                                        <p>{product.stocks} stocks</p>
                                    </div>

                                    <div className="d-flex align-items-center gap-2 mb-3">
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        <FaStar className='text-warning' />
                                        (300)
                                    </div>

                                    {
                                        product.status === 'Out of Stock' ? (
                                            <button className='btn btn-secondary w-100' disabled>Out of Stock</button>
                                        ) : (
                                            <Link
                                                href={route('customer.showProduct', { product_id: product.id })}
                                                className='btn btn-primary w-100'
                                            >Buy</Link>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

Products.layout = page => <CustomerLayout children={page} />
export default Products