import React from 'react';
import PropTypes from 'prop-types';
import LessonService from '../services/LessonServiceClient';
import LessonTabsItem from '../components/LessonTabsItem';
import LessonCreationForm from '../components/LessonCreationForm';

export default class LessonTabs extends React.Component {
  static propTypes = {
    courseId: PropTypes.number.isRequired,
    moduleId: PropTypes.number.isRequired
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

  render() {
    const {lessons} = this.state;

    let tabs;
    if (!lessons.length) {
      tabs = 'No lessons! Create one.';
    } else {
      tabs = (
        <ul className="nav nav-tabs">
          {lessons.map(lesson => <LessonTabsItem key={lesson.id} lesson={lesson}/>)}
        </ul>
      );
    }

    return (
      <div>
        <LessonCreationForm onSubmitLesson={this.handleCreate}/>
        {tabs}
      </div>
    )

  }
}