import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Home from './Components/Home/Home';
import Protect from './Components/Protect/Protect';
import AddBlog from './Components/AddBlog/AddBlog';
import Description from './Components/Descriptions/Description';
import Personal from './Components/Personal/Personal';
import Update from './Components/Update/Update';
import Admin from './Components/AdminHome/Admin';
import Otp from './Components/Otp/Otp';
import Search from './Components/Search/Search';
 // Make sure to create this component

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Protect requiredRole={['']}><Home /></Protect>} />
          <Route path="/Addblog" element={<Protect requiredRole={['']}><AddBlog /></Protect>} />
          <Route path="/Description/:id" element={<Protect requiredRole={['']}><Description /></Protect>} />
          <Route path="/Personal" element={<Protect requiredRole={['']}><Personal/></Protect>} />
          <Route path="/edit/:id" element={<Protect requiredRole={['']}><Update/></Protect>} />
          <Route path="/search/:id" element={<Protect requiredRole={['']}><Search/></Protect>} />
          <Route path="/otp/:email" element={<Otp/>} />
          <Route path="/Admin" element={<Protect requiredRole={['Admin']}><Admin/></Protect>} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;
