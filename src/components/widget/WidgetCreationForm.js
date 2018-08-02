import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, Button} from 'reactstrap';

export default class WidgetCreationForm extends React.PureComponent {
  static propTypes = {
    createWidget: PropTypes.func.isRequired
  };

  onCreate = () => {
    const {createWidget, lessonId} = this.props;
    const baseWidget = {
      id: Date.now(),
      type: 'HEADING',
      size: 1
    };
    createWidget(baseWidget);
  };

  render() {
    return (
      <Row>
        <Col>
          <Button color="primary" onClick={this.onCreate}>Create Widget</Button>
        </Col>
      </Row>
    )
  }

}