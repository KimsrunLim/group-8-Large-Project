import React, { useState } from 'react';

function Test() {

    var username;
    var password;

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

    const doLogin = async event => {
        event.preventDefault();

        var obj = { username: username.value, password: password.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('/api/users'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            var res = JSON.parse(await response.text());

            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user = { firstName: res.FirstName, lastName: res.LastName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/group8large';
            }
        }
        catch (e) {
            console.log(e.toString());
            return;
        }
    };

    return (
        <div id="loginDiv">
            <form onSubmit={doLogin}>
                <span id="inner-title">PLEASE LOG IN</span><br />
                <input type="text" id="username" placeholder="Username"
                    ref={(c) => username = c} /><br />
                <input type="password" id="password" placeholder="Password"
                    ref={(c) => password = c} />
                <input type="submit" id="loginButton" class="buttons" value="Do It"
                    onClick={doLogin} />
            </form>
            <span id="loginResult">{message}</span>
        </div>
    );
};

export default Test;
