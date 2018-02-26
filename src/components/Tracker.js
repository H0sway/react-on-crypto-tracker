import React, { Component } from 'react';
import axios from 'axios';
import { JumboTron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import TrackerTable from './TrackerTable';

class Tracker extends Component {
  constructor() {
    super();
    this.state = {
      dataLoaded: false,
      trackerData: [],
      profile: {},
    }
  }
  componentDidMount() {
  //   axios({
  //     method: 'POST',
  //     url: `api/tracker/${user.id}`,
  //   })
  //   .then(currencies => {
  //     this.setState({
  //       dataLoaded: true,
  //       trackerData: currencies.data.data,
  //     });
  //   })
  //   .catch(err => {
  //     console.log('api/tracker call error', err);
  //   });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }

  }
  login() {
    this.props.auth.login();
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
    console.log(this.state.profile);
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="Tracker">
        {
          isAuthenticated() && (
              <div>
                {this.state.dataLoaded ? this.renderTable() : <p>Loading... This could take a while</p>}
              </div>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    );
  }
}

export default Tracker;
