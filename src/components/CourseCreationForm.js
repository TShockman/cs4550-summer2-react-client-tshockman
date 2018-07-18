import React from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class CourseCreationForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      course: {title: ''}
    }
  }

  handleChange = event => {
    this.setState({course: {title: event.target.value}});
  };

  handleSubmit = () => {
    const {onSubmit} = this.props;
    onSubmit(this.state.course);
    this.setState({course: {title: ''}});
  };

  render() {
    return (
      <div className="container-fluid">
        <span className="float-left">Title</span>
        <input className="form-control" placeholder="MATH 101" onChange={this.handleChange} value={this.state.course.title}/>
        <button onClick={this.handleSubmit}><i className="fa fa-plus"/></button>
      </div>
    );
  }
}