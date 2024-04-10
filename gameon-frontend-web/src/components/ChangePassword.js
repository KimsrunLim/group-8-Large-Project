import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Black.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function ChangePassword() {
    const app_name = 'group8large-57cfa8808431'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }

    const errorsPass = [];

    const [password, setPassword] = useState('');
    const [conPass, setConPass] = useState('');

    const [message, setMessage] = useState('');
    const [passError, setPassError] = useState('');
    const [conPassError, setConPassError] = useState('');

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
            return false;
        }
        else if (conPass !== password) {
            setConPassError('Password does not match');
        }
        else {
            setConPassError('');
        }

        return conPass !== password ? false : true;
    };

    const doChange = async event => {
        event.preventDefault();

        var resPass = validatePass(password);
        var resConPass = validateConPass(conPass);

        // console.log("Results: ", resPass, resConPass);

        if (!(resPass) || !(resConPass)) {
            setMessage('');
            return;
        }

        // Update Password
        const email = localStorage.getItem('email');

        // console.log(email);


        // call endpoint based on email
        var obj = { email: email, password: password };
        var js = JSON.stringify(obj);


        if (resPass === resConPass)
        {
            await fetch(buildPath('api/updatepassword'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            setMessage('Password Updated, Return to Login');
        }

    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">

                        { /* Logo */}
                        <div className="logo p-4 text-center m-auto">
                            <img src={Logo} className='img-fluid' alt="GameOn Logo" style={{ maxWidth: "150px" }} />
                        </div>

                        <div className="signup-container">

                            { /* Signup Box */}
                            <div className="card">

                                { /* Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold text-black">Change Password</h1>
                                <div className="card-body">

                                    { /* Form */}
                                    <form onSubmit={doChange}>
                                        { /* validation functionality: 
                                        * - valid -> no effects
                                        * - invalid -> red text input highlight (replace bootstrap's blue) 
                                        *              & red icon    */ }

                                        { /* New Password */}
                                        <div className="form-group py-2">
                                            <label className="pb-1 text-secondary fw-bold">New Password</label>
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

                                        { /* Confirm New Password */}
                                        <div className="form-group py-2">
                                            <label className="pb-1 text-secondary fw-bold">Confirm New Password</label>
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
                                            <div className="text-success mt-1 mb-2 pt-2 pb-2 text-center mx-auto fs-6 fw-bold">
                                                {message}
                                            </div>
                                        }

                                        { /* Submit */}
                                        <button type="submit" className="btn bg-black w-100 mt-3 mb-1 fs-5 text-white fw-bold">Submit</button>
                                    </form>

                                    <div className='d-flex justify-content-center align-items-center text-center p-2 fw-medium'>
                                        Back to Login:
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

export default ChangePassword;