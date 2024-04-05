import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faRankingStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown } from 'react-bootstrap';

function Navbar() {

    const loggingOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    }


    return (
        <>
            <style>
                {`
                    .nav-link {
                        color: #fff;
                        font-weight: 500;
                        font-size: 1.5rem;
                    }
                `}
            </style>

            <nav className="navbar navbar-expand-lg" style={{
                backgroundColor: '#000', paddingLeft: '2%', paddingRight: '2%'
            }}>
                <a className="navbar-brand nav-link d-flex align-items-center" href="/">
                    <span className="ps-1">Game<img src="/logo192.png" width="30" height="30"
                        className="d-inline-block ps-1" alt=""/>n</span>
                </a>
                {/* Home icon */}
                <div className="d-flex ms-auto">
                        <div className="nav-item">
                            <a className="nav-item nav-link active me-5" href="/home">
                                <FontAwesomeIcon icon={faHouse} /> {/* Add tooltip */}
                            </a>
                        </div>
                    <a className="nav-item nav-link active me-5" href="/about">
                        <FontAwesomeIcon icon={faUsers} />
                    </a>
                    { /* functionality on leaderboard:
                       * - logged in & IF user score exists: show user at top of stats  */ }
                    <a className="nav-item nav-link active me-5" href="/leaderboard">
                        <FontAwesomeIcon icon={faRankingStar} />
                    </a>
                        { /* functionality on profile image click:
                           * - if logged in -> account page
                           * - else -> signup page  */ }
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <FontAwesomeIcon icon={faUser} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-2">Log In</Dropdown.Item>
                            <Dropdown.Item href="#/action-3" onClick={loggingOut}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </nav>
        </>
    );
};

export default Navbar;