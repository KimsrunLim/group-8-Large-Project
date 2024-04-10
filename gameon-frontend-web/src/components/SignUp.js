import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';

//
// Functionality
//

function Signup() {
    const app_name = 'group8large-57cfa8808431'

    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }

    const errorsUser = [];
    const errorsEmail = [];
    const errorsPass = [];

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPass, setConPass] = useState('');

    const [message, setMessage] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passError, setPassError] = useState('');
    const [conPassError, setConPassError] = useState('');

    const handleUNChange = (event) => {
        const inputUsername = event.target.value;
        setUsername(inputUsername);
        validateUsername(inputUsername);
    }

    const handleEmailChange = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        validateEmail(inputEmail);
    }

    const handlePassChange = (event) => {
        const inputPass = event.target.value;
        setPassword(inputPass);
        validatePass(inputPass);
    }

    const handleConPassChange = (event) => {
        const inputConPass = event.target.value;
        setConPass(inputConPass);
        validateConPass(inputConPass);
    }

    const validateUsername = async (username) => {
        var obj = { username: username };
        var js = JSON.stringify(obj);

        if (!username) {
            errorsUser.push('Username is required.');
        }

        // Checks for correct inputs
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            errorsUser.push('Only letters, numbers, or underscores.');
        }

        // Checks for min length
        if (!username || username.length < 4) {
            errorsUser.push('Must be at least 4 characters long.');
        }

        var response = await fetch(buildPath('api/userCheck'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

        var res = JSON.parse(await response.text());

        // Checks for existing user
        if (res.error.length > 0) {
            errorsUser.push('Username already exists.');
        }

        setUsernameError(errorsUser);
        return errorsUser.length > 0 ? false : true;
    };

    const validateEmail = (email) => {

        // Check for input
        if (!email) {
            errorsEmail.push('Email is required.');
        }

        // Check for valid email
        if (!/\S+@\S+\.(com|net|org)$/.test(email)) {
            errorsEmail.push('Invalid email address.');
        }
        setEmailError(errorsEmail);

        return errorsEmail.length > 0 ? false : true;
    };

    const validatePass = (password) => {

        // Check for input
        if (!password) {
            errorsPass.push('Password is required.');
        }

        // Number Check
        if (!/(?=.*\d)/.test(password)) {
            errorsPass.push('At least one number.');
        }

        // Length Check
        if (password.length < 8) {
            errorsPass.push('At least 8 characters long.');
        }

        // Lowercase Check
        if (!/(?=.*[a-z])/.test(password)) {
            errorsPass.push('At least one lowercase letter.');
        }

        // Uppercase Check
        if (!/(?=.*[A-Z])/.test(password)) {
            errorsPass.push('At least one uppercase letter.');
        }

        // Special Character Check
        if (!/(?=.*[!@#$%^&*()])/.test(password)) {
            errorsPass.push('At least one special character.');
        }


        setPassError(errorsPass);
        return errorsPass.length > 0 ? false : true;
    };


    const validateConPass = (conPass) => {

        if (!conPass) {
            setConPassError('Confirmation required.');
            return false;
        }
        else if (conPass !== password) {
            setConPassError('Password does not match.');
        }
        else {
            setConPassError('');
        }

        return conPass !== password ? false : true;
    };


    const addUser = async event => {
        var obj = { username: username, email: email, password: password };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/signup'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('User has been added!');

                obj = { username: username, emailR: email };
                js = JSON.stringify(obj);

                const response2 = await fetch(buildPath('api/send-email'),
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
                localStorage.setItem('username', username);
                window.location.href = '/verifyaccount';
            }
        }
        catch (e) {
            console.log(e.toString());
            return;
        }
    };

    const doSignup = async event => {
        event.preventDefault();

        var resUser = await validateUsername(username);
        var resEmail = validateEmail(email);
        var resPass = validatePass(password);
        var resConPass = validateConPass(conPass);

        // console.log("Results: ", resUser, resEmail, resPass, resConPass);

        if (!(resUser) || !(resEmail) || !(resPass) || !(resConPass)) {

            setMessage('');
            return;
        }
        addUser();
    };

    const handleGuest = () => {
        window.location.href = "/home";
        return;
    };

    //
    // Styling
    //

    const linkHover = "link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover";

    const [isGuestHovered, setIsGuestHovered] = useState(false);
    const [isSubmitHovered, setIsSubmitHovered] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6">

                        { /* Logo */}
                        <div className="logo pt-4 py-4 d-flex justify-content-center">
                            <img src={Logo} className='img-fluid' alt="GameOn Logo" style={{ maxWidth: "28rem" }} />
                        </div>

                        { /* Signup Box */}
                        <div className="signup-container">
                            <div className="card">

                                { /* Header - Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold 
                                        text-white border-bottom border-5 border-primary bg-black">
                                    Sign Up
                                </h1>

                                {/* Body - Form */}
                                <div className="card-body mx-2">
                                    <form onSubmit={doSignup}>

                                        { /* Username */}
                                        <div className="form-group pt-3">
                                            <label className="pb-1 text-dark fw-bold fs-5">
                                                Username
                                            </label>
                                            <div className="input-group border rounded">
                                                <span className="input-group-text px-3 border-0 border-end">
                                                    <FontAwesomeIcon icon={faUser} />
                                                </span>
                                                <input className="form-control form-control-lg
                                                    border-0 border-end rounded bg-transparent"
                                                    type="text" id="username" placeholder="Username" 
                                                    value={username} onChange={handleUNChange}
                                                />
                                            </div>
                                        </div>
                                        {usernameError.length > 0 &&
                                            (
                                                <ul className="align-items-end text-end mb-0">
                                                    {usernameError.map((error, index) => (
                                                        <li className="text-danger fw-bold pe-1" style={{ listStyleType: "none" }} key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            )}

                                        { /* Email */}
                                        <div className="form-group py-2">
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
                                        {emailError.length > 0 &&
                                            (
                                                <ul className="align-items-end text-end mb-0">
                                                    {emailError.map((error, index) => (
                                                        <li className="text-danger fw-bold pe-1" style={{ listStyleType: "none" }} key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            )}

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
                                                    type="password" id="password" placeholder="Password" 
                                                    value={password} onChange={handlePassChange}
                                                />
                                            </div>
                                        </div>
                                        {passError.length > 0 &&
                                            (
                                                <ul className="align-items-end text-end mb-0">
                                                    {passError.map((error, index) => (
                                                        <li className="text-danger fw-bold pe-1" style={{ listStyleType: "none" }} key={index}>{error}</li>
                                                    ))}
                                                </ul>
                                            )}

                                        { /* Confirm Password */}
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
                                                    type="password" id="passwordConfirm" 
                                                    placeholder="Confirm Password" 
                                                    value={conPass} onChange={handleConPassChange}
                                                />
                                            </div>
                                        </div>
                                        {conPassError &&
                                            <div className="text-danger fw-bold text-end mb-0 pe-1">
                                                {conPassError}
                                            </div>
                                        }

                                        { /* Error Feedback */}
                                        {message &&
                                            <div className="text-danger text-center mx-auto pt-3 
                                                pb-1 fs-6 fw-bold">
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
                                
                                { /* Footer: Switch to Login */}
                                <div className='footer py-3 border-top border-2 border-dark bg-light 
                                        d-flex justify-content-center align-items-center text-center 
                                        fw-medium rounded-bottom fs-6'>
                                    Already have an account?
                                    <a href="/login" className={`fw-bold ps-2 ${linkHover}`}>
                                        Log In  
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

export default Signup;