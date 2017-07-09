import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip';
import { Button, Modal } from 'react-materialize';
import DraggableList from 'react-draggable-list';
import ListItem from './ListItem';

const NEW_FOOTNOTE = 'New Footnote';
const FOOTNOTE_MSG =
  'Footnotes are useful for special instructions, tips and tricks';

export default class Footnotes extends Component {
  constructor(props) {
    super(props);
    let list = this.props.recipe.footnotes ? this.props.recipe.footnotes : [];
    this.state = {
      footnotes: list
    };
  }

  renderFootnotes() {
    let footnotes = this.props.recipe.footnotes;
    return (
      <div>
        {footnotes && footnotes.length > 0
          ? <ul>
              {' '}{footnotes.map(footnote => {
                return (
                  <li className="list-item" key={footnote.name}>
                    <span className="icon list-number">
                      <i
                        className="fa fa-lightbulb-o fa-lg iconText"
                        aria-hidden="true"
                      />
                    </span>
                    <p>{footnote.name}</p>
                  </li>
                );
              })}{' '}
            </ul>
          : <p>
              {FOOTNOTE_MSG}
            </p>}
      </div>
    );
  }

  newFootnote(event) {
    event.preventDefault();
    event.stopPropagation();
    const footnote = this.refs.footnote.value.trim();
    if (footnote) {
      this.refs.footnote.value = '';
      this.setState({
        footnotes: this.state.footnotes.concat([{ name: footnote }])
      });
    }
  }

  deleteFootnote(footnote) {
    let list = this.state.footnotes;
    const pos = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(footnote.name);
    list.splice(pos, 1);
    this.setState({
      footnotes: list
    });
  }

  renameFootnote(self, footnote, newName) {
    let list = self.state.footnotes;
    const index = list
      .map(function(e) {
        return e.name;
      })
      .indexOf(footnote.name);
    list[index].name = newName;
    self.setState({
      footnotes: list
    });
  }

  saveFootnotesToRecipe() {
    Meteor.call(
      'updateFootnotesInRecipe',
      this.props.recipe._id,
      this.state.footnotes,
      (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error saving the footnotes!',
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
    this.setState({ footnotes: newList });
  }

  renderEditFootnoteList() {
    return (
      <div className="list" ref="modal">
        <DraggableList
          itemKey="name"
          template={ListItem}
          list={this.state.footnotes}
          onMoveEnd={newList => this.onListChange(newList)}
          container={() => this.refs.modal}
          commonProps={{
            delete: this.deleteFootnote,
            rename: this.renameFootnote,
            self: this
          }}
        />
      </div>
    );
  }

  renderEditButton() {
    let title = `${this.props.recipe.title} Footnotes`;
    return (
      <Modal
        header={title}
        trigger={
          <span className="icon">
            <a className="tooltip" data-tip="Edit Footnotes">
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
              onClick={this.saveFootnotesToRecipe.bind(this)}
            >
              Save
            </Button>
            <Button waves="light" modal="close" flat>Cancel</Button>
          </div>
        }
      >
        <div className="edit-footnotes-wrapper">
          <form onSubmit={this.newFootnote.bind(this)}>
            <input type="text" ref="footnote" placeholder={NEW_FOOTNOTE} />
          </form>
        </div>
        {this.renderEditFootnoteList()}
      </Modal>
    );
  }

  render() {
    return (
      <div className="section">
        <div className="section-header row">
          <div className="title-wrapper col s11">
            <h2 className="section-title">Footnotes</h2>
          </div>
          <div className="col s1">
            {this.renderEditButton()}
          </div>
        </div>
        <div className="divider" />
        {this.renderFootnotes()}
      </div>
    );
  }
}
