import React from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import product from '../../../../public/assets/products/music1.png'
import { Link } from '@inertiajs/react'

function Products() {
    return (
        <div>
            <div className="row">
                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-header bg-light text-center">
                            <img
                                src={product}
                                alt="Image"
                                className="object-fit-contain"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className='text-success'>Product 1</h4>
                            <h5 className='mb-2'>$500</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p>Stock available:</p>
                                <p>100 stocks</p>
                            </div>

                            <Link className='btn btn-primary w-100'>Buy</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-header bg-light text-center">
                            <img
                                src={product}
                                alt="Image"
                                className="object-fit-contain"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className='text-success'>Product 1</h4>
                            <h5 className='mb-2'>$500</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p>Stock available:</p>
                                <p>100 stocks</p>
                            </div>

                            <Link className='btn btn-primary w-100'>Buy</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-header bg-light text-center">
                            <img
                                src={product}
                                alt="Image"
                                className="object-fit-contain"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className='text-success'>Product 1</h4>
                            <h5 className='mb-2'>$500</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p>Stock available:</p>
                                <p>100 stocks</p>
                            </div>

                            <Link className='btn btn-primary w-100'>Buy</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-header bg-light text-center">
                            <img
                                src={product}
                                alt="Image"
                                className="object-fit-contain"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className='text-success'>Product 1</h4>
                            <h5 className='mb-2'>$500</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p>Stock available:</p>
                                <p>100 stocks</p>
                            </div>

                            <Link className='btn btn-primary w-100'>Buy</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-header bg-light text-center">
                            <img
                                src={product}
                                alt="Image"
                                className="object-fit-contain"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className='text-success'>Product 1</h4>
                            <h5 className='mb-2'>$500</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p>Stock available:</p>
                                <p>100 stocks</p>
                            </div>

                            <Link className='btn btn-primary w-100'>Buy</Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 mb-4">
                    <div className="card shadow-sm rounded-lg">
                        <div className="card-header bg-light text-center">
                            <img
                                src={product}
                                alt="Image"
                                className="object-fit-contain"
                                style={{ width: '200px', height: '200px' }}
                            />
                        </div>
                        <div className="card-body">
                            <h4 className='text-success'>Product 1</h4>
                            <h5 className='mb-2'>$500</h5>

                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <p>Stock available:</p>
                                <p>100 stocks</p>
                            </div>

                            <Link className='btn btn-primary w-100'>Buy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

Products.layout = page => <CustomerLayout children={page} />
export default Products