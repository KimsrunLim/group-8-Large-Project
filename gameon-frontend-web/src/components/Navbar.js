import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUsers, faUser, faUserPlus, faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

// Bootstrap colors
const bPrimary = '#007bff';

// NavLink styles
const CustomNavLink = ({ to, children, className, isDropdownItem, onClick }) => {
    const [hovering, setHovering] = React.useState(false);
    const location = useLocation();
    const isActive = location.pathname === to;

    const baseStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none',
        backgroundColor: hovering ? bPrimary : 'transparent',
        // color primary if active, black on hover, white otherwise 
        color: isActive ? bPrimary : (hovering ? 'black' : 'white'),
        width: '100%',
    };

    // give navbar links primary top border if active
    const navLinkStyle = {
        ...baseStyle,
        borderTop: isActive ? `0.2rem solid ${bPrimary}` : '0.2rem solid transparent',
    };

    const dropdownItemStyle = {
        ...baseStyle,
        display: 'block',
    };

    const linkStyle = isDropdownItem ? dropdownItemStyle : navLinkStyle;

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

const readCookie = () => {
    let data = document.cookie;
    let tokens = data.split("=");
    let username = "Guest"
    if (tokens[0] === "username") {
        username = tokens[1];
    }

    return username;
}

function Header() {
    const [username, setUsername] = useState(null);
    const [collapsible, setCollapsible] = useState(window.innerWidth <= 768); // "md"

    // Read cookie and set username on component mount.
    useEffect(() => {
        setUsername(readCookie());
    }, []);

    // Log out.
    const logOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    }
    
    // Screen width measurement (for collapsible menu toggling).
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

    const navContainer = "bg-black w-100";

    const navContainerClass = collapsible 
        ? "py-2"
        : "py-0 my-0"; 

    const navItemClass = collapsible 
        ? "ms-3 my-1 py-2 d-flex justify-content-center align-items-center rounded"
        : "my-0 mx-0 px-3 pt-3 pb-4 align-items-center"; 

    const navLinks = [
        { to: '/home', icon: faHouse, text: 'Home' },
        { to: '/about', icon: faUsers, text: 'About' },
        { to: '/leaderboard', icon: faRankingStar, text: 'Ranks' }
    ];

    // Updated styles for centering when collapsible
    const centeredDropdownContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '40%',
        left:'34%',
        textAlign: 'center',
        paddingLeft: collapsible ? '0' : 'paddingValue',
    };

    // Conditionally apply centered styles if collapsible
    const dropdownContainer = collapsible ? centeredDropdownContainer : {};

    return (
        <>
            <Navbar collapseOnSelect expand="md" className={`${navContainer} ${navContainerClass}}`} 
                style={{ zIndex: 1030}}>
                <Container className="p-0">
                    <Navbar.Brand className="ms-0 pb-2 h-100">
                        <img src={Logo} style={{height: "2rem"}} alt="GameOn Logo"></img>
                    </Navbar.Brand>

                    {/* Automatically collapse navbar on selected screens */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" data-bs-theme="dark"/>

                    {/* Navigation items that are collapsed on selected screens */}
                    <Navbar.Collapse id="responsive-navbar-nav" className="w-100">

                        {/* Map nav links for more condensed display code */}
                        <Nav className={collapsible ? "flex-column" : "flex-row ms-auto my-0"}>
                            {navLinks.map((link, index) => (
                                <React.Fragment key={link.text}>
                                    <CustomNavLink to={link.to} className={navItemClass}>
                                        <FontAwesomeIcon icon={link.icon} />
                                        <span className="ps-2">{link.text}</span>
                                    </CustomNavLink>
                                    {collapsible && (
                                        // Simulate divider for navbar
                                        <Nav.Link disabled className="bg-dark m-0 p-0 opacity-1"
                                            style={{height: '0.1rem'}}>
                                            -
                                        </Nav.Link>
                                    )}
                                </React.Fragment>
                            ))}

                            <Dropdown className={`bg-dark flex-col m-0 p-0 border-0 me-5`}
                                style={dropdownContainer}>
                                <Dropdown.Toggle as={CustomNavLink} className={`${navItemClass}`}>
                                        <FontAwesomeIcon icon={faUser} />
                                        <span className="ps-2 pe-1">User</span>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="bg-dark m-0 p-0 z-200">
                                    <Dropdown.Header className="pb-0 text-white ps-3">
                                        <h5>{username}</h5>
                                    </Dropdown.Header>
                                    
                                    <Dropdown.Divider className="bg-primary mt-0 mb-0" /> 

                                    {/* Conditionally display "Log In" and "Sign Up" if username is "Guest" */}
                                    {username === "Guest" && (
                                        <>
                                            <CustomNavLink to={'/signup'} isDropdownItem className="py-2">
                                                <FontAwesomeIcon icon={faUserPlus} className="ps-3" />
                                                <span className="ps-2 h-100">Sign Up</span>
                                            </CustomNavLink>

                                            <Dropdown.Divider className="bg-dark mt-0 mb-0" /> 

                                            <CustomNavLink to={'/login'} isDropdownItem className="py-2"> 
                                                <FontAwesomeIcon icon={faSignInAlt} className="ps-3"/>
                                                <span className="ps-2"> Log In</span>
                                            </CustomNavLink>
                                        </>
                                    )}

                                    {/* Display "Log Out" if username is not "Guest" */}
                                    {username !== "Guest" && (
                                        <CustomNavLink onClick={logOut} isDropdownItem>
                                            <FontAwesomeIcon icon={faSignOutAlt} className="ps-3"/>
                                            <span className="ps-2">Log Out</span>
                                        </CustomNavLink>
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