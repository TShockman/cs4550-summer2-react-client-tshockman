import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

export default class HeadingWidget extends React.PureComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    updateWidget: PropTypes.func.isRequired,
    onlyPreview: PropTypes.bool.isRequired
  };

  renderPreview = () => {
    const {widget} = this.props;
    console.log('Rendering header preview for size', widget.size)
    switch (widget.size) {
      case 1:
        return <h1>{widget.text}</h1>;
      case 2:
        return <h2>{widget.text}</h2>;
      case 3:
        return <h3>{widget.text}</h3>;
    }
  };

  handleUpdate = event => {
    const {updateWidget, widget} = this.props;
    const newWidget = {...widget};
    switch (event.target.id) {
      case 'headingText':
        newWidget.text = event.target.value;
        break;
      case 'headingSize':
        newWidget.size = Number(event.target.value);
        break;
      case 'widgetName':
        newWidget.name = event.target.value;
        break;
    }
    updateWidget(newWidget);
    console.log('Handling update from', event.target.id, event.target.value)
  };
  render() {
    const {widget, onlyPreview} = this.props;

    return (
      <div>
        {!onlyPreview &&
        <Row className="border pt-2">
            <Col>
              <Form>
                <FormGroup>
                  <Label for="headingText">Heading Text</Label>
                  <Input onChange={this.handleUpdate} type="text" id="headingText" placeholder="Heading text..." value={widget.text}/>
                </FormGroup>
                <FormGroup>
                  <Label for="headingSize">Heading Size</Label>
                  <Input onChange={this.handleUpdate} type="select" id="headingSize" value={widget.size}>
                    <option value={1}>Heading 1</option>
                    <option value={2}>Heading 2</option>
                    <option value={3}>Heading 3</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="widgetName">Widget Name</Label>
                  <Input onChange={this.handleUpdate} type="text" id="widgetName" placeholder="Widget name..." value={widget.name}/>
                </FormGroup>
              </Form>
            </Col>
          </Row>
        }
        <Row className="p-2 mt-2">
          <Col>
            {this.renderPreview()}
          </Col>
        </Row>
      </div>
    );
  }
}