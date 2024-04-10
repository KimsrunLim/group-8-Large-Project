import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/Logo-Blue.png';
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

                window.location.href = '/login';
            }
            else {
                setMessage("Invalid Verification Code");
            }
        }
        catch (e) {
            console.log('ERROR');
        }


    };

    const linkHover = "link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover";
    const [isSubmitHovered, setIsSubmitHovered] = useState(false);

    return (
        <>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-11 col-md-8 col-lg-6">

                        { /* Logo */}
                        <div className="logo pt-5 py-4 d-flex justify-content-center">
                            <img src={Logo} className='img-fluid' alt="GameOn Logo" style={{ maxWidth: "28rem" }} />
                        </div>

                        {/* Verification Box */}
                        <div className="verify-container">
                            <div className="card">

                                { /* Header - Title */}
                                <h1 className="card-header p-3 text-center align-middle fw-bold 
                                        text-white border-bottom border-5 border-primary bg-black">
                                    Verify Account
                                </h1>

                                { /* Form */}
                                <div className="card-body mx-2">
                                    <form onSubmit={doValidate}>

                                        { /* Verify Code */}
                                        <div className="form-group pt-3 pb-1">
                                            <label className="pb-1 text-dark fw-bold fs-5">
                                                Verification Code
                                            </label>
                                            <div className="input-group border rounded">
                                                <span className="input-group-text px-3 border-0 border-end">
                                                    <FontAwesomeIcon icon={faLock} />
                                                </span>
                                                <input className="form-control form-control-lg
                                                    border-0 border-end rounded bg-transparent"
                                                    type="text" id="verificationCode" 
                                                    value={verificationCode} 
                                                    placeholder="XXXXXX" 
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>

                                        { /* Error Feedback */}
                                        {message &&
                                            <div data-testid="error-message" className="text-danger 
                                                text-center mx-auto pt-3 pb-0 fs-6 fw-bold">
                                                {message}
                                            </div>
                                        }

                                        { /* Submit */}
                                        <button type="submit" data-testid="submit-button" 
                                            className="btn mt-4 mb-3 w-100 fs-5 fw-bold"
                                            onMouseEnter={() => setIsSubmitHovered(true)}
                                            onMouseLeave={() => setIsSubmitHovered(false)}
                                            style={{
                                                backgroundColor: isSubmitHovered ? 'black' : '#007bff',
                                                color: isSubmitHovered ? 'white' : 'black', 
                                            }}
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                                { /* Footer: Switch to Login */}
                                <div className='footer py-3 border-top border-2 border-dark bg-light 
                                        d-flex justify-content-center align-items-center text-center 
                                        fw-medium rounded-bottom fs-6'>
                                    Already have an account?
                                    <a href="/login" className={`fw-bolder ps-2 ${linkHover}`}>
                                        Log In  
                                    </a>
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