import React from 'react';
import PropTypes from 'prop-types';
import UserService from '../services/UserServiceClient';
import {Redirect} from 'react-router-dom';

export default class Login extends React.Component {
  static propTypes = {
    setUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.userService = UserService.instance;
    this.state = {
      username: '',
      password: '',
      redirect: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const {setUser} = this.props;
    const user = {username: this.state.username, password: this.state.password};
    this.userService.login(user)
      .then(user => {
        this.setState({username: '', password: ''});
        if (user) {
          if (['FACULTY', 'ADMIN'].includes(user.role)) {
            setUser(user);
            this.setState({redirect: true});
          }
          else {
            alert('This application is only for FACULTY, please visit the STUDENT application.');
          }
        } else {
          alert('Incorrect username or password');
        }
      })
  };

  handleInputChange = event => {
    const {target} = event;
    this.setState({[target.name]: target.value});
  };

  render() {
    const {redirect, username, password} = this.state;
    if (redirect) {
      return <Redirect to="/courses"/>;
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username
          <input name="username" placeholder="joe" type="text" value={username} onChange={this.handleInputChange}/>
        </label>
        <label>
          Password
          <input name="password" placeholder="****" type="password" value={password} onChange={this.handleInputChange}/>
        </label>
        <input type="submit" value="Login"/>
      </form>
    );
  }
}