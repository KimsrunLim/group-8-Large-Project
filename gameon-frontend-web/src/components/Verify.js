import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Black.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Verify() {
    const app_name = 'group8large-57cfa8808431'
    function buildPath(route) {
        if (process.env.NODE_ENV === 'production') {
            return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else {
            return 'http://localhost:5001/' + route;
        }
    }

    const [message, setMessage] = useState('');
    const [verificationCode, setCode] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;

        setMessage('');
        setCode(inputValue);
    }

    const doValidate = async event => {
        event.preventDefault();

        if (!verificationCode) {
            setMessage('Verification Code Required');
            return;
        }

        const username = localStorage.getItem('username');

        var obj = { username: username };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(buildPath('api/userCheck'),
                { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

            const result = await response.json();

            if (verificationCode === result.result[0].VerifyCode.toString()) {

                obj = { email: result.result[0].Email, code: result.result[0].VerifyCode };
                js = JSON.stringify(obj);

                const res = await fetch(buildPath('api/verify'),
                    { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

                // Check if good 
            }
        }
        catch (e) {
            console.log('ERROR');
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
                                <h1 className="card-header p-3 text-center align-middle fw-bold text-black">Verify Account</h1>
                                <div className="card-body">

                                    { /* Form */}
                                    <form onSubmit={doValidate}>
                                        { /* validation functionality: 
                                        * - valid -> no effects
                                        * - invalid -> red text input highlight (replace bootstrap's blue) 
                                        *              & red icon    */ }

                                        { /* Verify Code */}
                                        <div className="form-group pt-4 pb-2">
                                            <label className="pb-1 text-secondary fw-bold">Verificaion Code</label>
                                            <div className="input-group">
                                                <span className="input-group-text"><FontAwesomeIcon icon={faLock} /></span>
                                                <input type="text" id="verificationCode" value={verificationCode} onChange={handleChange} className="form-control" placeholder="XXXXXX" />
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
                                        Already have an Account?
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

export default Verify;