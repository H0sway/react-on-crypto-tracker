import React, { Component } from 'react';
import axios from 'axios';
import { Jumbotron, Button } from 'react-bootstrap';
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
      this.setState({
        dataLoaded: true,
        trackerData: currencies.data.currencies,
      });
    })
    .catch(err => {
      console.log('api/tracker call error', err);
    });
  }
  renderTable() {
    if (this.state.trackerData) {
      return this.state.trackerData.map(currency => {
        return (
          <TrackerTable key={currency.currency_id} currency={currency} />
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
        <LinkContainer to="/add"><Button bsStyle="success">Add</Button></LinkContainer>
        {this.state.dataLoaded ? <div>{this.renderTable()}</div> : <p>Loading... This could take a while</p>}
      </div>
    );
 }
}

export default Tracker;
