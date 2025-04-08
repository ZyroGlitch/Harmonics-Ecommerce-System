import React from 'react'
import AdminLayout from '../../Layout/AdminLayout'
import { FaPhoneVolume } from "react-icons/fa6";
import { Link } from '@inertiajs/react';
import { IoPeople } from "react-icons/io5";
import { useRoute } from '../../../../vendor/tightenco/ziggy';

function Employee({ employees }) {
    const route = useRoute();

    // console.log(employees);

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h2>
                    <span className='text-success'>{employees.total}</span> Employees
                </h2>
                <Link href={route('admin.addEmployee')} className="btn btn-success shadow-sm d-flex align-items-center gap-2">
                    <IoPeople /> Add Employee
                </Link>
            </div>

            <div className="row">
                {
                    employees.data.length > 0 ? (
                        employees.data.map((employee) => (
                            <div className="col-md-4 mb-4" key={employee.id}>
                                <div className="card shadow rounded border-0">
                                    <div className="card-header bg-light d-flex justify-content-between align-items-start p-3">
                                        <div>
                                            <img src={`/storage/${employee.profile}`} alt="profile" className="object-fit-contain rounded-circle border border-info border-3 mb-3 shadow" style={{ width: '80px', height: '80px' }} />

                                            <h6>{employee.firstname} {employee.lastname}</h6>

                                            <p className='text-muted mb-0'>{employee.role}</p>
                                        </div>


                                        <Link
                                            href={route('admin.viewProfile', { employee_id: employee.id })}
                                            className="btn btn-success"
                                        >
                                            View
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <div className='mb-3'>
                                            <p className="text-muted mb-0">Hired Date</p>
                                            <h6>
                                                {
                                                    new Date(employee.created_at).toLocaleDateString("en-US", { month: "numeric", day: "numeric", year: "2-digit" })
                                                }
                                            </h6>
                                        </div>

                                        <p className='d-flex align-items-center gap-2 mb-0'><FaPhoneVolume /> {employee.phone}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className='text-center fs-4'>No employees available.</p>
                    )
                }
            </div>
        </div>
    )
}

Employee.layout = page => <AdminLayout children={page} />
export default Employee
