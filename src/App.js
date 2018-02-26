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
      <div>
        <Navbar fluid>
          <Row className="show-grid">
            <Col  sm={12} md={6}>
              <Navbar.Header>
                <Navbar.Brand>
                  The L33t H4ck3r'5 CryptoCurrency Tracker
                </Navbar.Brand>
              </Navbar.Header>
            </Col>
            <Nav>
              <LinkContainer to="/home">
                <NavItem sm={6} md={2}>Top 50</NavItem>
              </LinkContainer>
                <LinkContainer to="/tracker">
                  <NavItem sm={6} md={2}>My Tracker</NavItem>
                </LinkContainer>
              <Col sm={8} md={2}>
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
              </Col>
            </Nav>
          </Row>
        </Navbar>
      </div>
    );
  }
}

export default App;
