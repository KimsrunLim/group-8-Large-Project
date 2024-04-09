import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse, faUsers, faRankingStar, faUser, faSignInAlt, faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import Logo from '../assets/GameOnLogoWhite.png';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
    const [collapsible, setCollapsible] = useState(window.innerWidth <= 768); // "md"

    const logOut = () => {
        document.cookie = "username= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
        window.location.href = "/login";
    };

    useEffect(() => {
        const changeWidth = () => {
            setCollapsible(window.innerWidth <= 768); // "md"
        };

        window.addEventListener('resize', changeWidth);

        return () => {
            window.removeEventListener('resize', changeWidth);
        };
    }, []);

    const navItems = [
        { name: 'Home', url: '/home', icon: faHouse },
        { name: 'About', url: '/about', icon: faUsers },
        { name: 'Ranks', url: '/leaderboard', icon: faRankingStar },
        { name: 'User', icon: faUser, children: [
            { name: 'Log In', url: '/login', icon: faSignInAlt },
            { name: 'Log Out', action: logOut, icon: faSignOutAlt }
        ]}
    ];

    const navItemClass = collapsible ? "ms-1 d-flex justify-content-center" : ""; // Custom class for centering nav items

    const renderNavItems = (items) => {
        return items.map((item, index) => (
            item.url ? (
                <Nav.Link key={index} as={Link} to={item.url} className={`text-white pe-3 m-1 ${navItemClass}`}>
                    <FontAwesomeIcon icon={item.icon} /><span className="ps-2">{item.name}</span>
                </Nav.Link>
            ) : item.children ? (
                <Dropdown key={index}>
                    <Dropdown.Toggle as={Nav.Link} className={`text-white m-1 ${navItemClass}`}>
                        <FontAwesomeIcon icon={item.icon} /><span className="ps-2">{item.name}</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        {item.children.map((child, childIndex) => (
                            <Dropdown.Item key={childIndex} as={Link} to={child.url || '#'} onClick={child.action}>
                                <FontAwesomeIcon icon={child.icon} /><span className="ps-2">{child.name}</span>
                            </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
            ) : null
        ));
    };

    return (
        <Navbar collapseOnSelect expand="md" className="bg-black" style={{ zIndex: 1030 }}>
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <img src={Logo} style={{ height: "2rem" }} alt="GameOn Logo" />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" data-bs-theme="dark"/>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className={collapsible ? "flex-column" : "flex-row"}>
                        {renderNavItems(navItems)}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;