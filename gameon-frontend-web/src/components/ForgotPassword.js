import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Black.png';
import 'bootstrap/dist/css/bootstrap.min.css';



function ForgotPassword() {
    var email;

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

    const doForgot = async event => {
        event.preventDefault();

        // ensure email feild not empty
        if (!email.value) {
            setMessage('Please enter email.');
            return;
        }

        var obj = { email: email.value };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/email'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            console.log(response);

            var res = JSON.parse(await response.text());

            console.log("Res: ", res);

            if (res.error === 'No Email Found') // can't log in
            {
                setMessage('No Email Found');
            }
            else // log in
            {
                setMessage('Email Has Been Sent');

                var obj = { emailR: email.value };
                var js = JSON.stringify(obj);

                await fetch(buildPath('send-email'),
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });
            }
        }
        catch (e) {
            alert(e.toString());
            return;
        }
    };

    const handleGoBack = () => {
        window.location.href = "/login";
        return;
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

                        <div className="login-container">

                            { /* Login Box */}
                            <div className="card">

                                { /* Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold text-black">Forgot Password</h1>
                                <div className="card-body">

                                    { /* Form */}
                                    <form onSubmit={doForgot}>

                                        { /* Email */}
                                        <div className="form-group pt-1">
                                            <label className="pb-1 text-secondary fw-bold">Email</label>
                                            <div className="input-group mb-3">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faEnvelope} /></span>
                                                <input type="text" id="email" data-testid="email-input" className="form-control" placeholder="Email" ref={(c) => email = c} />
                                            </div>
                                        </div>
                                        { /* Error Feedback */}
                                        { /* idea: red container highlight on error message... flash/until type */}
                                        {message &&
                                            <div data-testid="error-message" className="text-danger mt-1 mb-2 pt-2 pb-2 text-center mx-auto fs-6 fw-bold">
                                                {message}
                                            </div>
                                        }

                                        { /* Submit */}
                                        <button type="submit" data-testid="submit-button" className="btn bg-black w-100 mt-3 mb-1 fs-5 text-white fw-bold">Submit</button>
                                    </form>

                                    <div className='d-flex justify-content-center align-items-center text-center p-2 fw-medium'>
                                        New to GameOn?
                                        <a href="/signup" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover ps-3'>Sign Up</a>
                                    </div>
                                </div>
                            </div>

                            { /* Switch to Signup */}
                            <div className='d-grid py-5'>
                                <button onClick={handleGoBack} className="btn border border-3 border-dark fw-bold" type="button" style={{ maxHeight: "50px", height: "50px" }}>Back to Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ForgotPassword;