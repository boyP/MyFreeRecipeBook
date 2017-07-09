import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Modal } from 'react-materialize';
import Section from './Section';
import DraggableList from 'react-draggable-list';
import ListItem from './ListItem';
const NEW_SECTION = 'New Section';

export default class Directions extends Component {
  constructor(props) {
    super(props);
    let list = this.props.recipe.sections ? this.props.recipe.sections : [];
    this.state = {
      sections: list
    };
  }
  renderDirections() {
    let sections = this.props.recipe.sections;
    return (
      <div>
        {sections
          ? <ul>
              {' '}{sections.map(section => {
                return (
                  <Section
                    key={section.name}
                    id={this.props.recipe._id}
                    section={section}
                  />
                );
              })}{' '}
            </ul>
          : <p>Why don't you add a section and some steps for this recipe?</p>}
      </div>
    );
  }

  newSection(event) {
    event.preventDefault();
    event.stopPropagation();
    const sectionName = this.refs.section.value.trim();
    if (sectionName) {
      this.refs.section.value = '';
      this.setState({
        sections: this.state.sections.concat([{ name: sectionName }])
      });
    }
  }

  deleteSection(section) {
    let list = this.state.sections;
    const pos = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(section.name);
    list.splice(pos, 1);
    this.setState({
      sections: list
    });
  }

  renameSection(self, section, newName) {
    let list = self.state.sections;
    const index = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(section.name);
    list[index].name = newName;
    self.setState({
      sections: list
    });
  }

  saveSectionsToRecipe() {
    Meteor.call(
      'updateSectionsInRecipe',
      this.props.recipe._id,
      this.state.sections,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error saving the section!',
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
    this.setState({ sections: newList });
  }

  renderEditSectionList() {
    return (
      <div className="list" ref="modal">
        <DraggableList
          itemKey="name"
          template={ListItem}
          list={this.state.sections}
          onMoveEnd={newList => this.onListChange(newList)}
          container={() => this.refs.modal}
          commonProps={{
            delete: this.deleteSection,
            rename: this.renameSection,
            self: this
          }}
        />
      </div>
    );
  }

  updateTime() {
    const time = this.refs.time.value;
    Meteor.call(
      'changeCookTimeForRecipe',
      this.props.recipe._id,
      time,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error updaing the cook time!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        } else {
          Bert.alert(
            'Updated cook time successfully!',
            'success',
            'growl-top-right',
            'fa-remove'
          );
        }
      }
    );
  }

  renderEditButton() {
    let title = `Add section for ${this.props.recipe.title} Directions`;
    return (
      <Modal
        header={title}
        trigger={
          <span className="icon">
            <a className="tooltip" data-tip="Edit Section">
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
              onClick={this.saveSectionsToRecipe.bind(this)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <div className="edit-directions-wrapper">
          <form onSubmit={this.newSection.bind(this)}>
            <input type="text" ref="section" placeholder={NEW_SECTION} />
          </form>
        </div>
        {this.renderEditSectionList()}
      </Modal>
    );
  }

  renderTime() {
    const cookTime = this.props.recipe.cookTime
      ? `Cook: ${this.props.recipe.cookTime} min`
      : 'Click to set cook time';
    return (
      <Modal
        header="Cook Time (Minutes)"
        trigger={
          <span className="icon">
            <a className="tooltip" data-tip="Edit Cook Time">
              <i className="fa fa-clock-o fa-lg iconText" aria-hidden="true" />
            </a>
            <ReactTooltip place="bottom" type="dark" effect="float" />
            {cookTime}
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
          <div className="title-wrapper col s3">
            <h2 className="section-title">Directions</h2>
          </div>
          <div className="col s8">
            {this.renderTime()}
          </div>
          <div className="col s1">
            {this.renderEditButton()}
          </div>
        </div>
        <div className="divider" />
        {this.renderDirections()}
      </div>
    );
  }
}
