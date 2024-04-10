import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';



function ForgotPassword() {

    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');

    const app_name = 'group8large-57cfa8808431'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
    }

    const doForgot = async event => {
        event.preventDefault();

        console.log(email);

        // ensure email feild not empty
        if (email === '') {
            setMessage('Please enter an email.');
            return;
        }

        var obj = { email: email.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/email'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            console.log(response);

            var res = JSON.parse(await response.text());

            if (res.error === 'No Email Found') // can't log in
            {
                setMessage('No Email Found.');
            }
            else {
                setMessage('Email Has Been Sent!');

                var obj = { emailR: email, username: undefined };
                var js = JSON.stringify(obj);

                await fetch(buildPath('api/send-email'),
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                localStorage.setItem('email', email);
                window.location.href = "/reset";
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    const handleGoBack = () => {
        window.location.href = "/login";
        return;
    };

    const linkHover = "link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover";
    const [isSubmitHovered, setIsSubmitHovered] = useState(false);
    const [isLoginHovered, setIsLoginHovered] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6">

                        { /* Logo */}
                        <div className="logo pt-5 py-4 d-flex justify-content-center">
                            <img src={Logo} className='img-fluid' alt="GameOn Logo" style={{ maxWidth: "28rem" }} />
                        </div>

                        { /* Forgot Password Box */}
                        <div className="login-container">
                            <div className="card">

                                { /* Header - Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold 
                                        text-white border-bottom border-5 border-primary bg-black">
                                    Forgot Password
                                </h1>

                                { /* Form */}                  
                                <div className="card-body mx-2">
                                    <form onSubmit={doForgot}>

                                        { /* Email */}
                                        <div className="form-group pt-3">
                                            <label className="pb-1 text-dark fw-bold fs-5">
                                                Email
                                            </label>
                                            <div className="input-group border rounded">
                                                <span className="input-group-text px-3 border-0 border-end">
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </span>
                                                <input className="form-control form-control-lg 
                                                    border-0 border-end rounded bg-transparent"
                                                    type="text" id="email" placeholder="example@domain.com" 
                                                    value={email} onChange={handleEmailChange}
                                                />
                                            </div>
                                        </div>
                                        { /* Error Feedback */}
                                        {message &&
                                            <div data-testid="error-message" className="text-danger 
                                                text-center mx-auto pt-3 pb-0 fs-6 fw-bold">
                                                {message}
                                            </div>
                                        }

                                        { /* Submit */}
                                        <button type="submit" data-testid="submit-button" 
                                            className="btn mt-4 mb-3 w-100 fs-5 fw-bold"
                                            onMouseEnter={() => setIsSubmitHovered(true)}
                                            onMouseLeave={() => setIsSubmitHovered(false)}
                                            style={{
                                                backgroundColor: isSubmitHovered ? 'black' : '#007bff',
                                                color: isSubmitHovered ? 'white' : 'black', 
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>

                                { /* Footer: Switch to Signup */}
                                <div className='footer py-3 border-top border-2 border-dark bg-light 
                                        d-flex justify-content-center align-items-center text-center 
                                        fw-medium rounded-bottom fs-6'>
                                    New to GameOn?
                                    <a href="/signup" className={`fw-bold ps-2 ${linkHover}`}>
                                        Sign Up  
                                    </a>
                                </div>
                            </div>

                            { /* Back to Login */}
                            <div className='d-grid py-5'>
                                <button onClick={handleGoBack} type="button" 
                                    className="btn"
                                    onMouseEnter={() => setIsLoginHovered(true)}
                                    onMouseLeave={() => setIsLoginHovered(false)}
                                    style={{ 
                                        maxHeight: "50px", 
                                        height: "50px",
                                        borderWidth: '3px',
                                        backgroundColor: isLoginHovered ? 'black' : '#F8F9FA',
                                        borderColor: isLoginHovered ? '#007bff' : 'black',
                                        color: isLoginHovered ? 'white' : 'black',
                                    }
                                }>
                                    <h5 className="fw-bold pt-1">
                                        Back to Login
                                    </h5>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;