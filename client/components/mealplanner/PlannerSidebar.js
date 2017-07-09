import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { Row, Input } from 'react-materialize';
import Meal from './Meal';

const guid = () => {
  function _p8(s) {
    var p = (Math.random().toString(16) + '000000000').substr(2, 8);
    return s ? '-' + p.substr(0, 4) + '-' + p.substr(4, 4) : p;
  }
  return _p8() + _p8(true) + _p8(true) + _p8();
};

const getSuggestionValue = suggestion => suggestion.title;

const renderSuggestion = suggestion => (
  <div className="row">
    <div className="col s4">
      {suggestion.image
        ? <img className="meal-image" src={suggestion.image} />
        : <img className="meal-image" src="/images/stock_image.jpg" />}
    </div>
    <div className="col s8">
      <p className="autocomplete-title">{suggestion.title}</p>
    </div>
  </div>
);

export default class PlannerSidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        recipes: Meteor.subscribe('allRecipes')
      },
      value: '',
      recipes: [],
      suggestions: [],
      meals: []
    };
  }

  componentWillUnmount() {
    this.state.subscription.recipes.stop();
  }

  componentDidMount() {
    this.setState({
      recipes: Recipes.find().fetch()
    });
  }

  insertMeal(event) {
    event.preventDefault();
    const mealName = this.state.value;

    if (mealName) {
      let recipe = this.state.recipes.find(recipe => {
        return recipe.title === mealName;
      });
      let meal = recipe ? Object.assign({}, recipe) : { title: mealName };
      meal.guid = guid();

      this.setState({
        value: '',
        meals: this.state.meals.concat([meal])
      });
    }
  }

  deleteMeal = mealID => {
    return () => {
      this.setState({
        meals: this.state.meals.filter(meal => {
          return meal.guid !== mealID;
        })
      });
    };
  };

  renderMeals() {
    return (
      <div>
        {this.state.meals.map(meal => {
          return (
            <Meal key={meal.guid} meal={meal} onDelete={this.deleteMeal} />
          );
        })}
      </div>
    );
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };

  // Teach Autosuggest how to calculate suggestions for any given input value.
  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.state.recipes.filter(
          recipe =>
            recipe.title.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type meal name',
      value,
      onChange: this.onChange
    };

    return (
      <div className="sidebar">
        <h3 className="sidebar-title">Insert New</h3>
        <form onSubmit={this.insertMeal.bind(this)}>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={inputProps}
          />
        </form>
        {this.renderMeals()}
      </div>
    );
  }
}
