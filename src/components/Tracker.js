import React, { Component } from 'react';
import axios from 'axios';
import { JumboTron } from 'react-bootstrap';
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
  console.log(this.props.profile);
   axios({
    method: 'POST',
    url: `api/tracker/${this.props.profile.sub}`,
   })
   .then(currencies => {
     this.setState({
       dataLoaded: true,
       trackerData: currencies.data.data,
     });
   })
   .catch(err => {
     console.log('api/tracker call error', err);
   });
  } 
  renderTable() {
    if (this.state.trackerData.length) {
     this.state.trackerdata.map(currency => {
      return <TrackerTable key={currency.currency_id} currency={currency} />
     })
    }
    else {
      return (
        <div className="no-data-message">
          <Jumbotron>
            <h3>You aren't tracking any currencies. Try adding one!</h3>
          </Jumbotron>
          A
        </div>
      )
    }
  }
  render() {
    return (
      <div className="Tracker">
        {this.state.dataLoaded ? this.renderTable() : <p>Loading... This could take a while</p>}
      </div>
    );
 }
}

export default Tracker;
