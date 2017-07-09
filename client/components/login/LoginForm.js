import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoginForm extends Component {
  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email_field.value.trim();
    const password = this.refs.password_field.value.trim();
    this.props.submitAction(email, password);
  }
  render() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Email"
            type="email"
            id="email"
            ref="email_field"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            ref="password_field"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            {this.props.submitBtnLabel}
          </button>
        </div>
      </form>
    );
  }
}

LoginForm.PropTypes = {
  submitAction: PropTypes.func.isRequired
};
