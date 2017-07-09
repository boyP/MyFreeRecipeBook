import React, { Component } from 'react';

// Accounts.onResetPasswordLink(function(token, done) {
//   Session.set('passwordToken', token);
//   FlowRouter.go('reset-password', { token: token });
// });

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: ''
    };
  }

  onSubmit(event) {
    event.preventDefault();
    const email = this.refs.email_field.value.trim();
    Accounts.forgotPassword({ email: email }, function(err) {
      if (err) {
        if (err.message === 'User not found [403]') {
          console.log('This email does not exist.');
        } else {
          console.log('We are sorry but something went wrong.');
        }
      } else {
        console.log('Email Sent. Check your mailbox.');
      }
    });
  }

  renderForm() {
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
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    );
  }

  render() {
    let registerMsg =
      'Enter the email address you use to login to your account and we’ll send you instructions for how to reset your password.';
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <h1 className="login-title">Forgot Password?</h1>
            {this.renderForm()}
            <p>{registerMsg}</p>
          </div>
        </div>
      </div>
    );
  }
}
