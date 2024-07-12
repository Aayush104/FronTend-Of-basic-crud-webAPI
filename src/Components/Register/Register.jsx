import axios from 'axios';
import React, { useState } from 'react'
import { NavLink, useNavigate} from 'react-router-dom'

const Register = () => {

    const [username,setUsername] = useState("");
    const [password1,setPassword1] = useState("");
    
    const [password2,setPassword2] = useState("");
    const [email,setEmail] = useState("");
     
  const NavigateTo = useNavigate()

const handleSubmit = async (e)=>{

  if(password1 !== password2){
    console.log("Password didn't matched")

  }
    e.preventDefault();

    const response = await axios.post("https://localhost:7129/api/Users/register",{

      userName: username,
      Email: email,
      Password : password1,
      

    })


    console.log(response)

  if(response.status === 200){

NavigateTo (`/otp/${email}`)


  }
}


  return (
    <div className='h-screen w-full flex items-center justify-center bg-gray-100'>
    <div>
      <div className='bg-white py-12 px-12 w-450 rounded-xl shadow-lg flex flex-col gap-2'>
        <h2 className='font-semibold text-4xl text-center text-sky-600'>Register</h2>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium'>User Name</label>
            <input
              type='text'
              className='mt-2 p-3 rounded w-full outline-none border border-solid border-gray-200'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium'>Email</label>
            <input
              type='email'
              className='mt-2 p-3 rounded w-full outline-none border border-solid border-gray-200'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium'>Password</label>
            <input
              type='password'
              className='mt-2 p-3 rounded w-full outline-none border border-solid border-gray-200'
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 font-medium'>Confirm Password</label>
            <input
              type='password'
              className='mt-2 p-3 rounded w-full outline-none border border-solid border-gray-200'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className='flex items-center justify-between flex-col gap-4'>
            <button
              type='submit'
              className='bg-sky-500 text-white py-2 px-8 w-full text-lg mx-auto rounded-md hover:bg-cyan-500'
      
            >
              SignUp
            </button>
          </div>
          <div className='border border-solid border-sky-600 p-2 rounded-2xl text-center'>
            <span> Already have an account?</span>
            <NavLink to='/'>
              <span className='cursor-pointer font-medium text-sky-600 hover:text-cyan-500 capitalize'> SignIn</span>
            </NavLink>

          </div>
          
        </form>
      </div>
    </div>
  </div>
  )
}

export default Register
