import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';

// Accounts.onResetPasswordLink(function(token, done) {
//   Session.set('passwordToken', token);
//   done();
//   FlowRouter.go('reset-password', { token: token });
// });

$.cloudinary.config = {
  cloud_name: Meteor.settings.CLOUDINARY_CLOUD_NAME
};
const SIGN_IN = 'Log In';
const SIGN_UP = 'Sign Up';

function renderNav() {
  return (
    <ul className="right">
      <li className="home-nav"><a href="/login">{SIGN_IN}</a></li>
      <li className="home-nav"><a href="/register">{SIGN_UP}</a></li>
    </ul>
  );
}

export default class App extends TrackerReact(React.Component) {
  getStarted() {
    FlowRouter.go('/register');
  }

  render() {
    return (
      <div className="main-layout">
        <header className="header-layout">
          <nav className="clear-nav">
            <div>
              {renderNav()}
            </div>
          </nav>

          <h1>My Recipe Book</h1>
          <button
            className="waves-effect waves-light btn"
            onClick={this.getStarted}
          >
            Get Started!
          </button>
        </header>

        <main>
          <div className="content">
            <div className="row row-container">
              <div className="tagline">
                <h3>Your Personal Recipe Planner</h3>
                <p className="description">
                  My Recipe Book is a 100% free and open-source Recipe Book and Meal Planner.
                </p>
              </div>
            </div>

            <div className="row row-container">
              <div className="col s6 text-container">
                <h4>Manage your Recipe Workbench</h4>
                <p>Easily search, view, edit and delete your saved recipes</p>
              </div>
              <div className="col s6">
                <img className="home-image" src="/images/view_recipes.png" />
              </div>
            </div>

            <div className="row row-container">
              <div className="col s6">
                <img className="home-image" src="/images/recipe_page.png" />
              </div>
              <div className="col s6 text-container">
                <h4>Experiment with your Recipe creation</h4>
                <ul className="bullet-list">
                  <li className="description-list">
                    Add and track your ingredients
                  </li>
                  <li className="description-list">
                    Upload a stunning picture of your work
                  </li>
                  <li className="description-list">
                    Record metrics such as cook time and prep time
                  </li>
                  <li className="description-list">
                    Add complex directions to your recipes
                  </li>
                  <li className="description-list">
                    Trial and error with footnotes
                  </li>
                </ul>
              </div>
            </div>

            <div className="row row-container">
              <div className="col s6 text-container">
                <h4>Plan your Meals for the week</h4>
                <ul className="bullet-list">
                  <li className="description-list">
                    Easily drag and drop your meals to your board
                  </li>
                  <li className="description-list">
                    Quickly access your recipes
                  </li>
                  <li className="description-list">
                    Keep your plan updated as you go
                  </li>
                </ul>
              </div>
              <div className="col s6">
                <img className="home-image" src="/images/plan_meals.png" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
