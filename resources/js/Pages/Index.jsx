import React, { useState, useEffect } from 'react';
import background from '../../../public/assets/images/background.jpg';
import logo from '../../../public/assets/images/logo.png';
import { useRoute } from '../../../vendor/tightenco/ziggy';
import { useForm, usePage } from '@inertiajs/react';

export default function Index() {
    const route = useRoute();
    const { data, setData, post, processing, errors, reset } = useForm({
        username: '',
        password: '',
    });

    function submit(e) {
        e.preventDefault();
        post(route('customer.authentication'), { onSuccess() { reset(); } });
    }

    const { flash } = usePage().props;
    const [showPassword, setShowPassword] = useState(false);
    const [displayText, setDisplayText] = useState('');
    const fullText = "Your non-stop shop for all your flower needs";

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setDisplayText(fullText.substring(0, index + 1));
            index++;
            if (index === fullText.length) clearInterval(interval);
        }, 100);
    }, []);

    return (
        <div
            className="vh-100 position-relative"
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}></div>
            <div className="d-flex justify-content-center align-items-center h-100 position-relative">
                <div className="card shadow-lg rounded-lg border-0 w-100" style={{ maxWidth: '450px' }}>
                    <div className="card-body bg-light px-5 py-3">
                        <form onSubmit={submit}>
                            <div className="text-center mb-2">
                                <img src={logo} alt="logo" className="object-fit-cover" style={{ width: '140px', height: '140px' }} />
                            </div>

                            <h1 className="text-success text-center">EverBloom</h1>
                            <p className="text-muted text-center mb-4">{displayText}</p>

                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input type="text" className="form-control shadow-sm" id="username" value={data.username} onChange={(e) => setData('username', e.target.value)} />
                                {errors.username && <p className='text-danger mt-2'>{errors.username}</p>}
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type={showPassword ? 'text' : 'password'} className="form-control shadow-sm" id="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                                {errors.password && (<p className='text-danger mt-2' style={{ maxWidth: '380px', wordWrap: 'break-word' }}>{errors.password}</p>)}
                            </div>

                            <div className="form-check mb-4">
                                <input className="form-check-input" type="checkbox" id="flexCheckDefault" onClick={() => setShowPassword(!showPassword)} />
                                <label className="form-check-label" htmlFor="flexCheckDefault">Show password</label>
                            </div>

                            <input type="submit" className="btn btn-success w-100 mb-3" disabled={processing} value="Log In" />
                            {flash.error && (<p className='text-danger text-center'>{flash.error}</p>)}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.noLayout = true;