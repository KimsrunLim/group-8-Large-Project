import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUsers, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const [collapsible, setCollapsible] = useState(window.innerWidth <= 768); // "md"

    const logOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    }

    useEffect(() => {
        const changeWidth = () => {
            setCollapsible(window.innerWidth <= 768); // "md"
        };

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    // if collapsible menu, center nav items
    const navItemClass = collapsible ? "ms-3 d-flex justify-content-center" : "";

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
                    <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
                        <Nav className={collapsible ? "flex-column" : "flex-row ms-auto"}>
                            <Nav.Link as={Link} to={'/home'} className={`text-white pe-4 m-1 ${navItemClass}`}>
                                <FontAwesomeIcon icon={faHouse} /><span className="ps-2">Home</span>
                            </Nav.Link>

                            <Nav.Link as={Link} to={'/about'} className={`text-white pe-4 m-1 ${navItemClass}`}>
                                <FontAwesomeIcon icon={faUsers} /><span className="ps-2">About</span>
                            </Nav.Link>

                            <Nav.Link as={Link} to={'/leaderboard'} className={`text-white pe-4 m-1 ${navItemClass}`}>
                                <FontAwesomeIcon icon={faRankingStar} /><span className="ps-2">Ranks</span>
                            </Nav.Link>

                            <Dropdown>
                                <Dropdown.Toggle as={Nav.Link} className={`text-white m-1 ${navItemClass}`}>
                                    <FontAwesomeIcon icon={faUser} /><span className="ps-2">User</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item as={Link} to={'/login'}>
                                        <FontAwesomeIcon icon={faSignInAlt} /><span className="ps-2">Log In</span>
                                    </Dropdown.Item>
                                    
                                    <Dropdown.Item onClick={logOut}>
                                        <FontAwesomeIcon icon={faSignOutAlt} /><span className="ps-2">Log Out</span>
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