import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'

export default class CourseManager extends React.Component {

  render() {
    return (
      <Router>
        <div className="container-fluid">
          <h1>Shockman's Course Manager</h1>
          <Route exact path="/courses" component={CourseList}/>
          <Route path="/courses/:courseId" component={CourseEditor}/>
          <Redirect from="/" to="/courses"/>
        </div>
      </Router>
    );
  }
}
