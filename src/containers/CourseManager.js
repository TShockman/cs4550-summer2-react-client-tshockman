import React from 'react';
import CourseList from './CourseList';

export default class CourseManager extends React.Component {

  render() {
    return (
      <div className="container-fluid">
        <h1>Shockman's Course Manager</h1>
        <CourseList/>
      </div>
    );
  }
}
