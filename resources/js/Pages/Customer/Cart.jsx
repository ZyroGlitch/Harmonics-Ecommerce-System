import React, { useEffect, useState } from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import { FaTrash, FaPenToSquare, FaRegCircleCheck, FaWallet, FaMobileScreen, FaBullhorn, FaCreditCard } from "react-icons/fa6";
import { BsCartFill, BsPersonCircle, BsFillPencilFill } from "react-icons/bs";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { toast, Toaster } from 'sonner';
import paymaya from '../../../../public/assets/images/paymaya.png'
import gcash from '../../../../public/assets/images/gcash.png'
import gcash1 from '../../../../public/assets/images/gcash1.png'
import paymayaQR from '../../../../public/assets/images/paymayaQR.jpg'
import gcashQR from '../../../../public/assets/images/gcashQR.jpg'

function Cart({ carts, total }) {
    // console.log(carts);
    // console.log(total);

    const route = useRoute();

    const [payment, setPayment] = useState('');

    const selectedPayment = (e) => {
        e.preventDefault();
        const paymentSelected = e.target.value;

        setPayment(paymentSelected); // Set the value of useState
        setData('payment_method', paymentSelected); // Set the value of useForm
    }

    const { data, setData, post, processing, errors, reset } = useForm({
        cart_id: carts.data.map(cart => cart.id),
        total: total,
        payment_method: '',
        receipt_reference: '',
        payment_receipt: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('customer.checkout'), {
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

    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    console.log(selectedItems);

    // Handle "Select All" checkbox
    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]); // Deselect all
        } else {
            setSelectedItems(carts.data.map(cart => cart.id)); // Select all id from the active page

            // setSelectedItems(prevSelected => [
            //     ...new Set([...prevSelected, ...carts.data.map(cart => cart.id)])
            // ]); // Select all id from other pagination pages.
        }
        setSelectAll(!selectAll);
    };

    // Handle individual checkbox selection
    const handleSelectItem = (id) => {
        if (selectedItems.includes(id)) {
            setSelectedItems(selectedItems.filter(item => item !== id)); // Remove from selection
        } else {
            setSelectedItems([...selectedItems, id]); // Add to selection
        }
    };

    // Handle deleting the selected cart checkbox
    const deleteSelectedItem = (e) => {
        e.preventDefault();
        router.delete(route('customer.cart_delete', { cart_id: selectedItems }));
    };

    // Use useEffect to trigger toast notifications
    const { flash } = usePage().props

    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
            setSelectAll(false); // uncheck the select all checkbox
        }

        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);


    return (
        <div>
            {/* Initialize the Sooner Toaster */}
            <Toaster position='top-right' expand={true} richColors />

            <form onSubmit={submit}>
                <div className="d-flex gap-3">
                    <div className="flex-grow-1">
                        <div className="card shadow rounded border-0">
                            <div className="card-header bg-success text-light d-flex justify-content-between align-items-center">
                                <h4>Cart</h4>
                                <h4>{carts.total} Items</h4>
                            </div>
                            <div className="card-body">
                                <table class="table">
                                    <thead className='text-center'>
                                        <tr>
                                            <th>
                                                <input
                                                    className="form-check-input shadow-sm"
                                                    type="checkbox"
                                                    checked={selectAll}
                                                    onChange={handleSelectAll}
                                                />
                                            </th>
                                            <th className='text-start'>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Subtotal</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-center'>
                                        {carts.data.length > 0 ? (
                                            carts.data.map((cart) => (
                                                <tr className='align-middle' key={cart.id}>
                                                    <td>
                                                        <input
                                                            className="form-check-input shadow-sm"
                                                            type="checkbox"
                                                            checked={selectedItems.includes(cart.id)}
                                                            onChange={() => handleSelectItem(cart.id)}
                                                        />
                                                    </td>
                                                    <td className='text-start d-flex align-items-center gap-2'>
                                                        <img
                                                            src={`/storage/${cart.product.image}`}
                                                            alt="image"
                                                            className="object-fit-contain"
                                                            style={{ width: '50px', height: '50px' }}
                                                        />
                                                        <p>{cart.product.product_name}</p>
                                                    </td>
                                                    <td>₱{cart.product.price}</td>
                                                    <td>{cart.quantity}</td>
                                                    <td>₱{cart.subtotal}</td>
                                                    <td>
                                                        <div className="d-flex justify-content-center align-items-center gap-3 fs-5">
                                                            <Link className='text-warning'>
                                                                <FaPenToSquare />
                                                            </Link>

                                                            <Link
                                                                href={route('customer.remove_cart', { cart_id: cart.id })}
                                                                className='text-danger'
                                                            >
                                                                <FaTrash />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center text-muted">
                                                    No products in the cart.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>

                                </table>
                            </div>
                            <div className="card-footer d-flex flex-column gap-3 bg-light p-3">
                                <div className="d-flex align-items-center">
                                    <Link
                                        className='btn btn-outline-danger btn-sm shadow-sm d-flex justify-content-center align-items-center gap-1'
                                        onClick={deleteSelectedItem}
                                    >
                                        <FaTrash /> Delete
                                    </Link>
                                </div>


                                <div className="d-flex justify-content-between align-items-center">
                                    <p>{carts.to} out of {carts.total} Products</p>

                                    <div>
                                        {
                                            carts.links.map((link) => (
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
                    </div>
                    <div className="flex-grow-1">
                        <div className="card shadow rounded border-0">
                            <div className="card-body">
                                <h4 className='text-success mb-3'>Order Summary</h4>
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className='fw-bold'>Items</p>
                                    <p>{carts.total} Items</p>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className='fw-bold'>Total</p>
                                    <p>₱{total}</p>
                                </div>

                                <h5 className="text-success">Select Payment Method</h5>
                                <hr className='mb-3' />

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
                                        className={`btn btn-outline-success d-flex justify-content-center align-items-center w-100 gap-2 fw-semibold ${payment === 'Paymaya'
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
                                    {
                                        errors.receipt_reference && (
                                            <p className='text-danger mt-2'>
                                                {errors.receipt_reference}
                                            </p>
                                        )
                                    }
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

                                <button
                                    type='submit'
                                    className='btn btn-primary w-100 shadow d-flex justify-content-center align-items-center gap-2'
                                    disabled={processing}
                                ><BsCartFill /> Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>


            {/* Gcash Modal QR CODE */}
            <div class="modal fade" id="gcash-modal" data-bs-backdrop="static">
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
            <div class="modal fade" id="paymaya-modal" data-bs-backdrop="static">
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
        </div>
    )
}

Cart.layout = page => <CustomerLayout children={page} />
export default Cart