import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
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
          <LinkContainer to="/tracker">
            <NavItem>My Tracker</NavItem>
          </LinkContainer>
        </Nav>
    </Navbar>
  </div>
  )
};

export default Header;
