import React from 'react';
import PropTypes from 'prop-types';
import UserService from '../services/UserServiceClient';
import {Redirect} from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

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
    this.setState({[target.id]: target.value});
  };

  render() {
    const {redirect, username, password} = this.state;
    if (redirect) {
      return <Redirect to="/courses"/>;
    }

    return (
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="Enter email..." onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="********" onChange={this.handleInputChange}/>
        </FormGroup>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </Form>
    );
  }
}