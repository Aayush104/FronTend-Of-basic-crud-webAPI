import axios from 'axios';
import React, { useState } from 'react';
import Cookies from 'js-cookie';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const token = Cookies.get('Token');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post("https://localhost:7129/api/Blog/AddBlog", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error('There was an error uploading the data!', error);
    }
  };

  return (
    <div className='flex h-100vh items-center justify-center'>
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-400">
        <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
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
              Image
            </label>
            <input
              type="file"
              id="image"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              onChange={handleImageChange}
              required
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-40 h-auto object-cover border border-gray-300 rounded-lg "
                />
              </div>
            )}
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
  );
};

export default AddBlog;
