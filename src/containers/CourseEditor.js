import React from 'react';
import _get from 'lodash/get';
import CourseService from '../services/CourseServiceClient';
import ModuleList from './ModuleList';
import LessonTabs from './LessonTabs';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import LessonEdit from './LessonEdit';

export default class CourseEditor extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      course: null,
      loading: null,
      loaded: null,
      error: null,
      selectedModuleId: null,
      selectedLessonId: null
    };
    this.courseService = CourseService.instance;
  }

  componentDidMount = () => {
    const courseId = _get(this.props, 'match.params.courseId');
    this.fetchCourse(courseId);
  };

  componentDidUpdate = (prevProps) => {
      const prevId = _get(prevProps, 'match.params.courseId');
      const currId = _get(this.props, 'match.params.courseId');
      if (prevId !== currId) {
        this.fetchCourse(currId);
      }
  };

  fetchCourse = id => {
    if (id === this.state.loading) {
      return;
    }
    console.log('Fetching course', id);
    this.setState({loaded: null, loading: id});
    this.courseService.findCourseById(id)
      .then(course => this.setState({course, loaded: id, loading: null}))
      .catch(error => this.setState({course: null, loaded: null, loading: null, error}));

  };

  selectModule = module => {
    console.log('Module selected', module);
    this.setState({selectedModuleId: module && module.id});
  };

  selectLesson = lesson => {
    console.log('Lesson selected', lesson);
    this.setState({selectedLessonId: lesson.id});
  };

  render() {
    const {user} = this.props;
    if (!user) {
      return <Redirect to="/login"/>;
    }

    const {course, selectedModuleId, selectedLessonId} = this.state;

    if (!course) {
      return <div><h1>Loading course editor</h1></div>;
    }

    return (
      <div>
        <h1>Editing {course.title}</h1>
        <div className="row">
          <div className="col-4">
            <ModuleList courseId={course.id} selectedModuleId={selectedModuleId} selectModule={this.selectModule}/>
          </div>
          <div className="col-8">
            <LessonTabs courseId={course.id} moduleId={selectedModuleId} selectedLessonId={selectedLessonId} selectLesson={this.selectLesson}/>
          </div>
        </div>
      </div>
    )
  }
}