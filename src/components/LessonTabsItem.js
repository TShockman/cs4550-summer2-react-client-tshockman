import React from 'react';
import PropTypes from 'prop-types';

export default class LessonTabsItem extends React.PureComponent {
  static propTypes = {
    lesson: PropTypes.object.isRequired,
    selectLesson: PropTypes.func.isRequired
  };

  handleSelect = () => {
    const {lesson, selectLesson} = this.props;
    selectLesson(lesson);
  };

  render() {
    const {lesson} = this.props;
    return (
      <li className="nav-item" onClick={this.handleSelect}>
        <a className="nav-link" href="#">
          {lesson.title}
        </a>
      </li>
    );
  }
}