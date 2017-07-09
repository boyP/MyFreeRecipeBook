import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const mealSource = {
  beginDrag(props) {
    let recipe_id = props.meal._id ? props.meal._id : '';
    return {
      title: props.meal.title,
      recipe_id: recipe_id,
      guid: props.meal.guid,
      completed: false
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.onDelete(props.meal.guid)();
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const Meal = props => {
  const dragging = props.isDragging ? 'drag' : '';
  return props.connectDragSource(
    <div className={`row meal-card ${dragging}`}>
      <div className="col s4">
        {props.meal.image
          ? <img className="meal-image" src={props.meal.image} />
          : <img className="meal-image" src="/images/stock_image.jpg" />}
      </div>
      <div className="meal-body col s8">
        <span
          className="icon"
          id="meal-delete-icon"
          onClick={props.onDelete(props.meal.guid)}
        >
          <i className="fa fa-trash iconText fa-lg" aria-hidden="true" />
        </span>
        <p className="meal-title">{props.meal.title}</p>
        <p className="meal-subtitle">Drag Me!</p>
      </div>
    </div>
  );
};

Meal.PropTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  meal: PropTypes.object.isRequired
};

export default DragSource(ItemTypes.MEAL, mealSource, collect)(Meal);
