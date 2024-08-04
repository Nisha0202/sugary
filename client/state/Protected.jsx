import React from 'react';
import { Link, Navigate, Route, } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
const Protected = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('sugaryToken');
  
  // Check if token exists and decode it
  let isAdmin = false;
  if (token) {
      const decoded = jwtDecode(token);
      isAdmin = decoded.isAdmin; // Assuming 'isAdmin' is a boolean property
  }

  return (
    <Route
    {...rest}
    render={props =>
        token && isAdmin ? (
            <Component {...props} />
        ) : (
            <Navigate to="/" /> // Redirect to home or any other page
        )
    }
/>
  );
};

export default Protected;
