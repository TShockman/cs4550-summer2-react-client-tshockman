import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import {NavItem, NavLink} from 'reactstrap';

export default class LessonTabsItem extends React.PureComponent {
  static propTypes = {
    lesson: PropTypes.object.isRequired,
    selectLesson: PropTypes.func.isRequired,
    active: PropTypes.bool
  };

  handleSelect = () => {
    const {lesson, selectLesson} = this.props;
    selectLesson(lesson);
  };

  deleteLesson = () => {
    console.log('Deleting lesson', this.props.lesson);
  };

  render() {
    const {lesson, active} = this.props;
    return (
      <NavItem>
        <NavLink className={cx({active})} onClick={this.handleSelect}>
          {lesson.title}
        </NavLink>
      </NavItem>
    );
  }
}