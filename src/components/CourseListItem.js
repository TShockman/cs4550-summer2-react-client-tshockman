import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

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
      <tr>
        <td>{course.title}</td>
        <td>{course.owner.username}</td>
        <td>{new Date(course.modified).toLocaleString()}</td>
        <td>
          <Link to={`/courses/${course.id}`}>
            <Button><i className="fa fa-pencil"/></Button>
          </Link>
          <Button color="danger" className="ml-2" onClick={this.handleDelete}><i className="fa fa-trash"/></Button>
        </td>
      </tr>
    );
  }
}