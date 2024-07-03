import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'

const Navbar = () => {

  const navigateTo = useNavigate()
const handleLogout = ()=>{



Cookies.remove('Token');
navigateTo('/')

}

  return (
    <nav className="bg-sky-600 p-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-semibold">
          MyBlog
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
