import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Button, Jumbotron } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class TrackerAdd extends Component {
  constructor() {
    super();
    this.state = {
      currencyId: null,
      investment: null,
      profile: {},
      searching: false,
      notFound: false,
      dataLoaded: false,
      fireRedirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { isAuthenticated  } = this.props.auth;
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
  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value,
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'GET',
      url: `https://api.coinmarketcap.com/v1/ticker/?limit=0`,
    })
    .then(cryptos => {
      this.setState({searching: true});
      cryptos.data.forEach(crypto => {
        console.log(crypto.id);
        if (crypto.id === this.state.currencyId.toLowerCase()) {
          return axios({
            method: 'POST',
            url: '/api/tracker/add',
            data: {
              user_id: this.state.profile.sub,
              currency_id: this.state.currencyId,
              investment: this.state.investment,
            }
          })
          .then(currency => {
            this.setState({
              searching: false,
              fireRedirect: true,
            })
          })
          .catch(err => {
            console.log('Posting to api/tracker error', err);
          });
        }
      })
    })
    .catch(err => {
      console.log("finding the currency error", err);
    })
  }
  renderForm() {
    return (
      <div className="add-form">
        <Jumbotron>
          <h3>Add a currency!</h3>
          <p>We get our cryptocurrency data from the amazing people at Coin Market Cap. If you're having trouble finding a currency, please check and make sure you're spelling it correctly.</p>
        </Jumbotron>
        {this.notTrue ? <p>Sorry, we couldn't find that. Please try something else</p> : ""}
        <form onSubmit={this.handleSubmit}>
          <ControlLabel>Currency: </ControlLabel>
          <FormControl
            name="currencyId"
            type="text"
            value={this.state.currencyId}
            placeholder="Ex. Bitcoin"
            onChange={this.handleChange}
          />
          <ControlLabel>Investment: </ControlLabel>
          <FormControl
            name="investment"
            type="number"
            step="any"
            value={this.state.investment}
            placeholder='0'
            onChange={this.handleChange}
          />
          <Button bsStyle="primary" type="submit">Add Me!</Button>
        </form>
      </div>
    )
  }
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="TrackerAdd">
        {
         isAuthenticated() && (
         <div>
          <Button href="/tracker" bsStyle="danger">Back to Tracker</Button>
          {this.state.searching ? <p>Searching... Sorry for the wait</p> : <div>{this.renderForm()}</div>}
            {this.state.fireRedirect ? <Redirect push to="/tracker" /> : ''}
          </div>
         )
        }
        {
          !isAuthenticated() && (
            <h4>You are not logged in! Please{' '}
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
    )
  }
}

export default TrackerAdd;
