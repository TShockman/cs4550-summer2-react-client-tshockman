import React from 'react';
import PropTypes from 'prop-types';
import CourseListItem from '../components/CourseListItem';
import CourseCreationForm from '../components/CourseCreationForm';
import CourseService from '../services/CourseServiceClient';
import {Redirect} from 'react-router-dom';
import {Table} from 'reactstrap';

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
        <Table className="border">
          <thead>
            <tr>
              <th>Title</th>
              <th>Owner</th>
              <th>Last Modified</th>
              <th>Actions</th>
            </tr>
          </thead>
          {courses && courses.length
            ? <tbody>
                {courses.map(course => <CourseListItem key={course.id} course={course} onDelete={this.handleDelete}/>)}
              </tbody>
            : <h3 className="m-4">No courses yet. Add a course above to see it here.</h3>}
        </Table>
      </div>
    );
  }
}