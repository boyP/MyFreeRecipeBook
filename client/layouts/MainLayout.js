import React from 'react';

const SIGN_IN = 'Sign In';
const LOG_OUT = 'Sign Out';

function logout() {
  if (Meteor.user()) {
    Meteor.logout();
    FlowRouter.go('/');
  }
}

function renderNav() {
  if (Meteor.user()) {
    return (
      <ul id="nav-mobile" className="right">
        <li><a href="/recipes">Recipe Book</a></li>
        <li><a href="/planner">Meal Planner</a></li>
        <li onClick={logout}><a href="/login">{LOG_OUT}</a></li>
      </ul>
    );
  } else {
    return (
      <ul id="nav-mobile" className="right">
        <li onClick={logout}><a href="/login">{SIGN_IN}</a></li>
      </ul>
    );
  }
}

export const MainLayout = ({ content }) => {
  return (
    <div className="main-layout">
      <header>
        <nav>
          <div className="nav-wrapper">
            <a href="/" className="brand-logo">My Recipe Book</a>
            {renderNav()}
          </div>
        </nav>
      </header>

      <main>
        {content}
      </main>
    </div>
  );
};
