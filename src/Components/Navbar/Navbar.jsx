import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaSearch } from "react-icons/fa";
import axios from 'axios';

const Navbar = () => {
const [data,setData] = useState('')

  const navigateTo = useNavigate()
const handleLogout = ()=>{



Cookies.remove('Token');
navigateTo('/')

}

const handleSearch = ()=>{

  navigateTo(`/search/${data}`);


}

  return (
    <nav className="bg-sky-600 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          MyBlog
        </div>

        <div className='flex items-center relative'>
          <input type='text' placeholder='Search here' className='border-none rounded-lg px-4 py-2 outline-none' value={data} onChange={(e)=>setData(e.target.value)}></input>


          <FaSearch className='text-sky-600 absolute right-0 mr-4 cursor-pointer' onClick={handleSearch}  />
          

        </div>
        <ul className="flex space-x-4">
          <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>

          <NavLink to= '/AddBlog'>
          <li><a href="#" className="text-white hover:text-gray-300">AddBlog</a></li>
          </NavLink>
       
       <NavLink to = '/Personal'>
       <li><a href="#" className="text-white hover:text-gray-300">Personal Blog</a></li>

       </NavLink>
         
         
         <li><a href="#" className="text-white hover:text-gray-300" onClick={handleLogout}>Logout</a></li>
       
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
