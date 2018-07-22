import React from 'react';
import PropTypes from 'prop-types';

export default class CourseCreationForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }

  handleChange = event => {
    this.setState({title: event.target.value});
  };

  handleSubmit = () => {
    const {title} = this.state;
    const {onSubmit} = this.props;
    onSubmit({title, owner: this.props.user});
    this.setState({course: {title: ''}});
  };

  render() {
    return (
      <div className="container-fluid">
        <span className="float-left">Title</span>
        <input className="form-control" placeholder="MATH 101" onChange={this.handleChange} value={this.state.title}/>
        <button onClick={this.handleSubmit}><i className="fa fa-plus"/></button>
      </div>
    );
  }
}