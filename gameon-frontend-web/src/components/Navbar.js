import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHouse, faRankingStar, faUsers } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, Navbar, Container, Nav } from 'react-bootstrap';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

    const loggingOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    }

    return (
        <>
            <Navbar className="bg-black">
                <Container>
                <Navbar.Brand>
                <img src={Logo} style={{height: "2rem"}}></img>
                </Navbar.Brand>
                <Nav>
                    <Nav.Link className="text-white me-4" href="/home">
                        <FontAwesomeIcon icon={faHouse} />
                    </Nav.Link>
                    <Nav.Link className="text-white me-4" href="/about">
                        <FontAwesomeIcon icon={faUsers} />
                    </Nav.Link>
                    <Nav.Link className="text-white me-4" href="/leaderboard">
                        <FontAwesomeIcon icon={faRankingStar} />
                    </Nav.Link>
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                        <FontAwesomeIcon icon={faUser} />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-2">Log In</Dropdown.Item>
                            <Dropdown.Item onClick={loggingOut}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Nav>
                
                </Container>
            </Navbar>
        </>
    );
};

export default Header;