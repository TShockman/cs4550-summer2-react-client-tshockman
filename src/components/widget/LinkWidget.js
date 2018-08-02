import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

export default class LinkWidget extends React.PureComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    updateWidget: PropTypes.func.isRequired,
    onlyPreview: PropTypes.bool.isRequired
  };

  renderPreview = () => {
    const {widget} = this.props;
    return <a href={widget.href} target="_blank">{widget.text || widget.href}</a>
  };

  handleUpdate = event => {
    const {updateWidget, widget} = this.props;
    const newWidget = {...widget};
    switch (event.target.id) {
      case 'linkText':
        newWidget.text = event.target.value;
        break;
      case 'linkHref':
        newWidget.href = event.target.value;
        break;
      case 'widgetName':
        newWidget.name = event.target.value;
        break;
    }
    updateWidget(newWidget);
  };
  render() {
    const {widget, onlyPreview} = this.props;

    return (
      <div>
        {!onlyPreview &&
        <Row className="border">
          <Col>
            <Form>
              <FormGroup>
                <Label for="linkText">Link Text</Label>
                <Input onChange={this.handleUpdate} type="text" id="linkText" placeholder="Link text..." value={widget.text}/>
              </FormGroup>
              <FormGroup>
                <Label for="linkHref">Link URL</Label>
                <Input onChange={this.handleUpdate} type="text" id="linkHref" placeholder="Link URL..." value={widget.href}/>
              </FormGroup>
              <FormGroup>
                <Label for="widgetName">Widget Name</Label>
                <Input onChange={this.handleUpdate} type="text" id="widgetName" placeholder="Widget name..." value={widget.name}/>
              </FormGroup>
            </Form>
          </Col>
        </Row>
        }
        <Row className="border">
          <Col>
            {this.renderPreview()}
          </Col>
        </Row>
      </div>
    );
  }
}