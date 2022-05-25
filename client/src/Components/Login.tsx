import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
    useEffect(() => {
        if(localStorage.getItem('authToken')) navigate('/');
    }, [])

    const navigate = useNavigate();
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    async function handleSubmit() {
        const config = {
            headers: {'Content-Type':'application/json'}
        }
        try {
            const { data } = await axios.post("http://localhost:5000/api/auth/login", { email: Email, password: Password }, config)
            localStorage.setItem('authToken', data.token)
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
                <h3 className="text-2xl font-bold text-center">Join us</h3>
                <div className="mt-4">
                    <div>
                        <label className="block" htmlFor="Email">Email</label>
                        <input type="text" placeholder="email" onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    </div>
                    <div className="mt-4">
                        <label className="block" htmlFor="Password">Password</label>
                        <input type="text" placeholder="Password" onChange={e => setPassword(e.target.value)}
                        className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                    </div>
                    <div className="flex">
                        <button onClick={() => handleSubmit()} 
                        className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Log In</button>
                    </div>
                </div>
            </div>
        </div>
    );
}