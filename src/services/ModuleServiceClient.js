import {COURSE_API_URL, MODULE_API_URL} from '../config';

const _singleton = Symbol();

export default class ModuleService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new ModuleService(_singleton);
    }
    return this[_singleton];
  }

  createModule(courseId, module) {
    return fetch(`${COURSE_API_URL}/${courseId}/module`, {
      body: JSON.stringify(module),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json());
  };

  deleteModule(module) {
    return fetch(`${MODULE_API_URL}/${module.id}`, {
      method: 'DELETE'
    });
  }

  findAllModules() {
    return fetch(MODULE_API_URL).then(response => response.json());
  }

  findModuleById(moduleId) {
    return fetch(`${MODULE_API_URL}/${moduleId}`).then(response => response.json());
  }

  findAllModulesForCourse(courseId) {
    return fetch(`${COURSE_API_URL}/${courseId}/module`).then(response => response.json());
  }

  updateModule(module) {
    return fetch(`${MODULE_API_URL}/${module.id}`, {
      body: JSON.stringify(module),
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT'
    })
      .then(response => response.json());
  }
}