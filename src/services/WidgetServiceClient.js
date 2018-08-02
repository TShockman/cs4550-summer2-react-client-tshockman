import {LESSON_API_URL, WIDGET_API_URL} from '../config';

const _singleton = Symbol();

export default class WidgetService {
  constructor(singletonToken) {
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new WidgetService(_singleton);
    }
    return this[_singleton];
  }

  getWidgets(lessonId) {
    return fetch(`${LESSON_API_URL}/${lessonId}/widget`)
      .then(result => result.json())
      .then(widgets => widgets.map(widg => {
        widg.listItems = JSON.parse(widg.listItems)
        return widg;
        })
      );
  }

  deleteWidget(wid) {
    console.log('deleting widget')
    return fetch(`${WIDGET_API_URL}/${wid}`, {
      method: 'delete'
    }).then(response => response.status === 200)
  }

  createWidget(lid, widget) {
    console.log('creating widget')
    const widgetToCreate = {...widget};
    widgetToCreate.listItems = JSON.stringify(widgetToCreate.listItems);
    delete widgetToCreate.id;
    return fetch(`${LESSON_API_URL}/${lid}/widget`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(widgetToCreate)
    }).then(response => response.json());
  }

  updateWidget(widget) {
    console.log('updating widget')
    const widgetToUpdate = {...widget};
    widgetToUpdate.listItems = JSON.stringify(widgetToUpdate.listItems);

    return fetch(`${WIDGET_API_URL}/${widgetToUpdate.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(widgetToUpdate)
    }).then(response => response.json());
  }
}