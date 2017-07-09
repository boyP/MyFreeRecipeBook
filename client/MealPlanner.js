import React, { Component } from 'react';
import { Row, Col } from 'react-materialize';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import PlannerSidebar from './components/mealplanner/PlannerSidebar';
import MealCalendar from './components/mealplanner/MealCalendar';

const DATE_DISPLAY_FORMAT = 'MMM D';

class MealPlanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekStart: moment().startOf('week'),
      weekEnd: moment().endOf('week')
    };
  }
  decrementWeek() {
    this.setState({
      weekStart: this.state.weekStart.subtract(1, 'w'),
      weekEnd: this.state.weekEnd.subtract(1, 'w')
    });
  }

  incrementWeek() {
    this.setState({
      weekStart: this.state.weekStart.add(1, 'w'),
      weekEnd: this.state.weekEnd.add(1, 'w')
    });
  }

  renderDates() {
    let weekStart = this.state.weekStart.format(DATE_DISPLAY_FORMAT);
    let weekEnd = this.state.weekEnd.format(DATE_DISPLAY_FORMAT);
    let date = `${weekStart} - ${weekEnd}, ${this.state.weekStart.format('YYYY')}`;

    return (
      <div className="display-data-container">
        <span
          className="chevron-left chevron-icon"
          onClick={this.decrementWeek.bind(this)}
        >
          <i className="fa fa-chevron-left fa-2x" aria-hidden="true" />
        </span>
        <h3 className="display-date">{date}</h3>
        <span
          className="chevron-right chevron-icon"
          onClick={this.incrementWeek.bind(this)}
        >
          <i className="fa fa-chevron-right fa-2x" aria-hidden="true" />
        </span>
      </div>
    );
  }

  render() {
    let week = this.state.weekStart;
    return (
      <div>
        <Row>
          <Col s={3} className="sidebar-container">
            <PlannerSidebar />
          </Col>
          <Col s={9} className="body-container">
            {this.renderDates()}
            <MealCalendar startDate={week} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(MealPlanner);
