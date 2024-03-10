import React from 'react';

// import components (functions)
import Navbar from '../components/Navbar';
import Login from '../components/Login';

// create page
const LoginPage = () =>
{
    // implement components
    return(
        <div>
            <Navbar />
            <Login />
        </div>
    );
};

export default LoginPage;