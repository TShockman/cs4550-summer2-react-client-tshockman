import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

export default class ImageWidget extends React.PureComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    updateWidget: PropTypes.func.isRequired,
    onlyPreview: PropTypes.bool.isRequired
  };

  renderPreview = () => {
    const {widget} = this.props;
    return <img src={widget.src}/>
  };

  handleUpdate = event => {
    const {updateWidget, widget} = this.props;
    const newWidget = {...widget};
    switch (event.target.id) {
      case 'imageSrc':
        newWidget.src = event.target.value;
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
        <Row className="border pt-2">
          <Col>
            <Form>
              <FormGroup>
                <Label for="imageSrc">Image Source</Label>
                <Input onChange={this.handleUpdate} type="text" id="imageSrc" placeholder="Image Source URL..." value={widget.src}/>
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