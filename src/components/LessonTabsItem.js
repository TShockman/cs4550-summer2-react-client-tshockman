import React from 'react';
import PropTypes from 'prop-types';

export default class LessonTabsItem extends React.PureComponent {
  static propTypes = {
    lesson: PropTypes.object.isRequired
  };

  render() {
    const {lesson} = this.props;
    return (
      <li className="nav-item">
        <a className="nav-link" href="#">
          {lesson.title}
        </a>
      </li>
    );
  }
}