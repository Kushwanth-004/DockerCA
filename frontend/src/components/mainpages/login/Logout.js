import React, { useContext } from 'react';
import axios from 'axios';
import { GlobalState } from '../../../GlobalState';

export const Logout = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.UserApi.isLogged;
  const [isAdmin, setIsAdmin] = state.UserApi.isAdmin;

  const handleLogout = async () => {
    try {
      await axios.get('/user/logout');
      // alert("Logout Successfully");
      localStorage.clear(); // Clear localStorage after logout
      setIsAdmin(false);    // Reset admin state
      setIsLogged(false);   // Reset logged-in state
      window.location.href = '/'; // Redirect to home page
    } catch (err) {
      alert(err.response.data.msg); // Handle any errors
    }
  };

  // Invoke handleLogout when component is rendered
  handleLogout();

  return <></>; // Return empty JSX, or redirect programmatically
};
