import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/NameLogo-Blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isHomeHovered, setIsHomeHovered] = useState(false);
    const [isLeaderboardHovered, setisLeaderboardHovered] = useState(false);
    const [isDropdownHovered, setisDropdownHovered] = useState(false);
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
            <Navbar collapseOnSelect expand="md" className="bg-black m-0 p-0" style={{ zIndex: 1030 }}>
                <Container>
                    <Navbar.Brand>
                        <img src={Logo} style={{ height: "2.5rem" }} alt="GameOn Logo"></img>
                    </Navbar.Brand>

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" className='bg-white' />

                    <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
                        <Nav>
                            <Nav.Link className="text-white p-3" height="90px" href="/home" 
                                            onMouseEnter={() => setIsHomeHovered(true)}
                                            onMouseLeave={() => setIsHomeHovered(false)}
                                            style={{
                                                backgroundColor: isHomeHovered ? '#007bff' : 'black',
                                                color: isHomeHovered ? 'white' : 'black', 
                                            }}>
                                <FontAwesomeIcon icon={faHouse} /><span className="ps-2">Home</span>
                            </Nav.Link>


                            <Nav.Link className="text-white p-3" height="90px" href="/leaderboard"
                                            onMouseEnter={() => setisLeaderboardHovered(true)}
                                            onMouseLeave={() => setisLeaderboardHovered(false)}
                                            style={{
                                                backgroundColor: isLeaderboardHovered ? '#007bff' : 'black',
                                                color: isLeaderboardHovered ? 'white' : 'black', 
                                            }}>
                                <FontAwesomeIcon icon={faRankingStar} /><span className="ps-2">Leaderboard</span>
                            </Nav.Link>

                            <Dropdown>
                                <Dropdown.Toggle className="m-2" variant="light" id="dropdown-basic"
                                    onMouseEnter={() => setisDropdownHovered(true)}
                                    onMouseLeave={() => setisDropdownHovered(false)}
                                    style={{
                                        backgroundColor: isDropdownHovered ? '#007bff' : 'white',
                                        color: isDropdownHovered ? 'white' : 'black', 
                                    }}>
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