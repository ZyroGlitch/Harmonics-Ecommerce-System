import React, { useEffect, useState } from 'react'
import CustomerLayout from '../../../Layout/CustomerLayout'
import { FaWallet, FaMobileScreen, FaBullhorn, FaCreditCard } from "react-icons/fa6";
import paymaya from '../../../../../public/assets/images/paymaya.png'
import gcash from '../../../../../public/assets/images/gcash.png'
import gcash1 from '../../../../../public/assets/images/gcash1.png'
import paymayaQR from '../../../../../public/assets/images/paymayaQR.jpg'
import gcashQR from '../../../../../public/assets/images/gcashQR.jpg'
import { BsPersonCircle, BsFillPencilFill } from "react-icons/bs";
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRoute } from '../../../../../vendor/tightenco/ziggy';
import { toast, Toaster } from 'sonner';

function BuyProduct({ product, quantity }) {

    const route = useRoute();

    const [payment, setPayment] = useState('');

    const selectedPayment = (e) => {
        e.preventDefault();
        const paymentSelected = e.target.value;

        setPayment(paymentSelected); // Set the value of useState
        setData('payment_method', paymentSelected); // Set the value of useForm
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        product_id: product.id,
        quantity: quantity,
        total: (product.price * quantity).toFixed(2),
        payment_method: '',
        receipt_reference: '',
        payment_receipt: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('customer.directProductOrder'), {
            onSuccess() {
                reset();
                setPayment(null); // Reset the selected payment
            }
        });
    }

    // Handle file selection and set image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('payment_receipt', file); // Set the file to the Inertia form
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
                            href={route('customer.showProduct', { product_id: product.id })}
                            className="breadcrumb-item text-muted"
                            style={{ textDecoration: 'none' }}
                        >Back</Link>

                        <li className="breadcrumb-item active text-success" aria-current="page">Buy {product.product_name}</li>
                    </ol>
                </nav>

                <div className="row justify-content-between">
                    <div className="col-md-6 text-center">
                        <img
                            src={`/storage/${product.image}`}
                            alt="product"
                            className="object-fit-contain"
                            style={{ width: '400px', height: '400px' }}
                        />
                    </div>

                    <div className="col-md-6">
                        <div className="card shadow-sm rounded">
                            <div className="card-body">
                                <h2 className='text-success mb-4'>{product.product_name}</h2>

                                <div className="d-flex flex-column gap-2 mb-4">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className='text-muted'>Price</h6>
                                        <p>₱{product.price}</p>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className='text-muted'>Quantity</h6>
                                        <p>x {quantity}</p>
                                    </div>

                                    <div className="d-flex justify-content-between align-items-center">
                                        <h6 className='text-muted'>Subtotal</h6>
                                        <p>₱{(product.price * quantity).toFixed(2)}</p>
                                    </div>
                                </div>

                                <h5 className='d-flex align-items-center gap-2 text-success'><FaWallet /> Select Payment Method</h5>
                                <hr />

                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <button
                                        className={`btn btn-outline-primary d-flex justify-content-center align-items-center w-100 gap-2 fw-semibold ${payment === 'Gcash'
                                            ? 'btn-primary text-light'
                                            : 'btn-outline-primary'
                                            }`}
                                        data-bs-toggle="modal"
                                        data-bs-target="#gcash-modal"
                                        value='Gcash'
                                        onClick={selectedPayment}
                                    >
                                        <img
                                            src={`${payment === 'Gcash' ? gcash1 : gcash}`}
                                            alt="icon"
                                            className="object-fit-contain"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        Gcash
                                    </button>

                                    <button
                                        className={`btn btn-outline-primary d-flex justify-content-center align-items-center w-100 gap-2 fw-semibold ${payment === 'Paymaya'
                                            ? 'btn-success text-light'
                                            : 'btn-outline-success'
                                            }`}
                                        data-bs-toggle="modal"
                                        data-bs-target="#paymaya-modal"
                                        value='Paymaya'
                                        onClick={selectedPayment}
                                    >
                                        <img
                                            src={paymaya}
                                            alt="icon"
                                            className="object-fit-contain"
                                            style={{ width: '30px', height: '30px' }}
                                        />
                                        Paymaya
                                    </button>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="referrence" className="form-label">Referrence Number</label>
                                    <input
                                        type="text"
                                        className="form-control shadow-sm"
                                        id='referrence'
                                        placeholder='e.g 9289713240'
                                        value={data.receipt_reference}
                                        onChange={e => setData('receipt_reference', e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="receipt" className="form-label">Upload Receipt</label>
                                    <input
                                        type="file"
                                        className="form-control shadow-sm"
                                        id='receipt'
                                        onChange={handleImageChange}
                                    />
                                </div>

                                <div className="d-grid">
                                    <button
                                        type='submit'
                                        className='btn btn-outline-success shadow-sm d-flex justify-content-center align-items-center gap-2'
                                        disabled={processing}
                                    >
                                        <FaCreditCard /> Pay Order
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* Gcash Modal QR CODE */}
                <div class="modal fade" id="gcash-modal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header bg-primary">
                                <h1 class="modal-title fs-5 text-light d-flex align-items-center gap-1">
                                    <img
                                        src={gcash1}
                                        alt="icon"
                                        className="object-fit-contain"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    Gcash QR Code
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex gap-5 p-4 bg-light">
                                <img
                                    src={gcashQR}
                                    alt="Gcash QR Code"
                                    className="object-fit-contain border border-2 rounded shadow"
                                    style={{ width: '350px', height: '500px' }}
                                />

                                <div className='w-100'>
                                    <h5 className='text-primary'>Gcash Payment Information</h5>
                                    <hr />

                                    <div className="mb-3">
                                        <p className="d-flex align-items-center fs-5 gap-2 fw-semibold">
                                            <BsPersonCircle /> Gcash Name
                                        </p>
                                        <p className='fs-6'>John Ford Buliag</p>
                                    </div>

                                    <div className="mb-5">
                                        <p className="d-flex align-items-center fs-5 gap-2 fw-semibold">
                                            <FaMobileScreen /> Gcash Number
                                        </p>
                                        <p className='fs-6'>09615607681</p>
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <h5 className="d-flex align-items-center gap-2"><FaBullhorn /> Reminders</h5>

                                        <div className="d-flex gap-2">
                                            <BsFillPencilFill style={{ fontSize: '26px' }} />
                                            <p>Check the GCash payment details carefully before sending.</p>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <BsFillPencilFill style={{ fontSize: '18px' }} />
                                            <p>Take a screenshot of the GCash receipt.</p>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <BsFillPencilFill style={{ fontSize: '36px' }} />
                                            <p>Provide us with the transaction reference number and upload the receipt image.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Paymaya Modal QR CODE */}
                <div class="modal fade" id="paymaya-modal">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header bg-success">
                                <h1 class="modal-title fs-5 text-light d-flex align-items-center gap-1">
                                    <img
                                        src={paymaya}
                                        alt="icon"
                                        className="object-fit-contain"
                                        style={{ width: '40px', height: '40px' }}
                                    />
                                    Paymaya QR Code
                                </h1>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body d-flex gap-5 p-4 bg-light">
                                <img
                                    src={paymayaQR}
                                    alt="Gcash QR Code"
                                    className="object-fit-cover border border-2 rounded shadow-sm"
                                    style={{ width: '350px', height: '500px' }}
                                />

                                <div className='w-100'>
                                    <h5 className='text-success'>Paymaya Payment Information</h5>
                                    <hr />

                                    <div className="mb-3">
                                        <p className="d-flex align-items-center fs-5 gap-2 fw-semibold">
                                            <BsPersonCircle /> Paymaya Name
                                        </p>
                                        <p className='fs-6'>John Ford Buliag</p>
                                    </div>

                                    <div className="mb-5">
                                        <p className="d-flex align-items-center fs-5 gap-2 fw-semibold">
                                            <FaMobileScreen /> Paymaya Number
                                        </p>
                                        <p className='fs-6'>09615607681</p>
                                    </div>

                                    <div className="d-flex flex-column gap-2 mb-3">
                                        <h5 className="d-flex align-items-center gap-2"><FaBullhorn /> Reminders</h5>

                                        <div className="d-flex gap-2">
                                            <BsFillPencilFill style={{ fontSize: '26px' }} />
                                            <p>Check the Paymaya payment details carefully before sending.</p>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <BsFillPencilFill style={{ fontSize: '18px' }} />
                                            <p>Take a screenshot of the Paymaya receipt.</p>
                                        </div>

                                        <div className="d-flex gap-2">
                                            <BsFillPencilFill style={{ fontSize: '36px' }} />
                                            <p>Provide us with the transaction reference number and upload the receipt image.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

BuyProduct.layout = page => <CustomerLayout children={page} />
export default BuyProduct