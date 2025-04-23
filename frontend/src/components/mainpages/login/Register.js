import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ActivityTypes, trackActivity } from '../utils/tracker';


export const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    isAdmin:false
  });

  const onChangeInput = (e) => {
    // console.log(e);
    let {value}=e.target;
    const { name} = e.target;
    if(name==="isAdmin"){
      value=e.target.checked;
    }
    setUser({ ...user, [name]: value });
    // console.log(user);
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('user/register', { ...user });
      trackActivity(ActivityTypes.REGISTER);
      localStorage.setItem('firstRegister', true);
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={registerSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Full Name"
                value={user.name}
                onChange={onChangeInput}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-t-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={user.email}
                onChange={onChangeInput}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                placeholder="Password"
                value={user.password}
                onChange={onChangeInput}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-b-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className='text-center'>
            <label className="inline-flex items-center">
              IsAdmin
              <input
                type='checkbox'
                name='isAdmin'
                checked={user.isAdmin}
                onChange={onChangeInput}
                className="ml-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Already Registered?{' '}
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
