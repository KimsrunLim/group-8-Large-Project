import React from 'react';

// import components (functions)
import Navbar from '../components/Navbar';
import SignUp from '../components/SignUp';

// create page
const SignupPage = () =>
{
    // implement components
    return(
        <div>
            <Navbar />
            <SignUp />
        </div>
    );
};

export default SignupPage;