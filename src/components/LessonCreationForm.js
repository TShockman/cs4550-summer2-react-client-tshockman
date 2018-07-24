import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const DEFAULT_TITLE = 'Default Lesson Title';

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
    const lesson = {title: title || DEFAULT_TITLE};
    onSubmitLesson(lesson);
    this.setState({title: ''});
  };

  render() {
    return (
      <div className="row border p-2 m-2">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="lessonTitle" className="mr-sm-2">Title</Label>
            <Input value={this.state.title} type="text" id="lessonTitle" placeholder="Lesson title..." onChange={this.handleChange}/>
          </FormGroup>
          <Button onClick={this.handleSubmit}><i className="fa fa-plus"/></Button>
        </Form>
      </div>
    );
  }
}