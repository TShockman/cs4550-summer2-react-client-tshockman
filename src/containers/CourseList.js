import React from 'react';
import {Link} from 'react-router-dom';
import CourseListItem from '../components/CourseListItem';
import CourseCreationForm from '../components/CourseCreationForm';
import CourseService from '../services/CourseServiceClient';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';

export default class CourseList extends React.Component {
  constructor() {
    super();
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
    const {courses} = this.state;

    return (
      <div className="container-fluid">
        <CourseCreationForm onSubmit={this.handleSubmit}/>
        <ul className="list-group">
          {courses && courses.length
            ? courses.map(course => <CourseListItem key={course.id} course={course} onDelete={this.handleDelete}/>)
            : <h3>No courses yet. Add a course to see it here.</h3>}
        </ul>
      </div>
    );
  }
}