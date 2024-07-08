import axios from 'axios';
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigateTo = useNavigate();

    



    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("https://localhost:7129/api/Users/login", {
                username,
                password
            });


            const tokenValue = response.data.token;
            const validity = JSON.parse(atob(tokenValue.split('.')[1])).validity

            console.log(validity)
            if (response.status === 200 && validity == "True") {
               
                Cookies.set('Token', tokenValue, { expires: 7 });

                const loggedInID = JSON.parse(atob(tokenValue.split('.')[1])).Role;

                if (loggedInID === "Admin") {
                    navigateTo('/Admin');
                } else {
                    navigateTo('/home');
                }
            }
        } catch (error) {
            console.error('Error logging in', error);
        }
    }

    return (
        <div className='flex items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white py-12 px-12 w-450 rounded-xl shadow-lg flex flex-col gap-10'>
                <h2 className='font-semibold text-4xl text-center text-pretty text-sky-600'>Login</h2>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-medium'>Username</label>
                        <input
                            type='text'
                            className='mt-2 p-4 rounded w-full outline-none border border-solid border-gray-300'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 font-medium'>Password</label>
                        <input
                            type='password'
                            className='mt-2 p-4 rounded w-full outline-none border border-solid border-gray-300'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='flex items-center justify-between flex-col gap-4'>
                        <button
                            type='submit'
                            className={`bg-sky-500 text-white py-2 px-8 w-full text-lg mx-auto rounded-md hover:bg-cyan-500`}
                        >
                            Sign In
                        </button>
                        <p className='cursor-pointer hover:text-cyan-500 capitalize font-medium'>Forgot password?</p>
                    </div>
                    <div className='border border-solid border-sky-600 p-2 rounded-2xl text-center'>
                        <span> Don't have an account?</span>
                        <NavLink to="/register">
                            <span className='cursor-pointer font-medium text-sky-600 hover:text-cyan-500 capitalize'> Sign Up</span>
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
