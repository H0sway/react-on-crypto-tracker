import React, { Component } from 'react';
import axios from 'axios';
import Tracker from './Tracker';

export default class TrackerWrapper extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      dataLoaded: false,
    }
  }
  componentDidMount() {
    const { isAuthenticated } = this.props.auth;
    if (isAuthenticated()) {
      const { userProfile, getProfile } = this.props.auth;
      if (!userProfile) {
        getProfile((err, profile) => {
          this.setState({
            profile: profile,
            dataLoaded: true,
          });
        });
      } else {
        this.setState({
          profile: userProfile,
          dataLoaded: true,
        });
      }
    }
  }
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="TrackerWrapper">
        {
          isAuthenticated() && (
              <div>
                {this.state.dataLoaded ? <Tracker profile={this.state.profile} /> : ''}
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
