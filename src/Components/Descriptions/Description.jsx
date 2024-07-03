import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Cookies from 'js-cookie';
import Navbar from '../Navbar/Navbar';

const Transition = React.forwardRef(function Transition(
  props,
  ref
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Description = () => {
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);


  const navigateTo = useNavigate()
  const token = Cookies.get('Token');
  const { id } = useParams();

  const loggedInID = JSON.parse(atob(token.split('.')[1])).Id;/// yo reqct bata yoken  lai decode garney tarika

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7129/api/Blog/Description/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        setData(response.data);
        console.log('Fetched data:', response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id, token]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
   const response = await axios.delete(`https://localhost:7129/api/Blog/Delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
     
      if(response.status == 200){
navigateTo('/Personal')
      }
      setOpen(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  return (
    <div>
      <Navbar />
      {data ? (
        <div className='p-8'>
          <img src={data.image} className='w-48' alt='Blog' />
          <p>{data.title}</p>
          <p>{data.description}</p>
          {loggedInID === data.loginId && (
            <div className='flex gap-4 mt-4'>
              <NavLink to={`/edit/${data.id}`}>
                <button className='bg-sky-600 px-4 py-2 text-white rounded-md'>
                  Edit
                </button>
              </NavLink>

              <React.Fragment>
                <Button variant='outlined' onClick={handleClickOpen}>
                  Delete
                </Button>
                <Dialog
                  open={open}
                  TransitionComponent={Transition}
                  keepMounted
                  onClose={handleClose}
                  aria-describedby='alert-dialog-slide-description'
                >
                  <DialogTitle>Confirm Delete</DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-slide-description'>
                      Are you sure you want to delete?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>


                    <Button onClick={handleDelete}>Delete</Button>
                  </DialogActions>
                </Dialog>
              </React.Fragment>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Description;
