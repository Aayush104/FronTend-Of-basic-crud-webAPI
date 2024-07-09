import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

const Search = () => {
    const [data, setData] = useState([])
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post(`https://localhost:7129/api/Blog/Search/${id}`)
                setData(response.data)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [id])

    return (
        <div>
            <Navbar />
            <div>
                {data.length > 0 ? (
                    data.map((item) => (
                        <div className='flex gap-8  ' key={item.id}>
                            <div className=''>
                                <img src={item.image} alt={item.title} className='w-40' />
                                <h2 className='text-center'>{item.title}</h2>
                                <div className='flex'>
                                    <NavLink to={`/Description/${item.id}`}>
                                        <button className='bg-sky-600 mx-auto text-white rounded-md p-1 mt-2'>
                                            View Description
                                        </button>
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    )
}

export default Search
