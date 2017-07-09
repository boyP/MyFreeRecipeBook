import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { MainLayout } from '../layouts/MainLayout';
import App from '../App';
import RecipeBook from '../RecipeBook';
import RecipeDetail from '../components/recipebook/RecipeDetail';
import MealPlanner from '../MealPlanner';
import Login from '../components/login/Login';
import Register from '../components/login/Registration';
// import ForgotPassword from '../components/login/ForgotPassword';
// import ResetPassword from '../components/login/ResetPassword';

FlowRouter.route('/', {
  action() {
    mount(App);
  }
});

FlowRouter.route('/login', {
  action(params) {
    mount(MainLayout, {
      content: <Login />
    });
  }
});
FlowRouter.route('/register', {
  action(params) {
    mount(MainLayout, {
      content: <Register />
    });
  }
});

// FlowRouter.route('/forgot-password', {
//   action(params) {
//     mount(MainLayout, {
//       content: <ForgotPassword />
//     });
//   }
// });
//
// FlowRouter.route('/reset-password/:token', {
//   name: 'reset-password',
//   action(params) {
//     mount(MainLayout, {
//       content: <ResetPassword />
//     });
//   }
// });

FlowRouter.route('/recipes', {
  action() {
    if (Meteor.userId()) {
      mount(MainLayout, {
        content: <RecipeBook />
      });
    } else {
      mount(MainLayout, {
        content: <Login />
      });
    }
  }
});

FlowRouter.route('/recipes/:id', {
  name: 'Recipe.show',
  action(params) {
    if (Meteor.userId()) {
      mount(MainLayout, {
        content: <RecipeDetail id={params.id} />
      });
    } else {
      mount(MainLayout, {
        content: <Login />
      });
    }
  }
});

FlowRouter.route('/planner', {
  action() {
    if (Meteor.userId()) {
      mount(MainLayout, {
        content: <MealPlanner />
      });
    } else {
      mount(MainLayout, {
        content: <Login />
      });
    }
  }
});
