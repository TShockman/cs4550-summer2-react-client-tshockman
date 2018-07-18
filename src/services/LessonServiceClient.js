import {COURSE_API_URL, LESSON_API_URL} from '../config';

const _singleton = Symbol();

export default class LessonService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new LessonService(_singleton);
    }
    return this[_singleton];
  }

  createLesson(courseId, moduleId, lesson) {
    return fetch(`${COURSE_API_URL}/${courseId}/module/${moduleId}/lesson`, {
      body: JSON.stringify(lesson),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json());
  };

  deleteLesson(lesson) {
    return fetch(`${LESSON_API_URL}/${lesson.id}`, {
      method: 'DELETE'
    });
  }

  findAllModules() {
    return fetch(LESSON_API_URL).then(response => response.json());
  }

  findModuleById(lessonId) {
    return fetch(`${LESSON_API_URL}/${lessonId}`).then(response => response.json());
  }

  findAllLessonsForModule(courseId, moduleId) {
    return fetch(`${COURSE_API_URL}/${courseId}/module/${moduleId}/lesson`)
      .then(response => response.json());
  }

  updateLesson(lesson) {
    return fetch(`${LESSON_API_URL}/${lesson.id}`, {
      body: JSON.stringify(lesson),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
      .then(response => response.json());
  }
}