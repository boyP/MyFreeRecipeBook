import React, { Component } from 'react';

export default class ResetPassword extends Component {
  onSubmit(event) {
    event.preventDefault();
    const newPassword = this.refs.password_field.value.trim();
    var token = FlowRouter.getParam('token');
    console.log(newPassword);
    console.log(token);
    Accounts.resetPassword(token, newPassword, function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('reset succesful');
      }
    });
  }

  renderForm() {
    return (
      <form onSubmit={this.onSubmit.bind(this)}>
        <div className="form-group">
          <label htmlFor="password">New Password:</label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            ref="password_field"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1 className="login-title">Reset Password</h1>
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}
