import React, { Component } from 'react';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { Button, Modal } from 'react-materialize';

export default class RecipeCard extends Component {
  constructor(props) {
    super(props);
  }

  deleteRecipe(e, data, event) {
    Meteor.call('deleteRecipe', data.id, (error, data) => {
      if (error) {
        Bert.alert(
          'Sorry, there was an error deleting the recipe!',
          'danger',
          'growl-top-right',
          'fa-remove'
        );
        console.log(error);
      } else {
        Bert.alert(
          'Recipe deleted successfully!',
          'success',
          'growl-top-right',
          'fa-remove'
        );
      }
    });
  }

  renameRecipe() {
    const title = this.refs.rename.value.trim();
    if (title) {
      this.refs.rename.value = '';
      Meteor.call(
        'renameRecipe',
        this.props.recipe._id,
        title,
        (error, data) => {
          if (error) {
            Bert.alert(
              'Sorry, there was an error renaming the recipe!',
              'danger',
              'growl-top-right',
              'fa-remove'
            );
            console.log(error);
          } else {
            Bert.alert(
              'Recipe renamed successfully!',
              'success',
              'growl-top-right',
              'fa-remove'
            );
          }
        }
      );
    }
  }

  renderRenameModal() {
    return (
      <Modal
        header="Re-name Recipe"
        trigger={
          <div>
            <span className="iconText">
              <i className="fa fa-pencil menu-icon" aria-hidden="true" />
            </span>
            <p className="context-menu-item">Rename Recipe</p>
          </div>
        }
        actions={
          <div>
            <Button
              waves="light"
              modal="close"
              flat
              onClick={this.renameRecipe.bind(this)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <div className="rename-recipe-wrapper">
          <input
            type="text"
            ref="rename"
            placeholder={this.props.recipe.title}
          />
        </div>
      </Modal>
    );
  }

  renderContextMenu() {
    return (
      <ContextMenu id={this.props.recipe._id}>
        <MenuItem>
          {this.renderRenameModal()}
        </MenuItem>
        <MenuItem divider />
        <MenuItem
          data={{ id: this.props.recipe._id }}
          onClick={this.deleteRecipe}
        >
          <span className="iconText">
            <i className="fa fa-trash menu-icon" aria-hidden="true" />
          </span>
          <p className="context-menu-item">Delete Recipe</p>
        </MenuItem>
      </ContextMenu>
    );
  }

  render() {
    let activeClass = this.props.active ? 'activeCard card' : 'card';
    let image = this.props.recipe.image
      ? this.props.recipe.image
      : '/images/stock_image.jpg';

    let time = this.props.recipe.cookTime && this.props.recipe.prepTime
      ? `${+this.props.recipe.cookTime + +this.props.recipe.prepTime} Minutes`
      : 'No cook time specified';
    return (
      <div
        className={activeClass}
        onClick={this.props.onClick}
        onDoubleClick={this.props.onDoubleClick}
      >
        <ContextMenuTrigger id={this.props.recipe._id}>
          <div className="card-image-container">
            <img className="card-image" src={image} />
          </div>
          <div className="card-content">
            <span className="card-title">{this.props.recipe.title}</span>
            <p className="card-subtitle">{time}</p>
          </div>
        </ContextMenuTrigger>
        {this.renderContextMenu()}
      </div>
    );
  }
}
