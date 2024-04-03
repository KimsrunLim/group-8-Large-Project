import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            errorsUser.push('Username is required');
        }

        // Checks for correct inputs
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            errorsUser.push('Only letters, numbers, or underscores');
        }

        // Checks for min length
        if (!username || username.length < 4) {
            errorsUser.push('Must be at least 4 characters long');
        }

        var response = await fetch(buildPath('api/userCheck'),
            { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

        var res = JSON.parse(await response.text());

        // Checks for existing user
        if (res.error.length > 0) {
            errorsUser.push('Username already exists');
        }

        setUsernameError(errorsUser);
        return errorsUser.length > 0 ? false : true;
    };

    const validateEmail = (email) => {

        // Check for input
        if (!email) {
            errorsEmail.push('Email is required');
        }

        // Check for valid email
        if (!/\S+@\S+\.(com|net|org)$/.test(email)) {
            errorsEmail.push('Invalid email address');
        }
        setEmailError(errorsEmail);

        return errorsEmail.length > 0 ? false : true;
    };

    const validatePass = (password) => {

        // Check for input
        if (!password) {
            errorsPass.push('Password is required');
        }

        // Number Check
        if (!/(?=.*\d)/.test(password)) {
            errorsPass.push('At least one number');
        }

        // Length Check
        if (password.length < 8) {
            errorsPass.push('At least 8 characters long');
        }

        // Lowercase Check
        if (!/(?=.*[a-z])/.test(password)) {
            errorsPass.push('At least one lowercase letter');
        }

        // Uppercase Check
        if (!/(?=.*[A-Z])/.test(password)) {
            errorsPass.push('At least one uppercase letter');
        }

        // Special Character Check
        if (!/(?=.*[!@#$%^&*()])/.test(password)) {
            errorsPass.push('At least one special character');
        }


        setPassError(errorsPass);
        return errorsPass.length > 0 ? false : true;
    };


    const validateConPass = (conPass) => {

        if (!conPass) {
            setConPassError('Confirmation required');
        }
        else if (conPass !== password) {
            setConPassError('Password does not match');
        }
        else
        {
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
                setMessage('User has been added');
                // window.location.href = '/login';
            }
        }
        catch (e) {
            console.log(e.toString());
            return;
        }
    };

    const doSignup = async event => {
        event.preventDefault();

        var resUser = validateUsername(username);
        var resEmail = validateEmail(email);
        var resPass = validatePass(password);
        var resConPass = validateConPass(conPass);

        if (resUser && resEmail && resPass && resConPass) {
            addUser();
            return;
        }

    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">

                        { /* Logo */}
                        <div className="logo p-4 text-center m-auto">
                            <img src="/logo192.png" className='img-fluid' alt="GameOn Logo" style={{ maxWidth: "150px" }} />
                        </div>

                        <div className="signup-container">

                            { /* Signup Box */}
                            <div className="card">

                                { /* Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold text-black">Sign Up</h1>
                                <div className="card-body">

                                    { /* Form */}
                                    <form onSubmit={doSignup}>
                                        { /* validation functionality: 
                                        * - valid -> no effects
                                        * - invalid -> red text input highlight (replace bootstrap's blue) 
                                        *              & red icon    */ }

                                        { /* Username */}
                                        <div className="form-group pt-4 pb-2">
                                            <label className="pb-1 text-secondary fw-bold">Username</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                                <input type="text" id="username" value={username} onChange={handleUNChange} className="form-control" placeholder="Username" />
                                            </div>
                                            {usernameError.length > 0 &&
                                                (
                                                    <ul className="align-items-end text-end">
                                                        {usernameError.map((error, index) => (
                                                            <li className="text-danger fw-bold" style={{ listStyleType: "none" }} key={index}>{error}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>

                                        { /* Email */}
                                        <div className="form-group py-2">
                                            <label className="pb-1 text-secondary fw-bold">Email</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                                                <input type="text" id="email" value={email} onChange={handleEmailChange} className="form-control" placeholder="Email" />
                                            </div>
                                            {emailError.length > 0 &&
                                                (
                                                    <ul className="align-items-end text-end">
                                                        {emailError.map((error, index) => (
                                                            <li className="text-danger fw-bold" style={{ listStyleType: "none" }} key={index}>{error}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>

                                        { /* Password */}
                                        <div className="form-group py-2">
                                            <label className="pb-1 text-secondary fw-bold">Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                                <input type="password" id="password" value={password} onChange={handlePassChange} className="form-control" placeholder="Password" />
                                            </div>
                                            {passError.length > 0 &&
                                                (
                                                    <ul className="align-items-end text-end">
                                                        {passError.map((error, index) => (
                                                            <li className="text-danger fw-bold" style={{ listStyleType: "none" }} key={index}>{error}</li>
                                                        ))}
                                                    </ul>
                                                )}
                                        </div>

                                        { /* Confirm Password */}
                                        <div className="form-group py-2">
                                            <label className="pb-1 text-secondary fw-bold">Confirm Password</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                                <input type="password" id="passwordConfirm" value={conPass} onChange={handleConPassChange} className="form-control" placeholder="Confirm Password" />
                                            </div>
                                            {conPassError &&
                                                <div className="text-danger fw-bold text-end">
                                                    {conPassError}
                                                </div>
                                            }
                                        </div>
                                        { /* Error Feedback */}
                                        { /* idea: red container highlight on error message... flash/until type */}
                                        {message &&
                                            <div className="text-danger mt-1 mb-2 pt-2 pb-2 text-center mx-auto fs-6 fw-bold">
                                                {message}
                                            </div>
                                        }

                                        { /* Submit */}
                                        <button type="submit" className="btn bg-black w-100 mt-3 mb-1 fs-5 text-white fw-bold">Submit</button>
                                    </form>

                                    <div className='d-flex justify-content-center align-items-center text-center p-2 fw-medium'>
                                        Already have an Account?
                                        <a href="/login" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ps-3'>Log In</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signup;