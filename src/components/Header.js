import React from 'react';
import { Navbar, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { login, logout, isLoggedIn } from '../utils/AuthService';
import { LinkContainer } from 'react-router-bootstrap';

const Header = () => {
  return (
    <div className="Header">
      <Navbar className="show-grid">
        <Navbar.Header sm={12} md={8}>
          <Navbar.Brand>
            The L33t H4ck3r'5 CryptoCurrency Tracker
          </Navbar.Brand>
        </Navbar.Header>

        <Nav sm={8} md={4}>

          <LinkContainer to="/">
            <NavItem>Top 50</NavItem>
          </LinkContainer>

          {
            (isLoggedIn()) ?
            <LinkContainer to="/tracker">
              <NavItem>My Tracker</NavItem>
            </LinkContainer>
            : ''
          }
          <NavItem>
           {
             (isLoggedIn()) ? ( <button className="btn btn-danger log" onClick={() => logout()}>Log out </button> ) : ( <button className="btn btn-info log" onClick={() => login()}>Log In</button> )
           }
          </NavItem>
        </Nav>

    </Navbar>
  </div>
  )
};

export default Header;
