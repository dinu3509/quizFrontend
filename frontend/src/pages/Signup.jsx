import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import { handleError,handleSuccess } from '/Utils';
const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {


    e.preventDefault();
    const{name,email,password} = formData;
    if(!name||!email||!password){
        return handleError('Name,Email and Password are required.')
    }
    try{
        const res = await axios.post('http://localhost:8080/auth/signup', formData);
    handleSuccess("Signup successful");
    setTimeout(() => {
      navigate('/login');
    }, 1000);
    }catch(err){
        handleError(err.response?.data?.error || 'Signup Failed. Try Again');
    console.log("Status Code:", err.response?.status);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Sign Up</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block mb-1 text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            autoFocus
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block mb-1 text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Sign Up
        </button>
        <span className=''>Already have an account ? <Link to="/login" className='underline text-blue-500'>Login</Link></span>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Signup;
