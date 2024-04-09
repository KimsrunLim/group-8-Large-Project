import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUsers, faUser, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

// Apply styles to all NavLink items (replaced with "CustomNavLink")
const CustomNavLink = ({ to, icon, children, className, onClick }) => {
    const [hovering, setHovering] = React.useState(false);
    const location = useLocation();
    const isActive = location.pathname === to;

    // Bootstrap colors
    const bDark = '#292b2c';
    const bPrimary = '#007bff';

    const linkStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: hovering ? 'black' : isActive ? bPrimary : 'white', 
        borderTop: isActive ? '0.2rem solid #007bff' : '0.2rem solid transparent',
        backgroundColor: hovering ? bPrimary : 'transparent', 
    };

    return (
        <Link
            to={to}
            className={`${className} ${hovering ? 'hovered' : ''}`}
            style={linkStyle}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};

function Header() {
    const [collapsible, setCollapsible] = useState(window.innerWidth <= 768); // "md"

    const logOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    }

    // Screen width measurement (for "collapsible" flag)
    useEffect(() => {
        const changeWidth = () => {
            setCollapsible(window.innerWidth <= 768); // "md"
        };

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    // Styles

    const navContainer = "bg-black ms-0 me-5 w-100";

    const navContainerClass = collapsible 
        ? "py-2"
        : "py-0 my-0"; 

    const navItemClass = collapsible 
        ? "ms-3 my-1 py-2 d-flex justify-content-center align-items-center rounded"
        : "my-0 mx-0 px-3 pt-3 pb-4 align-items-center"; 

    return (
        <>
            <Navbar collapseOnSelect expand="md" className={`${navContainer} ${navContainerClass}}`} 
                style={{zIndex: 1030}}>
                <Container className="p-0">
                    <Navbar.Brand className="pb-2 h-100">
                        <img src={Logo} style={{height: "2rem"}} alt="GameOn Logo"></img>
                    </Navbar.Brand>

                    {/* Automatically collapse navbar on selected screens */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" data-bs-theme="dark"/>

                    {/* Navigation items that are collapsed on selected screens */}
                    <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
                        <Nav className={collapsible ? "flex-column" : "flex-row ms-auto my-0"}>
                            <CustomNavLink to={'/home'} className={`${navItemClass}`}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span className="ps-2">Home</span>
                            </CustomNavLink>

                            <CustomNavLink to={'/about'} className={`${navItemClass}`}>
                                <FontAwesomeIcon icon={faUsers} />
                                <span className="ps-2">About</span>
                            </CustomNavLink>

                            <CustomNavLink to={'/leaderboard'} className={`${navItemClass}`}>
                                <FontAwesomeIcon icon={faRankingStar} />
                                <span className="ps-2">Ranks</span>
                            </CustomNavLink>

                            <Dropdown>
                                <Dropdown.Toggle as={CustomNavLink} className={`${navItemClass}`}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="ps-2 pe-1">User</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-dark">
                                    <Dropdown.Item as={CustomNavLink} to={'/login'}>
                                        <FontAwesomeIcon icon={faSignInAlt} />
                                        <span className="ps-2">Log In</span>
                                    </Dropdown.Item>
                                    
                                    <Dropdown.Item as={CustomNavLink} onClick={logOut}>
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