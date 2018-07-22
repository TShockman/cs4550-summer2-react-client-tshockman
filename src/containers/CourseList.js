import React from 'react';
import PropTypes from 'prop-types';
import CourseListItem from '../components/CourseListItem';
import CourseCreationForm from '../components/CourseCreationForm';
import CourseService from '../services/CourseServiceClient';
import {Redirect} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class CourseList extends React.Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      courses: null
    };
    this.courseService = CourseService.instance;
  }

  componentDidMount = () => {
    this.findAllCourses();
  };

  findAllCourses = () => {
    this.courseService.findAllCourses()
      .then(courses => this.setState({courses}));
  };

  handleSubmit = course => {
    this.courseService.createCourse(course)
      .then(this.findAllCourses);
  };

  handleDelete = course => {
    this.courseService.deleteCourse(course)
      .then(this.findAllCourses);
  };

  render() {
    console.log('CourseList state', JSON.stringify(this.state, null, 2));
    console.log('CourseList props', JSON.stringify(this.props, null, 2));
    const {courses} = this.state;
    const {user} = this.props;

    if (!user) {
      return <Redirect to="/login"/>;
    }

    return (
      <div className="container-fluid">
        <CourseCreationForm onSubmit={this.handleSubmit} user={user}/>
        <div>
          <span>Title</span>
          <span>Owner</span>
          <span>Last Modified</span>
          <span>Actions</span>
        </div>
        <ul className="list-group">
          {courses && courses.length
            ? courses.map(course => <CourseListItem key={course.id} course={course} onDelete={this.handleDelete}/>)
            : <h3>No courses yet. Add a course to see it here.</h3>}
        </ul>
      </div>
    );
  }
}