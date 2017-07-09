import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Modal } from 'react-materialize';
import DraggableList from 'react-draggable-list';
import ListItem from './ListItem';

const NEW_INGREDIENT = 'New Ingredient';

export default class Ingredients extends Component {
  constructor(props) {
    super(props);
    let list = this.props.recipe.ingredients
      ? this.props.recipe.ingredients
      : [];
    this.state = {
      ingredients: list
    };
  }

  toggleIngredient(ingredientName, isCompleted) {
    Meteor.call(
      'completedIngredient',
      this.props.recipe._id,
      ingredientName,
      isCompleted,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error checking the ingredient!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        }
      }
    );
  }

  renderIngredients() {
    let ingredients = this.props.recipe.ingredients;
    return (
      <div>
        {ingredients
          ? <ul>
              {' '}{ingredients.map(ingredient => {
                let completedClass = ingredient.isCompleted ? 'completed' : '';
                let completedIcon = ingredient.isCompleted
                  ? <i
                      className="fa fa-check fa-lg iconText"
                      aria-hidden="true"
                    />
                  : <i
                      className="fa fa-plus-circle fa-lg iconText"
                      aria-hidden="true"
                    />;
                return (
                  <li
                    className={`list-item ${completedClass}`}
                    key={ingredient.name}
                  >
                    <span
                      className="icon list-number"
                      onClick={this.toggleIngredient.bind(
                        this,
                        ingredient.name,
                        !ingredient.isCompleted
                      )}
                    >
                      {completedIcon}
                    </span>
                    <p>{ingredient.name}</p>
                  </li>
                );
              })}{' '}
            </ul>
          : <p>No Ingredients added yet</p>}
      </div>
    );
  }

  newIngredient(event) {
    event.preventDefault();
    event.stopPropagation();
    const ingredient = this.refs.ingredient.value.trim();
    if (ingredient) {
      this.refs.ingredient.value = '';
      this.setState({
        ingredients: this.state.ingredients.concat([{ name: ingredient }])
      });
    }
  }

  deleteIngredient(ingredient) {
    let list = this.state.ingredients;
    const pos = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(ingredient.name);
    list.splice(pos, 1);
    this.setState({
      ingredients: list
    });
  }

  renameIngredient(self, ingredient, newName) {
    let list = self.state.ingredients;
    const index = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(ingredient.name);
    list[index].name = newName;
    self.setState({
      ingredients: list
    });
  }

  saveIngredientsToRecipe() {
    Meteor.call(
      'updateIngredientsInRecipe',
      this.props.recipe._id,
      this.state.ingredients,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error saving the ingredients!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        }
      }
    );
  }

  onListChange(newList) {
    this.setState({ ingredients: newList });
  }

  renderEditIngredientList() {
    return (
      <div className="list" ref="modal">
        <DraggableList
          itemKey="name"
          template={ListItem}
          list={this.state.ingredients}
          onMoveEnd={newList => this.onListChange(newList)}
          container={() => this.refs.modal}
          commonProps={{
            delete: this.deleteIngredient,
            rename: this.renameIngredient,
            self: this
          }}
        />
      </div>
    );
  }

  renderEditButton() {
    let title = `${this.props.recipe.title} Ingredients`;
    return (
      <Modal
        header={title}
        trigger={
          <span className="icon">
            <a className="tooltip" data-tip="Edit Ingredients">
              <i className="fa fa-pencil fa-lg iconText" aria-hidden="true" />
            </a>
            <ReactTooltip place="bottom" type="dark" effect="float" />
          </span>
        }
        actions={
          <div>
            <Button
              waves="light"
              modal="close"
              flat
              onClick={this.saveIngredientsToRecipe.bind(this)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <div className="edit-ingredients-wrapper">
          <form onSubmit={this.newIngredient.bind(this)}>
            <input type="text" ref="ingredient" placeholder={NEW_INGREDIENT} />
          </form>
        </div>
        {this.renderEditIngredientList()}
      </Modal>
    );
  }

  updateTime() {
    const time = this.refs.time.value;
    Meteor.call(
      'changePrepTimeForRecipe',
      this.props.recipe._id,
      time,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error updating the prep time!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        } else {
          Bert.alert(
            'Updated prep time successfully!',
            'success',
            'growl-top-right',
            'fa-remove'
          );
        }
      }
    );
  }

  renderTime() {
    const prepTime = this.props.recipe.prepTime
      ? `Prep: ${this.props.recipe.prepTime} min`
      : 'Click to set prep time';
    return (
      <Modal
        header="Prep Time (Minutes)"
        trigger={
          <span className="icon">
            <a className="tooltip" data-tip="Edit Prep Time">
              <i className="fa fa-clock-o fa-lg iconText" aria-hidden="true" />
            </a>
            <ReactTooltip place="bottom" type="dark" effect="float" />
            {prepTime}
          </span>
        }
        actions={
          <div>
            <Button
              waves="light"
              modal="close"
              flat
              onClick={this.updateTime.bind(this)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <form action="#">
          <p className="range-field">
            <input type="range" ref="time" min="0" max="100" />
          </p>
        </form>

      </Modal>
    );
  }

  render() {
    return (
      <div className="section">
        <div className="section-header row">
          <div className="title-wrapper col s6">
            <h2 className="section-title">Ingredients</h2>
          </div>
          <div className="col s5">
            {this.renderTime()}
          </div>
          <div className="col s1">
            {this.renderEditButton()}
          </div>
        </div>
        <div className="divider" />
        {this.renderIngredients()}
      </div>
    );
  }
}
