import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  renewToken() {
    this.props.auth.renewToken();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div className="Header">
        <Navbar fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              The L33t H4ck3r'5 CryptoCurrency Tracker
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <LinkContainer to="/home" className="nav-link">
                <NavItem>Top 50</NavItem>
              </LinkContainer>
              <LinkContainer to="/tracker" className="nav-link">
                <NavItem>My Tracker</NavItem>
              </LinkContainer>
              <LinkContainer to="/about" className="nav-link">
                <NavItem>About</NavItem>
              </LinkContainer>
              {!isAuthenticated() &&
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.login.bind(this)}
                >
                  Log In
                </Button>}
              {isAuthenticated() &&
                <Button
                  bsStyle="primary"
                  className="btn-margin"
                  onClick={this.logout.bind(this)}
                >
                  Log Out
                </Button>}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <footer>
          <p>Created by Joshua K. Russell</p>
        </footer>
      </div>
    );
  }
}

export default App;
