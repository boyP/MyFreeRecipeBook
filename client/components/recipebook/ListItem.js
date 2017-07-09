import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';
import { Button } from 'react-materialize';

export default class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  dataChanged(name) {
    let commonProps = this.props.commonProps;
    const self = commonProps;
    const renameStep = commonProps.rename;
    const item = this.props.item;
    renameStep(commonProps.self, item, name.item);
  }

  render() {
    const { item, itemSelected, dragHandle, commonProps } = this.props;
    const deleteStep = commonProps.delete;
    const self = commonProps.self;
    const scale = itemSelected * 0.05 + 1;
    return (
      <div
        className="item"
        style={{
          transform: `scale(${scale})`
        }}
      >
        {dragHandle(
          <span className="icon dragHandle">
            <i className="fa fa-bars iconText" aria-hidden="true" />
          </span>
        )}
        <InlineEdit
          text={item.name}
          paramName="item"
          change={this.dataChanged.bind(this)}
        />
        <span className="icon trash-icon" onClick={deleteStep.bind(self, item)}>
          <i className="fa fa-trash iconText fa-lg" aria-hidden="true" />
        </span>

      </div>
    );
  }
}
