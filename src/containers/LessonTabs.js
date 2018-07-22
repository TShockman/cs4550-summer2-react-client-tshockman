import React from 'react';
import PropTypes from 'prop-types';
import LessonService from '../services/LessonServiceClient';
import LessonTabsItem from '../components/LessonTabsItem';
import LessonCreationForm from '../components/LessonCreationForm';

export default class LessonTabs extends React.Component {
  static propTypes = {
    courseId: PropTypes.number.isRequired,
    moduleId: PropTypes.number,
    selectLesson: PropTypes.func.isRequired,
    selectedLessonId: PropTypes.number
  };

  constructor(props) {
    super(props);
    this.lessonService = LessonService.instance;
    this.state = {
      lessons: []
    };
  }

  componentDidMount() {
    if (this.props.moduleId) {
      this.loadLessons();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.moduleId !== this.props.moduleId) {
      this.loadLessons();
    }
  }

  handleCreate = lesson => {
    const {courseId, moduleId} = this.props;
    this.lessonService.createLesson(courseId, moduleId, lesson)
      .then(this.loadLessons);
  };

  loadLessons = () => {
    const {courseId, moduleId} = this.props;
    this.lessonService.findAllLessonsForModule(courseId, moduleId)
      .then(lessons => {
        const lessonsWithCourseAndModule = lessons.map(lesson => {
          lesson.course = {id: courseId};
          lesson.module = {id: moduleId};
          return lesson;
        });
        this.setState({lessons: lessonsWithCourseAndModule});
      });
  };

  getLessonList = () => {
    const {selectedLessonId, selectLesson, moduleId} = this.props;
    const {lessons} = this.state;

    if (!moduleId) {
      return '<-- Please select or craete a module to get started.';
    }

    if (!lessons.length) {
      return 'No lessons! Create one.';
    }
    return (
      <ul className="nav nav-tabs">
        {lessons.map(lesson => {
         return <LessonTabsItem key={lesson.id} active={lesson.id === selectedLessonId} lesson={lesson} selectLesson={selectLesson}/>;
        })}
      </ul>
    );
  };

  render() {
    return (
      <div>
        <LessonCreationForm onSubmitLesson={this.handleCreate}/>
        {this.getLessonList()}
      </div>
    )

  }
}