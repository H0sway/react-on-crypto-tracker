import React, { Component } from 'react';
import axios from 'axios';
import Tracker from './Tracker';

export default class TrackerWrapper extends React {
  constructor() {
    super();
    this.state = {
      profile: {},
    }
  }
  componentDidMount() {
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
  render() {
    return (
      <div className="TrackerWrapper">
        {
          isAuthenticated() && (
              <div>
                <Tracker profile={this.state.profile} />
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
