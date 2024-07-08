import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Otp = () => {
  const [otp, setOtp] = useState('');
  const { email } = useParams();
  const NavigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`https://localhost:7129/api/Users/Verify/${email}`, {
        Otp: otp
      });

      if(response.status == 200){

        NavigateTo('/')
      }
     
      // Handle success response here
    } catch (error) {
      console.error('Error verifying OTP', error);
      // Handle error response here
    }
  };

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='flex flex-col gap-4 h-auto items-center justify-center shadow-2xl rounded-lg border p-8 border-gray-200'>
        <h2 className='text-2xl font-semibold'>Please Enter your OTP</h2>

        <div className='flex flex-col gap-2'>
          <input
            type="text"
            className='border border-gray-300 outline-none rounded px-2 py-2'
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className='border-none bg-sky-700 text-white rounded-md px-2 py-2 hover:bg-sky-500'
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Otp;
