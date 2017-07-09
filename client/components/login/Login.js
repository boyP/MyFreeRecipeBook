import React, { Component } from 'react';
import LoginForm from './LoginForm';

function loginWithPassword(email, password) {
  Meteor.loginWithPassword(email, password, error => {
    if (error) {
      Bert.alert(
        'There was a problem logging in. Check your email and password!',
        'danger',
        'growl-top-right',
        'fa-remove'
      );
      console.log(error);
    } else {
      FlowRouter.go('/recipes');
    }
  });
}

const Login = props => {
  if (Meteor.userId()) {
    FlowRouter.go('/recipes');
  }

  let registerMsg = "Don't have an account?";
  let forgotMsg = 'Forgot Password?';
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1 className="login-title">Login to your account</h1>
          <LoginForm submitBtnLabel="Login" submitAction={loginWithPassword} />
          <p>{registerMsg} <a href="/register">Register</a></p>
          {/* <p><a href="/forgot-password">{forgotMsg}</a></p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
