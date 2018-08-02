import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from '../components/ConfirmModal';
import {TabContent, TabPane, Row, Col} from 'reactstrap';
import WidgetListContainer from './widget/WidgetListContainer';

export default class LessonEdit extends React.Component {
  static propTypes = {
    selectedLessonId: PropTypes.string,
    lessons: PropTypes.object,
    deleteLesson: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
  }

  getHandleDelete = lesson => () => {
    const {deleteLesson} = this.props;
    deleteLesson(lesson);
  };

  getTabPanes = () => {
    const {lessons, selectedLessonId} = this.props;

    return lessons.map(lesson => {
      return (
        <TabPane tabId={lesson.id} key={lesson.id}>
          <Row>
            <Col>
              Editing Lesson: {lesson.title}
            </Col>
            <Col>
              <ConfirmModal
                title="Confirm Delete"
                message={`Are you sure you want to delete "${lesson.title}"?`}
                onConfirm={this.getHandleDelete(lesson)}
                buttonContent="Delete Lesson"/>
            </Col>
          </Row>
          <WidgetListContainer lessonId={selectedLessonId}/>
        </TabPane>
      );
    })
  };

  render() {
    const {selectedLessonId} = this.props;

    if (!selectedLessonId) {
      return <div className="p-2">Select or create a lesson above.</div>;
    }

    return (
      <TabContent activeTab={selectedLessonId} className="p-2">
        {this.getTabPanes()}
      </TabContent>
    );
  }
}