import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';

const Update = () => {
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [newimage, setNewImage] = useState(null);






    const token = Cookies.get("Token")
    const handleImageChange = (e) => {
        setNewImage(e.target.files[0]);
      };
    
    const { id } = useParams();
  
   // const loggedInID = JSON.parse(atob(token.split('.')[1])).Id;// For to parse The token
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://localhost:7129/api/Blog/Description/${id}`,{
            headers:{
              Authorization :  `bearer ${token}`
            },

         
          });
        

          setTitle(response.data.title);
          setDescription(response.data.description)
          setImage(response.data.image)


          console.log("Fetched data in edit:", response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, [id]);


    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', newimage);

        const response = await axios.post(`https://localhost:7129/api/Blog/Edit/${id}`,formData,
            {
                headers: {
        
          'Content-Type': 'multipart/form-data'
        }
      
    })




    console.log("update response", response.data)

        }
    

  


  return (

    <>  
    <Navbar />
    
      <div className='flex h-100vh items-center justify-center'>
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-400">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
           Description
          </label>
          <textarea
            id="content"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
           value={description}
          
           onChange={(e) => setDescription(e.target.value)}
          
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
           Current Image
          </label>
         <img src={image} className='w-32'></img>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
           New Image
          </label>
          <input
            type="file"
            id="image"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            onChange={handleImageChange}

           
        
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  </div>
  </>

  )
}

export default Update
