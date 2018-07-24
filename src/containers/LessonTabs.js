import React from 'react';
import PropTypes from 'prop-types';
import LessonService from '../services/LessonServiceClient';
import LessonTabsItem from '../components/LessonTabsItem';
import LessonCreationForm from '../components/LessonCreationForm';
import LessonEdit from './LessonEdit';
import {Nav} from 'reactstrap';

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
    return this.lessonService.findAllLessonsForModule(courseId, moduleId)
      .then(lessons => {
        const lessonsWithCourseAndModule = lessons.map(lesson => {
          lesson.course = {id: courseId};
          lesson.module = {id: moduleId};
          return lesson;
        });
        this.setState({lessons: lessonsWithCourseAndModule});
        return lessonsWithCourseAndModule;
      });
  };

  getLessonList = () => {
    const {selectedLessonId, selectLesson, moduleId} = this.props;
    const {lessons} = this.state;

    if (!moduleId) {
      return '<-- Please select or create a module to get started.';
    }

    if (!lessons.length) {
      return 'No lessons! Create one.';
    }
    return (
      <Nav tabs>
        {lessons.map(lesson => {
         return <LessonTabsItem key={lesson.id} active={lesson.id === selectedLessonId} lesson={lesson} selectLesson={selectLesson}/>;
        })}
      </Nav>
    );
  };

  deleteLesson = lesson => {
    const {selectLesson} = this.props;
    this.lessonService.deleteLesson(lesson)
      .then(this.loadLessons)
      .then(lessons => {
        if (lessons.length) {
          selectLesson(lessons[0])
        }
      });
  };

  render() {
    const {lessons} = this.state;
    const {selectedLessonId} = this.props;

    return (
      <div>
        <LessonCreationForm onSubmitLesson={this.handleCreate}/>
        {this.getLessonList()}
        <LessonEdit lessons={lessons} selectedLessonId={selectedLessonId} deleteLesson={this.deleteLesson}/>
      </div>
    )

  }
}