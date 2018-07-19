import React from 'react';
import PropTypes from 'prop-types';

export default class LessonCreationForm extends React.Component {
  static propTypes = {
    onSubmitLesson: PropTypes.func.isRequired
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
    const {onSubmitLesson} = this.props;
    const {title} = this.state;
    const lesson = {title};
    onSubmitLesson(lesson);
    this.setState({title: ''});
  };

  render() {
    return (
      <div className="container-fluid">
        <span className="float-left">Title</span>
        <input className="form-control" placeholder="Lesson 1.1.1" onChange={this.handleChange} value={this.state.title}/>
        <button onClick={this.handleSubmit}><i className="fa fa-plus"/></button>
      </div>
    );
  }
}