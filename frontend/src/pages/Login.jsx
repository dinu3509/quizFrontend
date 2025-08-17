import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import {jwtDecode} from"jwt-decode"
import {ToastContainer} from 'react-toastify';
import {handleError,handleSuccess } from '/Utils';
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log('Login Data:', formData);
    try{
    const res=await axios.post("http://localhost:8080/auth/login",formData)
    const { jwToke, email, name } = res.data;
    localStorage.setItem("token", res.data.jwToke);
localStorage.setItem("user", name);
    handleSuccess(res.data.message||"Login Successful");
    setTimeout(() => {
      navigate('/home');
    }, 1000);
  }catch(err){
    handleError(err.response?.data?.error || 'Login Failed. Try Again');
        console.log(err)
  }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Login</h2>

       

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
          Login
        </button>
        <span className=''>Don't have an account ? <Link to="/signup" className='underline text-blue-500'>Signup</Link></span>
      </form>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
