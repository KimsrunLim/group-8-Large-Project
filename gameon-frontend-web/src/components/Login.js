import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Login.css';

// local

function Login()
{
    var username;
    var password;

    const [message, setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {username: username.value, password: password.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await fetch('http://localhost:5001/api/users',
                {method:'POST', body:js, headers:{'Content-Type':'application/json'}});
        
            var res = JSON.parse(await response.text());

            if( res.id <= 0 ) // can't log in
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
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    // return markup
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <h2 className="card-header text-center">Log in to your account</h2>
                        <div className="card-body">
                            <form onSubmit={doLogin}>
                                <div className="form-group">
                                    <label htmlFor="loginName">Email address</label>
                                    <input type="text" id="loginName" className="form-control" placeholder="Email address" ref={username} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="loginPassword">Password</label>
                                    <input type="password" id="loginPassword" className="form-control" placeholder="Password" ref={password} />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Log In</button>
                            </form>
                        </div>
                    </div>
                    <div className="text-center">
                        <a href="/signup">New to Heroku? Sign Up</a>
                    </div>
                </div>
            </div>
            {message && <div className="alert alert-danger mt-3">{message}</div>}
        </div>       
    );
};

// export so external code can call it
export default Login;