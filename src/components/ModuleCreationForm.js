import React from 'react';
import PropTypes from 'prop-types';

export default class ModuleCreationForm extends React.Component {
  static propTypes = {
    onSubmitModule: PropTypes.func.isRequired
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
    const {onSubmitModule} = this.props;
    const {title} = this.state;
    const module = {title};
    onSubmitModule(module);
    this.setState({title: ''});
  };

  render() {
    return (
      <div className="container-fluid">
        <span className="float-left">Title</span>
        <input className="form-control" placeholder="Module A" onChange={this.handleChange} value={this.state.title}/>
        <button onClick={this.handleSubmit}><i className="fa fa-plus"/></button>
      </div>
    );
  }
}