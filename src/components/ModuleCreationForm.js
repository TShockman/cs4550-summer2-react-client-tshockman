import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button
} from 'reactstrap';

const DEFAULT_TITLE = 'Default Module Title';

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
    const module = {title: title || DEFAULT_TITLE};
    onSubmitModule(module);
    this.setState({title: ''});
  };

  render() {
    return (
      <div className="row border p-2 m-2">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="moduleTitle" className="mr-sm-2">Title</Label>
            <Input type="text" id="moduleTitle" placeholder="Module title..." onChange={this.handleChange}/>
          </FormGroup>
          <Button onClick={this.handleSubmit}><i className="fa fa-plus"/></Button>
        </Form>
      </div>
    );
  }
}