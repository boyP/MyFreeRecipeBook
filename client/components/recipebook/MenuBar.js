import React, { Component } from 'react';
import { Row, Col, Button, Dropdown, NavItem, Modal } from 'react-materialize';

const SEARCH_RECIPES = 'Search Recipes';
const UNTITLED_RECIPE = 'Untitled Recipe';

export default class MenuBar extends Component {
  constructor(props) {
    super(props);
  }

  onInputChange(event) {
    event.preventDefault();
    event.stopPropagation();
    const query = this.refs.query.value.trim();
    this.props.onSearchQueryChange(query);
  }

  createRecipe(event) {
    event.preventDefault();
    event.stopPropagation();
    const title = this.refs.title.value.trim();
    if (title) {
      Meteor.call('addRecipe', title, (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error creating the recipe!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        } else {
          Bert.alert(
            'Recipe created successfully!',
            'success',
            'growl-top-right',
            'fa-remove'
          );
          this.refs.title.value = '';
        }
      });
    }
  }

  render() {
    return (
      <Row className="menubar-menu">
        <Col s={9}>
          <div className="menubar-search-wrapper">
            <input
              type="text"
              ref="query"
              placeholder={SEARCH_RECIPES}
              onChange={this.onInputChange.bind(this)}
            />
          </div>
        </Col>
        <Col s={3}>
          <Modal
            header="New Recipe"
            trigger={
              <Button waves="light" className="new-button">
                New Recipe
              </Button>
            }
            actions={
              <div>
                <Button
                  waves="light"
                  modal="close"
                  flat
                  onClick={this.createRecipe.bind(this)}
                >
                  Create
                </Button>
                <Button waves="light" modal="close" flat>Cancel</Button>
              </div>
            }
          >
            <div className="new-recipe-wrapper">
              <input type="text" ref="title" placeholder={UNTITLED_RECIPE} />
            </div>
          </Modal>

        </Col>
      </Row>
    );
  }
}
