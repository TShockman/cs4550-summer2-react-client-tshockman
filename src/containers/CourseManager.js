import React from 'react';
import CourseList from './CourseList';
import CourseEditor from './CourseEditor';
import Login from './Login';
import {BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import CourseManagerNavbar from './CourseManagerNavbar';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {widgetReducer} from '../reducers/widgetReducer';

const store = createStore(widgetReducer);

export default class CourseManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(window.localStorage.getItem('courseManagerUser'))
    }
  }

  setUser = user => {
    window.localStorage.setItem('courseManagerUser', JSON.stringify(user));
    this.setState({user});
  };

  logout = () => {
    window.localStorage.removeItem('courseManagerUser');
    this.setState({user: null});
  };

  render() {
    const {user} = this.state;

    return (
      <Provider store={store}>
        <Router>
          <div>
            <CourseManagerNavbar logout={this.logout}/>
            <div className="container-fluid border p-2 m-2">
              <Switch>
                <Route exact path="/courses" render={props => <CourseList {...props} user={user}/>}/>
                <Route path="/courses/:courseId" render={props => <CourseEditor {...props} user={user}/>}/>
                <Route path="/login" render={props => <Login {...props} setUser={this.setUser}/>}/>
                <Redirect to="/courses"/>
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}
