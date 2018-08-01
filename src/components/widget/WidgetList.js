import React from 'react';
import PropTypes from 'prop-types';
import {Button, Row, Col, ListGroup, ListGroupItem} from 'reactstrap';

export default class WidgetList extends React.PureComponent {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
    deleteWidget: PropTypes.func.isRequired,
    createWidget: PropTypes.func.isRequired,
    updateWidget: PropTypes.func.isRequired,
    saveWidgets: PropTypes.func.isRequired,
  };

  getWidgetListItems = () => {
    const {widgets} = this.props;
    return widgets.map(widget => {
      return (
        <ListGroupItem>WIDGET</ListGroupItem>
      );
    });
  };

  render() {
    const {saveWidgets} = this.props;

    return (
      <div>
        <Row>
          <Col>
            <h3>Widget List</h3>
          </Col>
          <Col>
            <Button className="pull-right" onClick={saveWidgets}>Save</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {this.getWidgetListItems()}
            </ListGroup>
          </Col>
        </Row>
      </div>
    );
  }
}