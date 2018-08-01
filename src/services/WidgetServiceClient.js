import {LESSON_API_URL, WIDGET_API_URL} from '../config';

const _singleton = Symbol();

export default class WidgetService {
  constructor(singletonToken) {cd
    if(_singleton !== singletonToken) {
      throw new Error('Cannot instantiate directly');
    }
  }

  static get instance() {
    if(!this[_singleton]) {
      this[_singleton] = new UserService(_singleton);
    }
    return this[_singleton];
  }

  getWidgets(lessonId) {
    fetch(`${LESSON_API_URL}/${lessonId}/widget`)
      .then(result => result.json());
  }

  saveWidgets(lessonId, newWidgets) {
    this.getWidgets(lessonId)
      .then(oldWidgets => {
        const widgetMap = {};
        const oldWidgetSet = Set(oldWidgets.map(oldW => oldW.id));
        const newWidgetSet = Set(newWidgets.map(newW => {
          widgetMap[newW.id] = newW;
          return newW.id
        }));
        const actions = newWidgetSet.map(newWid => ({widget: widgetMap[newWid], action: oldWidgetSet.has(newWid) ? 'UPDATE' : 'CREATE'}));
        actions.push(...oldWidgetSet.filter(oldWid => !newWidgetSet.has(oldWid)).map(oldWid => ({id: oldWid, action: 'DELETE'})));
        return actions;
      })
      .then(actions => {
        return Promise.all(actions.map(action => {
          switch (action.action) {
            case 'UPDATE':
              return this.updateWidget(action.widget);
            case 'DELETE':
              return this.deleteWidget(action.wid);
            case 'CREATE':
              return this.createWidget(lessonId, action.widget);
          }
        }));
      });
  }

  deleteWidget(wid) {
    fetch(`${WIDGET_API_URL}/${WID}`, {
      method: 'delete'
    });
  }

  createWidget(lid, widget) {
    fetch(`${LESSON_API_URL}/${lid}/widget`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(widget)
    }).then(response => response.json());
  }

  updateWidget(widget) {
    fetch(`${WIDGET_API_URL}/${widget.id}`, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(widget)
    }).then(response => response.json());
  }
}