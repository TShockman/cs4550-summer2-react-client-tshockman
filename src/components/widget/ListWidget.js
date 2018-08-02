import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Form, FormGroup, Label, Input} from 'reactstrap';

export default class ListWidget extends React.PureComponent {
  static propTypes = {
    widget: PropTypes.object.isRequired,
    updateWidget: PropTypes.func.isRequired,
    onlyPreview: PropTypes.bool.isRequired
  };

  renderPreview = () => {
    const {widget} = this.props;
    let key = 0;
    if (widget.listType === 'ORDERED') {
      return <ol>{widget.listItems.map(listItem => <li key={key++}>{listItem}</li>)}</ol>;
    }
    return <ul>{widget.listItems.map(listItem => <li key={key++}>{listItem}</li>)}</ul>;
  };

  handleUpdate = event => {
    const {updateWidget, widget} = this.props;
    const newWidget = {...widget};
    switch (event.target.id) {
      case 'listText':
        newWidget.text = event.target.value;
        newWidget.listItems = newWidget.text ? newWidget.text.split('\n') : [];
        break;
      case 'listType':
        newWidget.listType = event.target.value;
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
                <Label for="listText">List Text</Label>
                <Input onChange={this.handleUpdate} type="textarea" id="listText" placeholder="Enter one list item per line" value={widget.text}/>
              </FormGroup>
              <FormGroup>
                <Label for="listType">List Type</Label>
                <Input onChange={this.handleUpdate} type="select" id="listType" value={widget.listType}>
                  <option value="UNORDERED">Unordered List</option>
                  <option value="ORDERED">Ordered List</option>
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