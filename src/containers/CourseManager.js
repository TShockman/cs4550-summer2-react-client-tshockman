import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import Login from './Login';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import CourseManagerNavbar from './CourseManagerNavbar';

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

  logout = () => {
    this.setUser(null)
  };

  render() {
    const {user} = this.state;

    return (
      <Router>
        <div>
          <CourseManagerNavbar logout={this.logout}/>
          <div className="container-fluid">
            <Switch>
              <Route exact path="/courses" render={props => <CourseList {...props} user={user}/>}/>
              <Route path="/courses/:courseId" render={props => <CourseEditor {...props} user={user}/>}/>
              <Route path="/login/" render={props => <Login {...props} setUser={this.setUser}/>}/>
              <Redirect to="/login"/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}
