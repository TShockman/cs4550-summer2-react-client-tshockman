import React from 'react';
import PropTypes from 'prop-types';
import ConfirmModal from '../components/ConfirmModal';
import LessonService from '../services/LessonServiceClient';

export default class LessonEdit extends React.Component {
  static propTypes = {
    lesson: PropTypes.object,
    deleteLesson: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.lessonService = LessonService.instance;
  }

  handleDelete = () => {
    const {lesson, deleteLesson} = this.props;
    deleteLesson(lesson);
  };

  render() {
    const {lesson} = this.props;

    if (!lesson) {
      return <div>Select or create a lesson above.</div>;
    }

    return (
      <div>
        <div>Editing Lesson: {lesson.title}</div>
        <ConfirmModal
          title="Confirm Delete"
          message={`Are you sure you want to delete "${lesson.title}"?`}
          onConfirm={this.handleDelete}
          buttonContent={<i className="fa fa-trash"/>}/>
      </div>
    )
  }
}