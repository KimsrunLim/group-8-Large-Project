import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
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
                <div className="d-flex ms-auto">
                    <a className="nav-item nav-link active me-5" href="/leaderboard">About</a>
                    { /* functionality on leaderboard:
                       * - logged in & IF user score exists: show user at top of stats  */ }
                    <a className="nav-item nav-link active me-5" href="/about">Rank</a>
                    <a className="nav-item nav-link" width="30" height="30" href="/profile">
                        <FontAwesomeIcon icon={faUser} />
                        { /* functionality on profile image click:
                           * - if logged in -> account page
                           * - else -> signup page  */ }
                    </a>
                </div>
            </nav>
        </>
    );
};

export default Navbar;