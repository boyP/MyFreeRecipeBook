import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-materialize';
import TrackerReact from 'meteor/ultimatejs:tracker-react';
import Zone from './Zone';
import CalendarItem from './CalendarItem';
import CalendarOptionsBar from './CalendarOptionsBar';

const COLUMN_WIDTH = 2;

export default class MealPlanner extends TrackerReact(Component) {
  constructor(props) {
    super(props);
    this.state = {
      subscription: {
        mealCalendar: Meteor.subscribe('allMeals')
      },
      selected: ''
    };
  }

  componentWillUnmount() {
    this.state.subscription.mealCalendar.stop();
  }

  addMealToDate = (date, mealType) => {
    return meal => {
      Meteor.call('planMeal', date, mealType, meal, (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error adding the meal!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        }
      });
    };
  };

  removeMealFromDate = (date, mealType, meal_id) => {
    return () => {
      Meteor.call('removeMeal', date, mealType, meal_id, (error, data) => {
        if (error) {
          Bert.alert(
            'Sorry, there was an error deleting the meal!',
            'danger',
            'growl-top-right',
            'fa-remove'
          );
          console.log(error);
        } else {
          Bert.alert(
            'Meal deleted successfully!',
            'success',
            'growl-top-right',
            'fa-check'
          );
          this.setState({
            selected: ''
          });
        }
      });
    };
  };

  updateMealStatus = (date, mealType, meal_id) => {
    return isCompleted => {
      Meteor.call(
        'updateMealStatus',
        date,
        mealType,
        meal_id,
        isCompleted,
        (error, data) => {
          if (error) {
            Bert.alert(
              'Sorry, there was an error updaing the meal!',
              'danger',
              'growl-top-right',
              'fa-remove'
            );
            console.log(error);
          }
        }
      );
    };
  };

  onSelectCalendarItem = (date, mealType, meal_id) => {
    return () => {
      this.setState({
        selected: {
          meal_id,
          date,
          mealType
        }
      });
    };
  };

  getMealsByDate(date, mealType) {
    let meal = MealCalendar.findOne({ date: date });
    return meal ? meal[mealType] : null;
  }

  formatDate = (date, inc) => {
    let d = date.add(inc, 'd');
    return d.format('ddd, (M/D)');
  };

  renderDaysOfTheWeek() {
    let date = moment(this.props.startDate);
    return (
      <Row className="days-container">
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 0)}
        </Col>
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 1)}
        </Col>
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 1)}
        </Col>
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 1)}
        </Col>
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 1)}
        </Col>
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 1)}
        </Col>
        <Col s={COLUMN_WIDTH} className="grid-example">
          {this.formatDate(date, 1)}
        </Col>
      </Row>
    );
  }

  renderZone(i, mealType) {
    let date = moment(this.props.startDate).add(i, 'd').toDate();
    let meals = this.getMealsByDate(date, mealType);
    return (
      <Col key={i} s={COLUMN_WIDTH} className="grid-example">
        <Zone
          zoneMeals={meals}
          mealType={mealType}
          addMeal={this.addMealToDate(date, mealType)}
        >
          {meals
            ? meals.map(meal => {
                let isSelected = meal.guid === this.state.selected.meal_id;
                return (
                  <CalendarItem
                    key={meal.guid}
                    meal={meal}
                    isSelected={isSelected}
                    onClick={this.onSelectCalendarItem(
                      date,
                      mealType,
                      meal.guid
                    )}
                    onChange={this.updateMealStatus(date, mealType, meal.guid)}
                    removeMeal={this.removeMealFromDate(
                      date,
                      mealType,
                      meal.guid
                    )}
                  />
                );
              })
            : ''}
        </Zone>
      </Col>
    );
  }

  renderBreakfast() {
    const zones = [];
    for (let i = 0; i < 7; i++) {
      zones.push(this.renderZone(i, 'breakfast'));
    }
    return (
      <Row className="breakfast">
        {zones}
      </Row>
    );
  }

  renderLunch() {
    const zones = [];
    for (let i = 0; i < 7; i++) {
      zones.push(this.renderZone(i, 'lunch'));
    }
    return (
      <Row className="lunch">
        {zones}
      </Row>
    );
  }

  renderDinner() {
    const zones = [];
    for (let i = 0; i < 7; i++) {
      zones.push(this.renderZone(i, 'dinner'));
    }
    return (
      <Row className="dinner">
        {zones}
      </Row>
    );
  }

  render() {
    let selected = this.state.selected;
    return (
      <div className="meal-calendar-container">
        {this.renderDaysOfTheWeek()}
        <CalendarOptionsBar
          meal={selected}
          mealType={'breakfast'}
          onDelete={this.removeMealFromDate}
        />
        {this.renderBreakfast()}
        <CalendarOptionsBar
          meal={selected}
          mealType={'lunch'}
          onDelete={this.removeMealFromDate}
        />
        {this.renderLunch()}
        <CalendarOptionsBar
          meal={selected}
          mealType={'dinner'}
          onDelete={this.removeMealFromDate}
        />
        {this.renderDinner()}
      </div>
    );
  }
}

MealCalendar.PropTypes = {
  startDate: PropTypes.object.isRequired
};
