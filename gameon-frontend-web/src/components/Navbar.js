import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUsers, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        readCookie();
    }, []);

    const readCookie = () => {
        let data = document.cookie;
        let tokens = data.split("=");
        // console.log("token: ", tokens);
        if (tokens[0] === "username") {
            setIsLoggedIn(true);
            return tokens[1];
        }
    }

    const loggingOut = () => {
        // Implement logout logic here
        // console.log(isLoggedIn);

        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        setIsLoggedIn(false);
        window.location.href = "/";
    };

    return (
        <>
            <Navbar collapseOnSelect expand="md" className="bg-black" style={{ zIndex: 1030 }}>
                <Container>
                    <Navbar.Brand>
                        <img src={Logo} style={{ height: "2rem" }} alt="GameOn Logo"></img>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link className="text-white pe-5" href="/home">
                                <FontAwesomeIcon icon={faHouse} /><span className="ps-2">Home</span>
                            </Nav.Link>

                            {/* <Nav.Link className="text-white pe-5" href="/about">
                                <FontAwesomeIcon icon={faUsers} /><span className="ps-2">About</span>
                            </Nav.Link> */}

                            <Nav.Link className="text-white pe-5" href="/leaderboard">
                                <FontAwesomeIcon icon={faRankingStar} /><span className="ps-2">Leaderboard</span>
                            </Nav.Link>

                            <Dropdown>
                                <Dropdown.Toggle variant="light" id="dropdown-basic">
                                    <FontAwesomeIcon icon={faUser} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    {!isLoggedIn && (
                                        <Dropdown.Item href="/login">
                                            <FontAwesomeIcon icon={faSignInAlt} />
                                            <span className="ps-2">Log In</span>
                                        </Dropdown.Item>
                                    )}
                                    {isLoggedIn && (
                                        <Dropdown.Item onClick={loggingOut}>
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span className="ps-2">Log Out</span>
                                        </Dropdown.Item>
                                    )}
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
