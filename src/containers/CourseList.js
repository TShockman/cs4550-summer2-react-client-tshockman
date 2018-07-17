import React from 'react';
import CourseListItem from '../components/CourseListItem';
import 'bootstrap/dist/css/bootstrap.css';

export default class CourseList extends React.Component {
  render() {
    return (
      <ul className="list-group">
        <CourseListItem title="Course One"/>
        <CourseListItem title="Course Two"/>
        <CourseListItem title="Course Three"/>
      </ul>
    );
  }
}