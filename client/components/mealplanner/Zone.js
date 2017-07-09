import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const zoneTarget = {
  drop(props, monitor) {
    let meal = monitor.getItem();
    props.addMeal(meal);
  },
  canDrop(props, monitor) {
    let meal = monitor.getItem();
    const exists = props.zoneMeals
      ? props.zoneMeals.find(m => {
          return m.guid === meal.guid;
        })
      : false;
    return exists ? false : true;
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  };
}

const Zone = props => {
  const overClass = props.isOver && props.canDrop ? 'over' : props.mealType;
  return props.connectDropTarget(
    <div className={`zone ${overClass}`}>
      <div>
        {props.children}
      </div>
    </div>
  );
};

Zone.PropTypes = {
  mealType: PropTypes.string.isRequired,
  zoneMeals: PropTypes.array.isRequired,
  addMeal: PropTypes.func.isRequired,
  connectDragSource: PropTypes.func,
  isOver: PropTypes.bool,
  canDrop: PropTypes.bool
};
export default DropTarget(ItemTypes.MEAL, zoneTarget, collect)(Zone);
