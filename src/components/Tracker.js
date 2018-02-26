import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TrackerTable from './TrackerTable';

class Tracker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      trackerData: [],
    };
  }
  componentDidMount() {
    console.log(this.props.profile.sub);
    axios({
      method: 'POST',
      url: '/api/tracker/',
      data: {
        user_id: this.props.profile.sub,
      }
    })
    .then(currencies => {
      if (currencies) {
        this.setState({
          dataLoaded: true,
          trackerData: currencies.data.currencies,
        });
      }
    })
    .catch(err => {
      console.log('api/tracker call error', err);
    });
  }
  renderTable() {
    if (this.state.trackerData.length) {
      return this.state.trackerData.map(currency => {
        return (
          <div>
            <Col sm={10} md={6}>
              <TrackerTable key={currency.currency_id} currency={currency} />
            </Col>
          </div>
        )
      })
    }
    else {
      return (
        <div className="no-data-message">
          <Jumbotron>
            <h3>You aren't tracking any currencies. Try adding one!</h3>
          </Jumbotron>
        </div>
      )
    }
  }
  render() {
    return (
      <div className="Tracker">
        <Row>
          <LinkContainer to="/add"><Button bsStyle="success">Add</Button></LinkContainer>
          {this.state.dataLoaded ? <div>{this.renderTable()}</div> : <p>Loading... This could take a while</p>}
        </Row>
      </div>
    );
 }
}

export default Tracker;
