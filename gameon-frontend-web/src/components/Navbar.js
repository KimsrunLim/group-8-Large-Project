import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUsers, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const loggingOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    }

    return (
        <>
            <Navbar collapseOnSelect expand="md" className="bg-black" style={{zIndex: 1030}}>
                <Container>
                    <Navbar.Brand>
                        <img src={Logo} style={{height: "2rem"}} alt="GameOn Logo"></img>
                    </Navbar.Brand>

                    {/* Automatically collapse navbar on selected screens */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" data-bs-theme="dark"/>

                    {/* Navigation items that are collapsed on selected screens */}
                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-center">
                        <Nav>
                            <Nav.Link className="text-white pe-3 m-1" href="/home">
                                <FontAwesomeIcon icon={faHouse} /><span className="ps-2">Home</span>
                            </Nav.Link>
                            
                            <Nav.Link className="text-white pe-3 m-1" href="/about">
                                <FontAwesomeIcon icon={faUsers} /><span className="ps-2">About</span>
                            </Nav.Link>

                            <Nav.Link className="text-white pe-3 m-1" href="/leaderboard">
                                <FontAwesomeIcon icon={faRankingStar} /><span className="ps-2">Ranks</span>
                            </Nav.Link>

                            <Dropdown>
                                <Dropdown.Toggle as={Nav.Item} className="text-white m-1">
                                    <FontAwesomeIcon icon={faUser} /><span className="ps-2">User</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="/login">
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                        <span className="ps-2">Log In</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={loggingOut}>
                                        <FontAwesomeIcon icon={faSignOutAlt} />
                                        <span className="ps-2">Log Out</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
};

export default Header;
