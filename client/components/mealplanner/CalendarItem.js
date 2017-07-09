import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './ItemTypes';

const mealSource = {
  beginDrag(props) {
    return {
      title: props.meal.title,
      recipe_id: props.meal.recipe_id,
      guid: props.meal.guid
    };
  },
  endDrag(props, monitor) {
    if (monitor.didDrop()) {
      props.removeMeal();
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

function handleNavigation(recipe_id) {
  return () => {
    FlowRouter.go('Recipe.show', { id: recipe_id });
  };
}

const CalendarItem = props => {
  const dragging = props.isDragging ? 'drag' : '';
  const selected = props.isSelected ? 'selected' : '';
  let completedIcon = props.meal.completed
    ? <i
        className="fa fa-check-square-o fa-lg calendar-checkbox-iconCompleted"
        aria-hidden="true"
      />
    : <i
        className="fa fa-square-o fa-lg calendar-checkbox-icon"
        aria-hidden="true"
      />;
  return props.connectDragSource(
    <div
      className={`calendar-item-container ${dragging} ${selected}`}
      onClick={props.onClick}
    >
      <span
        className="icon calendar-checkbox"
        onClick={event => {
          props.onChange(!props.meal.completed);
        }}
      >
        {completedIcon}
      </span>
      <div className="calendar-item-title">
        {props.meal.recipe_id
          ? <a onClick={handleNavigation(props.meal.recipe_id)}>
              {props.meal.title}
            </a>
          : props.meal.title}
      </div>
    </div>
  );
};

CalendarItem.PropTypes = {
  meal: PropTypes.shape({
    title: PropTypes.string,
    recipe_id: PropTypes.string,
    guid: PropTypes.string
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  removeMeal: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func,
  isDragging: PropTypes.bool
};
export default DragSource(ItemTypes.MEAL, mealSource, collect)(CalendarItem);
