import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock, faSignature } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Signup() {

    var firstName = '';
    var lastName = '';
    var username = '';
    var password = '';

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

    const addUser = async event => {
        // event.preventDefault();

        var obj = { firstName: firstName.value, lastName: lastName.value, username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                var res = JSON.parse(await response.text());
                
            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('User has been added');
                window.location.href = '/login';
            }
        }
        catch (e) {
            console.log(e.toString());
            return;
        }
    };

    const doSignup = async event => {
        event.preventDefault();

        var obj = { username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/users'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            console.log(response);

            var res = JSON.parse(await response.text());

            // check if user exists
            console.log(res);
            if (res.id !== -1) { // error: exists
                setMessage(`Username "${obj.username}" already exists.`);
            } else { // success: add
                // console.log(`new username: ${obj.username}`);
                addUser();
            }

        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <>
            <style>
                {`
                    .card {
                        padding: 5%;
                        /* un-rounded bottom corners of login card */
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }

                    .card-header {
                        background-color: #fff;
                        position: relative; 
                        border-bottom: none;
                    }

                    /* floating underline */
                    .card-header::after {
                        content: '';
                        display: block;
                        position: absolute;
                        left: 5%; 
                        right: 5%; 
                        bottom: -1px;
                        height: 1px;
                        background: #ccc;
                        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1); 
                    }

                    .alert-secondary {
                        background-color: #eee;
                        /* un-rounded top corners of signup link card */
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                    }

                    .input-group-text {
                        padding: 1rem;
                        background-color: #eee;
                        color: #000;
                        /* un-rounded right corners of icons */
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        border-top: none;
                    }
                `}
            </style>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        { /* Logo */ }
                        <div className="logo text-center mb-4 pb-4 pt-4">
                            <a href="/home">
                                <img src="/logo192.png" alt="GameOn Logo"
                                    style={{ width: '10rem', height: '10rem', marginTop: '5%' }} />
                            </a>
                        </div>
                        <div className="signup-container">
                            { /* Signup Box */ }
                            <div className="card">
                                { /* Title */ }
                                <h1 className="card-header text-center pb-4 pt-2" style={{
                                    fontSize: '2rem', color: '#000', fontWeight: 'bold'}}>
                                    Sign Up</h1>
                                <div className="card-body">
                                { /* Form */ }
                                    <form onSubmit={doSignup}>
                                        { /* validation functionality: 
                                        * - valid -> no effects
                                        * - invalid -> red text input highlight (replace bootstrap's blue) 
                                        *              & red icon    */ }

                                        { /* First Name */ }
                                        <div className="form-group pt-4">
                                            <label htmlFor="firstName" className="mb-1"
                                                style={{ fontWeight: 600, color: '#444' }}>
                                                First Name
                                            </label>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faSignature}/>
                                                    </span>
                                                </div>
                                                <input type="text" id="firstName" className="form-control"
                                                    placeholder="First Name" ref={(c) => firstName = c}/>
                                            </div>
                                        </div>
                                        { /* Last Name */ }
                                        <div className="form-group">
                                            <label htmlFor="lastName" className="mb-1"
                                                style={{ fontWeight: 600, color: '#444' }}>
                                                Last Name
                                            </label>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faSignature}/>
                                                    </span>
                                                </div>
                                                <input type="text" id="lastName" className="form-control"
                                                    placeholder="Last Name" ref={(c) => lastName = c}/>
                                            </div>
                                        </div>
                                        { /* Username */ }
                                        <div className="form-group">
                                            <label htmlFor="username" className="mb-1"
                                                style={{ fontWeight: 600, color: '#444' }}>
                                                Username
                                            </label>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faUser}/>
                                                    </span>
                                                </div>
                                                <input type="text" id="username" className="form-control"
                                                    placeholder="Username" ref={(c) => username = c}/>
                                            </div>
                                        </div>
                                        { /* Password */ }
                                        <div className="form-group">
                                            <label htmlFor="password" className="mb-1"
                                                style={{ fontWeight: 600, color: '#444' }}>
                                                Password
                                            </label>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faLock}/>
                                                    </span>
                                                </div>
                                                <input type="text" id="password" className="form-control"
                                                    placeholder="Password" ref={(c) => password = c}/>
                                            </div>
                                        </div>
                                        { /* Error Feedback */}
                                        { /* idea: red container highlight on error message... flash/until type */ }
                                        {message &&
                                        <div className="alert alert-danger mt-1 mb-2 pt-2 pb-2 text-center mx-auto" 
                                                style={{ border: 'none', backgroundColor: '#fff',
                                                    fontSize: '1rem', fontWeight: 'bold',
                                                    color: '#7D0000', width: '70%' }}>
                                            {message}
                                        </div>}
                                        { /* Submit */ }
                                        <button type="submit" className="btn btn-primary w-100 mt-3 mb-1"
                                            style={{ backgroundColor: '#000', borderColor: '#000',
                                                    fontSize: '1.2rem', fontWeight: 500, color: '#fff' }}>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                            { /* Switch to Login */ }
                            <a href="/login" className="alert-link mb-4"
                                style={{ display: 'block', textDecoration: 'none' }}>
                                <div className="text-center">
                                    <div className="alert alert-secondary" role="alert"
                                            style={{ fontWeight: 600, color: '#444' }}>
                                        Already have an account? <a href="/login"
                                            className="alert-link mt-4 mb-4"
                                            style={{ fontWeight: 'bold', color: '#000' }}>Log In</a>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>                
        </>
    );
};

export default Signup;