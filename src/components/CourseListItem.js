import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default class CourseListItem extends React.Component {
  static propTypes = {
      course: PropTypes.object.isRequired,
      onDelete: PropTypes.func.isRequired
  };

  handleDelete = () => {
    const {onDelete, course} = this.props;
    onDelete(course);
  };

  render() {
    const {course} = this.props;

    console.log('Rendering course list item for course', JSON.stringify(course));
    return (
      <li className="list-group-item">
        <span>{course.title}</span>
        <span>{course.owner.username}</span>
        <span>{course.modified}</span>
        <span className="float-right">
          <button onClick={this.handleDelete}><i className="fa fa-trash"/></button>
          <Link to={`/courses/${course.id}`}>
            <button><i className="fa fa-pencil"/></button>
          </Link>
        </span>
      </li>
    )
  }
}