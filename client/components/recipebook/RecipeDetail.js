import React, { Component } from 'react';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import { Button, Modal } from 'react-materialize';
import RecipeImage from './RecipeImage';
import Ingredients from './Ingredients';
import Directions from './Directions';
import Footnotes from './Footnotes';

export default class RecipeDetail extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        recipes: Meteor.subscribe('allRecipes')
      }
    };
  }

  componentWillUnmount() {
    this.state.subscription.recipes.stop();
  }

  getRecipeDetails() {
    return Recipes.findOne(this.props.id);
  }

  updateServingSize(recipe_id) {
    const servingSize = this.refs.servingSize.value;
    Meteor.call('updateServingSize', recipe_id, servingSize, (error, data) => {
      if (error) {
        Bert.alert(
          'Sorry, there was an error updating the serving size!',
          'danger',
          'growl-top-right',
          'fa-remove'
        );
        console.log(error);
      } else {
        Bert.alert(
          'Serving size updated successfully!',
          'success',
          'growl-top-right',
          'fa-remove'
        );
      }
    });
  }

  renderServingSize(recipe) {
    const servingSize = recipe.servingSize
      ? `Serving Size: ${recipe.servingSize}`
      : 'Click to set serving size';
    return (
      <Modal
        header="Serving Size"
        trigger={<p className="info-heading cursor-pointer">{servingSize}</p>}
        actions={
          <div>
            <Button
              waves="light"
              modal="close"
              flat
              onClick={this.updateServingSize.bind(this, recipe._id)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <form action="#">
          <p className="range-field">
            <input type="range" ref="servingSize" min="0" max="20" />
          </p>
        </form>

      </Modal>
    );
  }

  render() {
    let recipe = this.getRecipeDetails();
    if (recipe) {
      return (
        <div className="container">
          <div className="row">
            <div className="col s6">
              <h2 className="recipe-title">{recipe.title}</h2>
              {this.renderServingSize(recipe)}
              <Ingredients recipe={recipe} />
            </div>
            <RecipeImage id={recipe._id} image={recipe.image} />
          </div>
          <Directions recipe={recipe} />
          <Footnotes recipe={recipe} />
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}
