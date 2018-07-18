import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class CourseManager extends React.Component {
  render() {
    return (
      <Router>
        <div className="container-fluid">
          <h1>Shockman's Course Manager</h1>
          <Switch>
            <Route exact path="/courses" component={CourseList}/>
            <Route path="/courses/:courseId" component={CourseEditor}/>
            <Redirect to="/courses"/>
          </Switch>
        </div>
      </Router>
    );
  }
}
