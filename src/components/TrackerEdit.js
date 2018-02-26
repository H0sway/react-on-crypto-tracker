import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { FormControl, FormGroup, ControlLabel, Button, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class TrackerEdit extends Component {
  constructor() {
    super();
    this.state = {
      dataLoaded: false,
      currency: null,
      investment: null,
      fireRedirect: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteInvestment = this.deleteInvestment.bind(this);
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: `/api/tracker/${this.props.match.params.id}`
    })
    .then(investment => {
      this.setState({
        dataLoaded: true,
        currency: investment.data.currency,
        investment: investment.data.currency.investment,
      })
      console.log(this.state.investment);
    })
    .catch(err => {
      console.log('edit api call error', err);
    })
  }
  handleChange(e) {
    this.setState({
      investment: e.target.value,
    })
  }
  handleSubmit(e) {
    e.preventDefault();
    axios({
      method: 'PUT',
      url: `/api/tracker/${this.props.match.params.id}`,
      data: {
        id: this.props.match.params.id,
        investment: this.state.investment,
      }
    })
    .then(harambe => {
      this.setState({
        fireRedirect: true,
      })
    })
    .catch(err => {
      console.log("update error", err);
    })
  }
  deleteInvestment() {
    axios({
      method: 'DELETE',
      url: `/api/tracker/${this.props.match.params.id}`,
    })
    .then(thenavysealcopypasta => {
      this.setState({
        fireRedirect: true,
      })
    })
    .catch(err => {
      console.log('delete error', err);
    })
  }
  editForm() {
    return (
      <div className="edit-form">
        <form onSubmit={this.handleSubmit}>
          <ControlLabel>Update your investment in {this.state.currency.currency_id}:</ControlLabel>
          <FormControl
            name="investment"
            type="number"
            step="any"
            value={this.state.investment}
            onChange={this.handleChange}
          />
          <Button bsStyle="primary" type="submit">Update Investment</Button>
        </form>
        <Button bsStyle="danger" onClick={this.deleteInvestment}>Delete This Investment</Button>
      </div>
    )
  }
  render() {
    return (
      <div className="TrackerEdit">
        <LinkContainer to="/tracker">
          <Button bsStyle="warning">Back to Tracker</Button>
        </LinkContainer>
        {this.state.dataLoaded ? this.editForm() : ''}
        {this.state.fireRedirect ? <Redirect push to="/tracker" /> : ''}
      </div>
    );
  }
}
