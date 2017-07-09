import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';

const CalendarOptionsBar = props => {
  return (
    <Row>
      <Col s={10}>
        <p className={props.mealType}>{props.mealType}:</p>
      </Col>
      {props.meal && props.mealType === props.meal.mealType
        ? <Col s={2}>
            <span
              className="icon"
              id="meal-delete-icon"
              onClick={props.onDelete(
                props.meal.date,
                props.meal.mealType,
                props.meal.meal_id
              )}
            >
              <i className="fa fa-trash iconText fa-lg" aria-hidden="true" />
            </span>
          </Col>
        : <Col s={2} />}
    </Row>
  );
};

CalendarOptionsBar.PropTypes = {
  mealType: PropTypes.string.isRequired,
  meal: PropTypes.object.isRequired,
  onDelete: PropTypes.func.isRequired
};
export default CalendarOptionsBar;
