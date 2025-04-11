import React, { useEffect, useState } from 'react'
import CustomerLayout from '../../Layout/CustomerLayout'
import { Link, router, useForm, usePage } from '@inertiajs/react'
import { FaTrash, FaPenToSquare, FaRegCircleCheck } from "react-icons/fa6";
import { BsCartFill } from "react-icons/bs";
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import { toast, Toaster } from 'sonner';

function Cart({ carts, total }) {
    // console.log(carts);
    // console.log(total);

    const route = useRoute();

    const { data, setData, post, processing, reset } = useForm({
        cart_id: carts.data.map(cart => cart.id),
        total: total,
        cash_received: '0',
    });

    function submit(e) {
        e.preventDefault();
        post(route('customer.checkout'), {
            onSuccess() {
                reset();
            }
        });
    }

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
                                <div className="d-flex justify-content-between align-items-center mb-2">
                                    <p className='fw-bold'>Total</p>
                                    <p>₱{total}</p>
                                </div>
                                <hr />

                                <div className="mb-4">
                                    <label htmlFor="cash" className="form-label text-dark fw-bold mb-2">Cash received</label>
                                    <input
                                        type="number"
                                        className="form-control shadow-sm"
                                        id='cash'
                                        min='0'
                                        value={data.cash_received}
                                        onChange={(e) => setData('cash_received', e.target.value)}
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <p className='fw-bold'>Change</p>
                                    <p>₱{data.cash_received - total}</p>
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
        </div>
    )
}

Cart.layout = page => <CustomerLayout children={page} />
export default Cart