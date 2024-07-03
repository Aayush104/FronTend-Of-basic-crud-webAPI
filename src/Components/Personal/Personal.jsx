import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Personal = () => {
const token = Cookies.get("Token")
const [data , setData] = useState([]);



useEffect(()=>{
    const fetchData = async ()=>{
        const response = await axios.get("https://localhost:7129/api/Blog/Personal",{
            headers :{
                Authorization : `Bearer ${token}`
            }
        })



        setData(response.data);
        console.log("Persoanl bata aako data",response.data)
    }
    fetchData()
},[token])


  return (
    <>


    <Navbar />
    
    <div className='flex gap-8 items-center justify-center flex-wrap '>

    {
        data.map((item)=>(
            <div className='p-8 text-center ' key={item.id}>

<img src={item.image} className='w-48'></img>

  <p> {item.title}</p>
  <p> {item.description}</p>

  <NavLink to = {`/Description/${item.id}`} >
            <button className='bg-sky-600 mx-auto text-white rounded-md p-1 mt-2'>View Description</button>
            </NavLink>
</div>


        ))}
      
    </div>
    </>
  )
}

export default Personal
