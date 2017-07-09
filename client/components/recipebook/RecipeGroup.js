/*
  RecipeGroup.js:
  Responsible for arranging recipes in a card grid
**/
import React, { Component } from 'react';
import RecipeCard from './RecipeCard';

const RECIPES = 'Recipes';

export default class RecipeGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: ''
    };
  }

  handleClick(index) {
    this.setState({ index });
  }

  handleDoubleClick(id) {
    FlowRouter.go('Recipe.show', { id: id });
  }

  render() {
    return (
      <div>
        <h2><i className="fa fa-book" aria-hidden="true" />{RECIPES}</h2>
        <ul>
          <div className="row">
            {this.props.recipes.map((recipe, index) => {
              return (
                <div className="col s12 m3" key={recipe._id}>
                  <RecipeCard
                    active={this.state.index === index}
                    recipe={recipe}
                    onClick={this.handleClick.bind(this, index)}
                    onDoubleClick={this.handleDoubleClick.bind(
                      this,
                      recipe._id
                    )}
                  />
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    );
  }
}
