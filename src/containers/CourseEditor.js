import React from 'react';
import _get from 'lodash/get';
import CourseService from '../services/CourseServiceClient';
import ModuleList from './ModuleList';

export default class CourseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: null,
      loading: null,
      loaded: null,
      error: null
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
  };

  render() {
    console.log(JSON.stringify(this.props))
    console.log(JSON.stringify(this.state))

    const {course} = this.state;

    if (!course) {
      return <div><h1>Loading course editor</h1></div>;
    }

    return (
      <div>
        <h1>Editing {course.title}</h1>
        <div className="row">
          <div className="col-4">
            <ModuleList courseId={course.id} selectModule={this.selectModule}/>
          </div>
          <div className="col-8">
            <h2>lessons will go here</h2>
          </div>
        </div>
      </div>
    )
  }
}