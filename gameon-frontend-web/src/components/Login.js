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

        var obj = { username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/users'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            console.log(response);

            var res = JSON.parse(await response.text());

            if (res.id <= 0) // can't log in
            {
                setMessage('User/Password combination incorrect');
            }
            else // log in
            {
                // var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // save into local storage so later on know the name
                // localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/home'; // reroute
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    // return markup
    // functionality to implement:
        // click on logo to direct to landing page
    return (
        <>
            <style>
                {`
                    .card {
                        /* un-rounded bottom corners of login card */
                        border-bottom-left-radius: 0;
                        border-bottom-right-radius: 0;
                    }

                    .alert {
                        /* un-rounded top corners of signup link card */
                        border-top-left-radius: 0;
                        border-top-right-radius: 0;
                    }

                    .input-group-text {
                        /* un-rounded right corners of icons */
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                        padding: 1rem;
                    }
                `}
            </style>

            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="text-center mb-4">
                            <img src="/logo192.png" alt="GameOn Logo"
                                style={{ maxWidth: '100%', height: 'auto' }} />
                    </div>
                    <div className="card">
                        <h1 className="text-center mb-4 pt-4">Log In</h1>
                        <div className="card-body">
                        <form onSubmit={doLogin}>
                            <div className="form-group mb-4">
                            <label htmlFor="loginName" className="mb-1">Username</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faUser}/>
                                    </span>
                                </div>
                                    <input type="text" id="loginName" className="form-control"
                                        placeholder="Username" ref={(c) => username = c}/>
                            </div>
                            </div>
                            <div className="form-group mb-4">
                            <label htmlFor="loginPassword" className="mb-1">Password</label>
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faLock}/>
                                    </span>
                                </div>
                                    <input type="password" id="loginPassword" className="form-control"
                                        placeholder="Password" ref={(c) => password = c} />
                            </div>
                            </div>
                            <button type="submit" className="btn btn-primary w-100 mb-4">Submit</button>
                        </form>
                        </div>
                    </div>
                    <a href="/signup" className="alert-link" style={{display: 'block', textDecoration: 'none'}}>
                        <div className="text-center">
                            <div className="alert alert-secondary" role="alert">
                            New to GameOn? <a href="/signup" className="alert-link">Sign Up</a>
                            </div>
                        </div>
                    </a>
                    </div>
                </div>
                {message && <div className="alert alert-danger mt-3">{message}</div>}
            </div>
        </>
    );
};

// export so external code can call it
export default Login;