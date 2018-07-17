import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default class CourseListItem extends React.Component {
  render() {
    return (
      <li className="list-group-item">{this.props.title}</li>
    )
  }
}