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

    const handleGuest = () => {
        window.location.href = "/home";
        return;
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

                        <div className="login-container">

                            { /* Login Box */}
                            <div className="card">

                                { /* Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold text-black">Log In</h1>
                                <div className="card-body">

                                    { /* Form */}
                                    <form onSubmit={doLogin}>

                                        { /* Username */}
                                        <div className="form-group pt-4">
                                            <label className="pb-1 text-secondary fw-bold">Username</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
                                                <input type="text" id="username" className="form-control" placeholder="Username" ref={(c) => username = c} />
                                            </div>
                                        </div>

                                        { /* Password */}
                                        <div className="form-group pt-1">
                                            <label className="pb-1 text-secondary fw-bold">Password</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                                <input type="password" id="password" className="form-control" placeholder="Password" ref={(c) => password = c} />
                                            </div>
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
                                        New to GameOn?
                                        <a href="/signup" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ps-3'>Sign Up</a>
                                    </div>
                                </div>
                            </div>

                            { /* Switch to Signup */}
                            <div className='d-grid py-5'>
                                <button onClick={handleGuest} class="btn border border-3 border-dark fw-bold" type="button" style={{ maxHeight: "50px", height: "50px" }}>Continue as Guest</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;