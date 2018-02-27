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
      dataLoaded: false,
      fireRedirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
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
    console.log(this.state.profile);
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
        fireRedirect: true,
      })
    })
    .catch(err => {
      console.log('Posting to api/tracker error', err);
    })
  }
  renderForm() {
    return (
      <div className="add-form">
        <Jumbotron>
          <h3>Add a currency!</h3>
          <p>We get our cryptocurrency data from the amazing people at Coin Market Cap. If you're having trouble finding a currency, please check and make sure you're spelling it correctly.</p>
        </Jumbotron>
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
  render() {
    return (
      <div className="TrackerAdd">
        <Button href="/tracker" bsStyle="danger">Back to Tracker</Button>
        {this.renderForm()}
        {this.state.fireRedirect ? <Redirect push to="/tracker" /> : ''}
      </div>
    )
  }
}

export default TrackerAdd;
