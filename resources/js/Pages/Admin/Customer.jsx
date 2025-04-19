import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'
import { useRoute } from '../../../../vendor/tightenco/ziggy';
import profile from '../../../../public/assets/images/profile.png'
import { FaEye, FaPenToSquare } from "react-icons/fa6";
import { Link } from '@inertiajs/react';

function Customer({ customers }) {
    console.log(customers);

    const route = useRoute();

    return (
        <div>
            <div className="card rounded shadow">
                <div className="card-body">
                    <table className="table align-middle">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th className='text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.data.map((customer) => (
                                <tr key={customer.id}>
                                    <td className="align-middle">
                                        <div className="d-flex align-items-center gap-3">
                                            <img
                                                src={customer.profile ? `/storage/${customer.profile}` : profile}
                                                alt="profile"
                                                className="rounded-circle object-fit-cover shadow-sm"
                                                style={{ width: '45px', height: '45px' }}
                                            />
                                            <span>{customer.firstname + ' ' + customer.lastname}</span>
                                        </div>
                                    </td>
                                    <td className="align-middle">{customer.email}</td>
                                    <td className="align-middle">{customer.phone}</td>
                                    <td className="align-middle">{customer.address}</td>
                                    <td className="align-middle text-center">
                                        <button className="btn btn-primary btn-sm">
                                            <FaEye />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="card-footer d-flex justify-content-between align-items-center p-3">
                    <p>Showing {customers.to} out of {customers.total} Products</p>

                    <div>
                        {
                            customers.links.map((link) => (
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

Customer.layout = page => <AdminLayout children={page} />
export default Customer