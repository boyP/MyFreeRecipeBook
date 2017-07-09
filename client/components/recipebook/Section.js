import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Modal } from 'react-materialize';
import DraggableList from 'react-draggable-list';
import ListItem from './ListItem';

const NEW_STEP = 'New Step';
const BLANK_STEPS_MSG = 'No steps for this section yet...';

export default class Section extends Component {
  constructor(props) {
    super(props);
    let list = this.props.section.steps ? this.props.section.steps : [];
    this.state = {
      steps: list
    };
  }

  renderSteps() {
    let steps = this.props.section.steps;
    return (
      <div>
        {steps
          ? <ol>
              {' '}{steps.map((step, index) => {
                return (
                  <li className="list-item" key={step.name}>
                    <span className="list-number">{index + 1}.</span>
                    <p>{step.name}</p>
                  </li>
                );
              })}{' '}
            </ol>
          : <p>{BLANK_STEPS_MSG}</p>}
      </div>
    );
  }

  newStep(event) {
    event.preventDefault();
    event.stopPropagation();
    const step = this.refs.step.value.trim();
    if (step) {
      this.refs.step.value = '';
      this.setState({
        steps: this.state.steps.concat([{ name: step }])
      });
    }
  }

  deleteStep(step) {
    let list = this.state.steps;
    const pos = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(step.name);
    list.splice(pos, 1);
    this.setState({
      steps: list
    });
  }

  renameStep(self, step, newName) {
    let list = self.state.steps;
    const index = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(step.name);
    list[index].name = newName;
    self.setState({
      steps: list
    });
  }

  onListChange(newList) {
    this.setState({ steps: newList });
  }

  renderEditStepList() {
    return (
      <div className="list" ref="modal">
        <DraggableList
          itemKey="name"
          template={ListItem}
          list={this.state.steps}
          onMoveEnd={newList => this.onListChange(newList)}
          container={() => this.refs.modal}
          commonProps={{
            delete: this.deleteStep,
            rename: this.renameStep,
            self: this
          }}
        />
      </div>
    );
  }

  saveStepsToSection() {
    Meteor.call(
      'updateStepsInRecipe',
      this.props.id,
      this.props.section.name,
      this.state.steps,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error adding the steps!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
        }
      }
    );
  }

  renderEditButton() {
    let title = `Add Steps for ${this.props.section.name}`;
    return (
      <Modal
        header={title}
        trigger={
          <span className="icon">
            <a className="tooltip" data-tip="Edit Steps">
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
              onClick={this.saveStepsToSection.bind(this)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <div className="edit-directions-wrapper">
          <form onSubmit={this.newStep.bind(this)}>
            <input type="text" ref="step" placeholder={NEW_STEP} />
          </form>
        </div>
        {this.renderEditStepList()}
      </Modal>
    );
  }

  render() {
    return (
      <li className="list-item">
        <div className="row">
          <div className="col s11">
            <h3 className="section-item">{this.props.section.name}</h3>
          </div>
          <div className="col s1">
            {this.renderEditButton()}
          </div>
        </div>
        {this.renderSteps()}
      </li>
    );
  }
}
