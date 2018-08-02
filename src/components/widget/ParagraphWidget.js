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
    let key = 0;
    return widget.text && <div>{widget.text.split('\n').map(paragraph => <p key={key++}>{paragraph}</p>)}</div>;
  };

  handleUpdate = event => {
    const {updateWidget, widget} = this.props;
    const newWidget = {...widget};
    switch (event.target.id) {
      case 'paragraphText':
        newWidget.text = event.target.value;
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
                <Label for="paragraphText">Paragraph Text</Label>
                <Input onChange={this.handleUpdate} type="textarea" id="paragraphText" placeholder="Paragraph text..." value={widget.text}/>
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