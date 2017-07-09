import React from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import MenuBar from './components/recipebook/MenuBar';
import RecipeGroup from './components/recipebook/RecipeGroup';

/*
  RecipeBook.js:
  Responsible for getting the recipe and folder data and displaying
  them to the user.
**/

export default class App extends TrackerReact(React.Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        recipes: Meteor.subscribe('allRecipes')
      },
      query: ''
    };
  }

  componentWillUnmount() {
    this.state.subscription.recipes.stop();
  }

  getRecipes() {
    if (this.state.query) {
      const regex = `^${this.state.query}`;
      return Recipes.find({
        title: { $regex: regex, $options: 'i' }
      }).fetch();
    } else {
      return Recipes.find().fetch();
    }
  }

  handleSearchQueryChange(query) {
    this.setState({ query });
  }

  render() {
    let recipes = this.getRecipes();
    return (
      <div className="container">
        <MenuBar
          onSearchQueryChange={this.handleSearchQueryChange.bind(this)}
        />
        <RecipeGroup recipes={recipes} />
      </div>
    );
  }
}
