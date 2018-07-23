import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Form,
  Label,
  Input,
  FormGroup
} from 'reactstrap';

const DEFAULT_TITLE = "Default Course Title";

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

    onSubmit({title: title || DEFAULT_TITLE, owner: this.props.user});
    this.setState({course: {title: ''}});
  };

  render() {
    return (
      <div className="row border p-2 m-2">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="courseTitle" className="mr-sm-2">Title</Label>
            <Input type="text" id="courseTitle" placeholder="Course title..." onChange={this.handleChange}/>
          </FormGroup>
          <Button onClick={this.handleSubmit}><i className="fa fa-plus"/></Button>
        </Form>
      </div>
    );
  }
}