import React, { Component } from 'react';
import { Row, Col, Modal, PageHeader, Jumbotron, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class About extends Component {
  constructor(props, context) {
    super();
    this.state = { show: false }
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleShow() {
    this.setState({ show: true });
  }
  handleClose() {
    this.setState({ show: false });
  }
  render() {
    return (
      <div className="About">
        <PageHeader>
          About this page
        </PageHeader>
        <Jumbotron>
          <h4>Welcome to my CryptoCurrency investment tracker!</h4>
          <p>
             With the "Tulip Mania" surrounding CryptoCurrencies reaching an all time high in winter of 2017 I wanted to create a web app that would allow me research a little more into the subject. This tracker is a place where users can sign in and access their own personal tracker where they can add currencies to their own personal list along with the amount they own (if any) to easily calculate how much their investment is worth.
          </p>
          <br />
          <p> This site gets it's data on CryptoCurrencies from the site <a className="about-links" href="https://coinmarketcap.com">Coin Market Cap.</a>If you'd like more in depth information or are having difficulty finding something here head over to their site. They limit requests to their API to 10 per minute so if this site starts running slowly wait a minute or two before accessing it again. If you add a currency to your tracker and it doesn't show up try again but check your spelling carefully. When nothing shows up we were unable to find that currency in the Coin Market Cap database. Click the button below to reach the developer.
          </p>
        </Jumbotron>
        <Button bsStyle="primary" onClick={this.handleShow}>Contact Information</Button>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Contact</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <ul className="contact">
                <Col xs={6} md={5}>
                  <li>
                    <strong>
                      Email:
                    </strong>
                    <br />
                    jkrussell756@gmail.com
                  </li>
                </Col>
                <Col xs={6} md={5}>
                  <li>
                    <strong>
                      Github:
                    </strong>
                    <br />
                    <a className="about-links" href="https://github.com/H0sway">Hosway</a>
                  </li>
                </Col>
              </ul>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='danger' onClick={this.handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
    </div>
    )
  }
}

export default About;
