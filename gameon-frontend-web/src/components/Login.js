import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';

//
// Functionality
//

function Login() {
    var username;
    var password;

    const [message, setMessage] = useState('');

    const app_name = 'group8large-57cfa8808431'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }

    const saveCookie = async event => {
        let minutes = 525600;
        let date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        document.cookie = "username=" + username.value + ";expires=" + date.toGMTString();

        // console.log("cookie saved");
    }

    const doLogin = async event => {
        event.preventDefault();

        // ensure that both username and password fields are not empty
        if (!username.value || !password.value) {
            setMessage('Please enter both a username and password.');
            return;
        }

        var obj = { username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        // console.log(username.value, password.value);

        try {
            const response = await fetch(buildPath('api/users'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });


            var res = JSON.parse(await response.text());
            
            if (res.result === false || res.error.length > 0) // can't log in
            {
                // console.log("Error: ", res.user);
                if (res.error === "Account Not Validated")
                {
                    localStorage.setItem('username', res.user)
                    setMessage('Account Not Validated');
                    window.location.href = "/verifyaccount";
                }
                else {
                    setMessage('Username/password combination incorrect.');
                }
            }
            else // log in
            {
                setMessage('');
                saveCookie();
                window.location.href = '/home'; // redirect
            }
        }
        catch (e) {
            alert(e.toString());
        }
    };

    const handleGuest = () => {
        window.location.href = "/home";
        return;
    };

    //
    // Styling
    //

    const linkHover = "link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover";
    const [isSubmitHovered, setIsSubmitHovered] = useState(false);
    const [isGuestHovered, setIsGuestHovered] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6">
                        
                        { /* Logo */}
                        <div className="logo pt-5 py-4 d-flex justify-content-center">
                            <img src={Logo} className='img-fluid' alt="GameOn Logo" style={{ maxWidth: "28rem" }} />
                        </div>

                        { /* Login Box */}
                        <div className="login-container">
                            <div className="card">

                                { /* Header - Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold 
                                        text-white border-bottom border-5 border-primary bg-black">
                                    Log In
                                </h1>
                                
                                { /* Body - Form */}
                                <div className="card-body mx-2">
                                    <form onSubmit={doLogin}>

                                        { /* Username */}
                                        <div className="form-group py-2">
                                            <label className="pt-3 pb-1 text-dark fw-bold fs-5">
                                                Username
                                            </label>
                                            <div className="input-group border rounded">
                                                <span className="input-group-text px-3 border-0 border-end">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </span>
                                                <input className="form-control form-control-lg
                                                    border-0 border-end rounded bg-transparent"
                                                    type="text" id="username" data-testid="username-input" 
                                                    placeholder="Username" ref={(c) => username = c} 
                                                    onChange={() => setMessage('')} // clear error when user starts typing
                                                />
                                            </div>
                                        </div>

                                        { /* Password */}
                                        <div className="form-group py-2">
                                            <label className="pb-1 text-dark fw-bold fs-5">
                                                Password
                                            </label>
                                            <div className="input-group border rounded">
                                                <span className="input-group-text px-3 border-0 border-end">
                                                    <FontAwesomeIcon icon={faLock} />
                                                </span>
                                                <input className="form-control form-control-lg 
                                                    border-0 border-end rounded bg-transparent"
                                                    type="password" id="password" data-testid="password-input" 
                                                    placeholder="Password" ref={(c) => password = c}
                                                    onChange={() => setMessage('')} // clear error when user starts typing
                                                />
                                            </div>
                                        </div>

                                        { /* Error Feedback */}
                                        {message &&
                                            <div data-testid="error-message" className="text-danger 
                                                text-center mx-auto pt-3 pb-1 fs-6 fw-bold">
                                                {message}
                                            </div>
                                        }

                                        { /* Submit */}
                                        <button type="submit" data-testid="submit-button" 
                                            className="btn mt-4 b-0 w-100 fs-5 fw-bold"
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

                                {/* Body - Forgot Password */}
                                <div className="d-flex justify-content-center align-items-center 
                                    text-center mb-4 fs-6 fw-medium text-secondary link-secondary
                                    bg-transparent">
                                    <a href="/forgotpassword" className={`ps-2 link-secondary ${linkHover}`}>
                                        Forgot Password?
                                    </a>
                                </div>

                                { /* Footer - Switch to Signup */}
                                <div className='footer py-3 border-top border-2 border-dark bg-light 
                                        d-flex justify-content-center align-items-center text-center 
                                        fw-medium rounded-bottom fs-6'>
                                    New to GameOn?
                                    <a href="/signup" className={`fw-bolder ps-2 ${linkHover}`}>
                                        Sign Up  
                                    </a>
                                </div>
                            </div>

                            { /* Continue as Guest */}
                            <div className='d-grid py-5'>
                                <button onClick={handleGuest} type="button" 
                                    className="btn"
                                    onMouseEnter={() => setIsGuestHovered(true)}
                                    onMouseLeave={() => setIsGuestHovered(false)}
                                    style={{ 
                                        maxHeight: "50px", 
                                        height: "50px",
                                        borderWidth: '3px',
                                        backgroundColor: isGuestHovered ? 'black' : '#F8F9FA',
                                        borderColor: isGuestHovered ? '#007bff' : 'black',
                                        color: isGuestHovered ? 'white' : 'black',
                                    }
                                }>
                                    <h5 className="fw-bold pt-1">
                                        Continue as Guest
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

export default Login;