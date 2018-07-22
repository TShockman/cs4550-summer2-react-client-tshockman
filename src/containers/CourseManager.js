import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import Login from './Login';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class CourseManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  setUser = user => {
    this.setState({user})
  };

  render() {
    const {user} = this.state;

    return (
      <Router>
        <div className="container-fluid">
          <h1>Shockman's Course Manager</h1>
          <Switch>
            <Route exact path="/courses" render={props => <CourseList {...props} user={user}/>}/>
            <Route path="/courses/:courseId" render={props => <CourseEditor {...props} user={user}/>}/>
            <Route path="/login/" render={props => <Login {...props} setUser={this.setUser}/>}/>
            <Redirect to="/login"/>
          </Switch>
        </div>
      </Router>
    );
  }
}
