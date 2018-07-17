import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class CourseListItem extends React.Component {
  render() {
    return (
      <li className="list-group-item">
        {this.props.title}
        <span className="float-right">
          <i className="fa fa-trash"></i>
          <i className="fa fa-pencil"></i>
        </span>
      </li>
    )
  }
}