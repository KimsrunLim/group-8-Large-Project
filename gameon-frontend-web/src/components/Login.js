import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

// local

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

    const doLogin = async event => {
        event.preventDefault();

        // ensure that both username and password fields are not empty
        if (!username.value || !password.value) {
            setMessage('Please enter both a username and password.');
            return;
        }

        var obj = { username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/users'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            console.log(response);

            var res = JSON.parse(await response.text());

            if (res.id <= 0) // can't log in
            {
                setMessage('Username/password combination incorrect.');
            }
            else // log in
            {
                setMessage('');
                window.location.href = '/home'; // redirect
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        { /* Logo */}
                        <div className="logo text-center mb-4 pb-4 pt-4">
                            <a href="/home">
                                <img src="/logo192.png" alt="GameOn Logo"
                                    style={{ width: '10rem', height: '10rem', marginTop: '5%' }} />
                            </a>
                        </div>
                        <div className="login-container">
                            { /* Login Box */}
                            <div className="card">
                                { /* Title */}
                                {/* <h2 className="card-header text-center pb-4 pt-2">Log In</h2> */}
                                <span className="card-header text-center pb-4 pt-2" style={{ fontSize: '2rem', fontWeight: 'bold', color: '#000' }}>
                                    Log In
                                </span>
                                <div className="card-body">
                                    { /* Form */}
                                    <form onSubmit={doLogin}>
                                        { /* validation functionality: 
                                        * - valid -> no effects
                                        * - invalid -> red text input highlight (replace bootstrap's blue) 
                                        *              & red icon    */ }

                                        { /* Username */}
                                        <div className="form-group pt-4">
                                            <label htmlFor="username" className="mb-1"
                                                style={{ fontWeight: 600, color: '#444' }}>
                                                Username
                                            </label>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </span>
                                                </div>
                                                <input type="text" id="username" className="form-control"
                                                    placeholder="Username" ref={(c) => username = c} />
                                            </div>
                                        </div>
                                        { /* Password */}
                                        <div className="form-group">
                                            <label htmlFor="password" className="mb-1"
                                                style={{ fontWeight: 600, color: '#444' }}>
                                                Password
                                            </label>
                                            <div className="input-group mb-4">
                                                <div className="input-group-prepend">
                                                    <span className="input-group-text">
                                                        <FontAwesomeIcon icon={faLock} />
                                                    </span>
                                                </div>
                                                <input type="text" id="password" className="form-control"
                                                    placeholder="Password" ref={(c) => password = c} />
                                            </div>
                                        </div>
                                        { /* Error Feedback */}
                                        { /* idea: red container highlight on error message... flash/until type */}
                                        {message &&
                                            <div className="alert alert-danger mt-1 mb-2 pt-2 pb-2 text-center mx-auto"
                                                style={{
                                                    border: 'none', backgroundColor: '#fff',
                                                    fontSize: '1rem', fontWeight: 'bold',
                                                    color: '#7D0000', width: '70%'
                                                }}>
                                                {message}
                                            </div>}
                                        { /* Submit */}
                                        <button type="submit" className="btn btn-primary w-100 mt-3 mb-1"
                                            style={{
                                                backgroundColor: '#000', borderColor: '#000',
                                                fontSize: '1.2rem', fontWeight: 500, color: '#fff'
                                            }}>
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                            { /* Switch to Signup */}
                            <a href="/signup" className="alert-link mb-4"
                                style={{ display: 'block', textDecoration: 'none' }}>
                                <div className="text-center">
                                    <div className="alert alert-secondary" role="alert"
                                        style={{ fontWeight: 600, color: '#444' }}>
                                        New to GameOn? <a href="/signup"
                                            className="alert-link mt-4 mb-4"
                                            style={{ fontWeight: 'bold', color: '#000' }} >Sign Up</a>
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

export default Login;