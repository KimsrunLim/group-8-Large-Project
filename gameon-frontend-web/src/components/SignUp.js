import React, { useState } from 'react';

function SignUp() {

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
            return 'http://localhost:5000/' + route;
        }
    }

    const addUser = async event => {
        event.preventDefault();

        var obj = { firstName: firstName.value, lastName: lastName.value, username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('/api'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.error.length > 0) {
                setMessage("API Error:" + res.error);
            }
            else {
                setMessage('User has been added');
            }
        }
        catch (e) {
            console.log(e.toString());
            return;
        }
    };

    return (
        <div id="signUpDiv">
            <form onSubmit={SignUp}>
                <span id="inner-title">SIGN UP</span><br />
                <input type="text" id="firstName" placeholder="firstName"
                    ref={(c) => firstName = c} /><br />
                <input type="text" id="lastName" placeholder="lastName"
                    ref={(c) => lastName = c} />
                <input type="text" id="username" placeholder="Username"
                    ref={(c) => username = c} /><br />
                <input type="password" id="password" placeholder="Password"
                    ref={(c) => password = c} />
                <input type="submit" id="signUpButton" class="buttons" value="Do It"
                    onClick={SignUp} />
            </form>
            <span id="signUpResult">{message}</span>
        </div>
    );
};

export default SignUp;