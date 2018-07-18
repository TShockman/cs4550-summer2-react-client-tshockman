import {COURSE_API_URL} from '../config';

const _singleton = Symbol();

export default class CourseService {
  constructor(singletonToken) {
    if (_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly.');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new CourseService(_singleton);
    }
    return this[_singleton]
  }

  createCourse(course) {
    return fetch(COURSE_API_URL, {
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json());
  }

  deleteCourse(course) {
    return fetch(`${COURSE_API_URL}/${course.id}`, {
        method: 'DELETE'
    });
  }

  findAllCourses() {
    return fetch(COURSE_API_URL).then(response => response.json());
  }

  findCourseById(id) {
    return fetch(`${COURSE_API_URL}/${id}`).then(response => response.json());
  }

  updateCourse(course) {
    return fetch(`${COURSE_API_URL}/${course.id}`, {
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
      .then(response => response.json());
  }
}