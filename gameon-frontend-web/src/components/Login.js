import React, { useState } from 'react';
import '../styles/Login.css';

// local

function Login()
{
    var loginName;
    var loginPassword;

    const [message, setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);

        try
        {
            const response = await
            fetch('http://localhost:5001/api/users',
                {method:'POST',body:js,headers:{'Content-Type':'application/json'}});
        
            var res = JSON.parse(await response.text()); // call response

            if( res.id <= 0 ) // can't log in
            {
                setMessage('User/Password combination incorrect');
            }
            else // log in
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                // save into local storage so later on know the name
                localStorage.setItem('user_data', JSON.stringify(user));
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
        <div id="loginDiv" className="login-container">
            <form onSubmit={doLogin} className="login-form">
                <h2 className="login-title">Log In to Your Account</h2>
                <div className="input-group">
                    <input type="text" id="loginName" placeholder="Username" 
                        ref={(c) => loginName = c} />
                </div>
                <div className="input-group">
                    <input type="password" id="loginPassword" placeholder="Password"
                        ref={(c) => loginPassword = c} />
                </div>
                <div className="input-group">
                    <button type="submit" className="login-button">Log In</button>
                </div>
            </form>
            <p className="login-result">{message}</p>
        </div>        
    );
};

// export so external code can call it
export default Login;