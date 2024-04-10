import React, {useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faRankingStar, faUser, faUserPlus, faSignInAlt, faSignOutAlt,
    faTimes, faBars
 } from '@fortawesome/free-solid-svg-icons';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import Logo from '../assets/NameLogo-Blue.png';
import 'bootstrap/dist/css/bootstrap.min.css';

// colors
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
        fontWeight: isActive ? 'bold' : '',
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
    const [expandedMenu, setExpandedMenu] = useState(false);
    const [expandedDropdown, setExpandedDropdown] = useState(false);

    // Read cookie and set username on component mount.
    useEffect(() => {
        setUsername(readCookie());
    }, []);

    // Toggle screen width
    useEffect(() => {
        const handleResize = () => setCollapsible(window.innerWidth <= 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const logOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/";
    };

    // Toggles the expanded state which controls the dropdown
    const toggleDropdown = () => setExpandedDropdown(prevExpanded => !prevExpanded);

    // Toggle the main navbar (responsive behavior)
    const toggleNavbar = () => setExpandedMenu(prevExpanded => !prevExpanded);

    // 
    // Styles
    // 

    const navContainer = "bg-black w-100 border-none";

    const navContainerClass = collapsible 
        ? "py-2"
        : "py-0 my-0"; 

    const navItemClass = collapsible 
        ? "my-0 py-3 d-flex justify-content-center align-items-center"
        : "my-0 mx-0 px-4 pt-3 pb-4 align-items-center"; 

    const navLinks = [
        { to: '/home', icon: faHouse, text: 'Home' },
        { to: '/leaderboard', icon: faRankingStar, text: 'Ranks' }
    ];

    // Updated styles for centering when collapsible
    const centeredDropdownContainer = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '25%',
        textAlign: 'center',
        borderRadius: '0',
        left: '50%', // Position halfway across the container
        transform: 'translateX(-50%)', // Shift it back by half its own width
    };

    const centeredDropdownMenu = {
        textAlign: 'center', // Center align the text within the dropdown
        display: 'block',
    };

    return (
        <>
            {/* Collapsible Navigation (if screen <= "md") */}
            <Navbar collapseOnSelect expand="md" className={`${navContainer} ${navContainerClass}`} 
                style={{ zIndex: 1030 }}>
                <Container className="p-0 d-flex justify-content-between">

                    {/* Navbar Brand Logo */}
                    <Navbar.Brand className="ms-0 pb-2 h-100">
                        <img src={Logo} alt="GameOn Logo" style={{ height: '3rem' }} />
                    </Navbar.Brand>

                    {/* Hamburger Menu Icon */}
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={toggleNavbar}>
                        <FontAwesomeIcon icon={expandedMenu ? faTimes : faBars} className="text-white fs-2" />
                    </Navbar.Toggle>

                    {/* Nav Items */}
                    <Navbar.Collapse id="responsive-navbar-nav" className="w-100">
                        <Nav className={`align-items-center
                            ${collapsible ? "flex-col w-100" : "flex-row ms-auto my-0"}`}>
                            
                            {/* Navigation Links */}
                            <CustomNavLink to="/home" className="flex-col py-2 d-flex justify-content-center 
                                align-items-center text-align-center" style={{width:'40%'}}>
                                <FontAwesomeIcon icon={faHouse} />
                                <span className="ps-2">Home</span>
                            </CustomNavLink>
                            {collapsible && (
                                // Simulate divider for navbar
                                <Nav.Link disabled className="bg-dark m-0 p-0 mt-1"
                                    style={{height: '0.1rem', width: '40%'}}>
                                    -
                                </Nav.Link>
                            )}
                            <CustomNavLink to="/leaderboard" className="flex-col py-2 d-flex justify-content-center 
                                align-items-center text-align-center" style={{width:'40%'}}>
                                <FontAwesomeIcon icon={faRankingStar} />
                                <span className="ps-2">Ranks</span>
                            </CustomNavLink>

                            {/* User Dropdown Menu */}
                            <Dropdown className={`bg-dark flex-col m-0 d-flex justify-content-center
                                align-items-center text-align-center ${collapsible ? 'mt-1' : ''}`}
                                style={{  width: '40%', zIndex:'1050', borderRadius: '0' }}
                                show={expandedDropdown} // Use the 'expanded' state for controlling the Dropdown visibility
                                onToggle={toggleDropdown} // Attach the toggle function to Dropdown's onToggle
                            >
                                <Dropdown.Toggle as={CustomNavLink} to="#" 
                                    className="my-0 ps-2 py-2 d-flex justify-content-center align-items-center" 
                                >
                                        <FontAwesomeIcon icon={faUser} />
                                    <span className="ps-2 pe-1 px-3">User</span>
                                </Dropdown.Toggle>

                                {/* Dropdown Items */}
                                <Dropdown.Menu className="bg-dark p-0 m-0" style={{ textAlign: 'center', display: 'block' }}>
                                    <Dropdown.Header className="pb-0 px-3 text-white">
                                        <h5>{username}</h5>
                                    </Dropdown.Header>
                                    <Dropdown.Divider className="bg-primary mt-0 mb-0" /> 

                                    {username === "Guest" ? ( // as Guest
                                        <>
                                            <Dropdown.Item href="/signup" className="py-2">
                                                <FontAwesomeIcon icon={faUserPlus} className="ps-3" />
                                                <span className="ps-2">Sign Up</span>
                                            </Dropdown.Item>
                                            <Dropdown.Divider className="bg-dark mt-0 mb-0" /> 
                                            <Dropdown.Item href="/login" className="py-2">
                                                <FontAwesomeIcon icon={faSignInAlt} className="ps-3" />
                                                <span className="ps-2">Log In</span>
                                            </Dropdown.Item>
                                        </>
                                    ) : ( // as Logged In User
                                        <Dropdown.Item onClick={logOut} className="py-2">
                                            <FontAwesomeIcon icon={faSignOutAlt} className="ps-3" />
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
}

export default Header;