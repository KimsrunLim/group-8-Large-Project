import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faHouse, faUser } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
    return (
        <>
        
            <nav className="navbar navbar-expand-lg navbar-dark bg-black">
                {/* Logo */}
                <div className="container-fluid fw-bold text-white"> 
                    <div className="navbar-brand d-flex align-items-center me-auto ms-3">
                        Game <img src="/logo192.png" width="22" height="22" className="d-inline-block" alt="Game On Logo"/>N!
                    </div>
                    <div className="d-flex align-items-center ms-auto">
                        {/* Home */}
                        <div className="nav-item">
                            <a className="nav-link active ps-4 pe-4" href="/home">
                                <FontAwesomeIcon icon={faHouse} /> {/* Add tooltip */}
                            </a>
                        </div>
                        {/* About Us */}
                        <div className="nav-item">
                            <a className="nav-link active ps-4 pe-4" href="/about">ABOUT</a>
                        </div>
                        {/* Leaderboard/Rank */}
                        <div className="nav-item">
                            <a className="nav-link active ps-4 pe-4" href="/leaderboard">Rank</a>
                        </div>
                        {/* Profile Dropdown */}
                        {/* look into menu forms & external content */}
                        <div className="nav-item pe-4">
                            <div className="btn-group">
                                <button type="button" class="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <FontAwesomeIcon icon={faUser} /> {/* Add tooltip */}
                                </button>
                                <div className="dropdown-menu dropdown-menu-right">
                                    <span className="dropdown-item name">Welcome!</span>
                                    <div className="dropdown-divider"></div>
                                    <button className="dropdown-item edit-profile" onClick={"hi"}>Edit Profile</button>
                                    <button className="dropdown-item signup/logout" onClick={"bye"}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;