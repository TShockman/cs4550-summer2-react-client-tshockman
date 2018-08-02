import React from 'react';
import PropTypes from 'prop-types';
import {Button, Row, Col, ListGroup, ButtonGroup} from 'reactstrap';
import WidgetCreationForm from './WidgetCreationForm';
import Widget from './Widget';

export default class WidgetList extends React.PureComponent {
  static propTypes = {
    widgets: PropTypes.array.isRequired,
    deleteWidget: PropTypes.func.isRequired,
    createWidget: PropTypes.func.isRequired,
    updateWidget: PropTypes.func.isRequired,
    saveWidgets: PropTypes.func.isRequired,
    fetchWidgets: PropTypes.func.isRequired,
    previewOnly: PropTypes.bool.isRequired,
    togglePreview: PropTypes.func.isRequired,
    moveWidgetUp: PropTypes.func.isRequired,
    moveWidgetDown: PropTypes.func.isRequired,
    lessonId: PropTypes.number.isRequired
  };

  componentDidMount = () => {
    const {fetchWidgets, lessonId} = this.props;
    if (lessonId) {
      fetchWidgets(lessonId);
    }
  };

  componentDidUpdate(prevProps) {
    const {fetchWidgets, lessonId} = this.props;
    const {lessonId: oldLessonId} = prevProps;
    if (lessonId && lessonId !== oldLessonId) {
      fetchWidgets(lessonId);
    }
  }

  getWidgetListItems = () => {
    const {widgets, deleteWidget, updateWidget, previewOnly, moveWidgetUp, moveWidgetDown} = this.props;
    return widgets.map(widget => {
      return (
        <Widget
          key={widget.id}
          onlyPreview={previewOnly}
          widget={widget}
          deleteWidget={deleteWidget}
          updateWidget={updateWidget}
          moveWidgetUp={moveWidgetUp}
          moveWidgetDown={moveWidgetDown}
        />
      );
    });
  };

  handleSave = () => {
    const {lessonId, saveWidgets} = this.props;
    saveWidgets(lessonId);
  };

  render() {
    const {previewOnly, togglePreview, lessonId, createWidget} = this.props;

    return (
      <div>
        <Row className="my-1">
          <Col>
            <h3>Widget List</h3>
          </Col>
          <Col>
            <ButtonGroup className="pull-right">
              <Button onClick={togglePreview} color={previewOnly ? 'warning' : 'secondary'}>Toggle Preview</Button>
              <Button color="success" onClick={this.handleSave}>Save</Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {this.getWidgetListItems()}
            </ListGroup>
          </Col>
        </Row>
        <WidgetCreationForm createWidget={createWidget}/>
      </div>
    );
  }
}