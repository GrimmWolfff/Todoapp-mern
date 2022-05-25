import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    useEffect(() => {
        if(localStorage.getItem('authToken')) navigate('/');
    }, [])
    const navigate = useNavigate();
    const [Name, setName] = useState<string>('');
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [ConfirmPassword, setConfirmPassword] = useState<string>('');
    const [ShowError, setShowError] = useState<boolean>(false);    
    async function handleSubmit() {
        if(Password !== ConfirmPassword) {
            setShowError(true);
        } else {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: Name,
                    email: Email,
                    password: Password
                })
            })
            if(!response.ok) {
                alert('Invalid credentials or user already exists')
            } else {
                navigate('/')
            }
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
            <h3 className="text-2xl font-bold text-center">Join us</h3>
                <div className="mt-4">
                    <div>
                        <label className="block" htmlFor="Name">Name</label>
                        <input type="text" placeholder="Name" onChange={e => setName(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    </div>

                    <div className="mt-4">
                        <label className="block" htmlFor="email">Email</label>
                        <input type="text" placeholder="Email" onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    </div>

                    <div className="mt-4">
                        <label className="block">Password</label>
                        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    </div>

                    <div className="mt-4">
                        <label className="block">Confirm Password</label>
                        <input type="password" placeholder="Password" onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    </div>

                    <span className={`${ShowError ? '' : 'hidden'} text-xs text-red-400`}>Password must be same!</span>
                    <div className="flex">
                        <button onClick={() => handleSubmit()} 
                        className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create Account</button>
                    </div>

                    <div className="mt-6 text-grey-dark">
                        Already have an account?
                        <a className="text-blue-600 hover:underline" href="#">
                            Log in
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}