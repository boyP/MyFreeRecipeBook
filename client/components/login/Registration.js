import React from 'react';
import LoginForm from './LoginForm';

function isEmailValid(address) {
  return /^[A-Z0-9'.1234z_%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(address);
}

function createUser(email, password) {
  if (!isEmailValid(email)) {
    Bert.alert(
      'Invalid Email. Please try again!',
      'danger',
      'growl-top-right',
      'fa-remove'
    );
    return;
  }
  Accounts.createUser(
    {
      email: email,
      password: password
    },
    error => {
      if (error) {
        Bert.alert(
          'There was problem with creating your account. Please try again!',
          'danger',
          'growl-top-right',
          'fa-remove'
        );
        console.log(error);
      } else {
        FlowRouter.go('/recipes');
      }
    }
  );
}

const Registration = props => {
  let loginMsg = 'Already have an account?';
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-md-offset-3">
          <h1 className="login-title">Create a new account (It's free!)</h1>
          <LoginForm submitBtnLabel="Register" submitAction={createUser} />
          <p>{loginMsg} <a href="/login">Sign In</a></p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
