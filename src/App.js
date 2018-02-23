import React, { Component } from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
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
      <div>
        <Navbar fluid>
          <Navbar.Header sm={12} md={8}>
            <Navbar.Brand>
              The L33t H4ck3r'5 CryptoCurrency Tracker
            </Navbar.Brand>
          </Navbar.Header>
          <Nav sm={8} md={4}>
            <LinkContainer to="/home">
              <NavItem>Top 50</NavItem>
            </LinkContainer>
            <LinkContainer to="/tracker">
              <NavItem>My Tracker</NavItem>
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
        </Navbar>
      </div>
    );
  }
}

export default App;
