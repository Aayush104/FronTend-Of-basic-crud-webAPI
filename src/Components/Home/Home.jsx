import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'


const Home = () => {
  const [data, setData] = useState([]);

  const token = Cookies.get('Token');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://localhost:7129/api/Blog/GetBlog",{
          headers :{
            Authorization : `Bearer ${token}`
          }
        });
      
        console.log(response.data)
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className='flex gap-4'>
        {data.map((item) => (
          <div className='border border-gray-400 mt-4 p-2 m-4' key={item.Id}>
            <img src={item.image} alt={item.Title} className='w-40'></img>
            <h2 className='text-center'>{item.title}</h2>
            <div className='flex'>

            <NavLink to = {`/Description/${item.id}`} >
            <button className='bg-sky-600 mx-auto text-white rounded-md p-1 mt-2'>View Description</button>
            </NavLink>
             
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
