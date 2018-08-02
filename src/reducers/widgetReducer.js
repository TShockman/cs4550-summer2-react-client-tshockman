import {
  DELETE_WIDGET_LOCALLY,
  FETCH_WIDGETS_FULFILLED,
  CREATE_WIDGET_LOCALLY,
  UPDATE_WIDGET_LOCALLY,
  TOGGLE_PREVIEW,
  MOVE_WIDGET_DOWN,
  MOVE_WIDGET_UP
} from '../actions/widget';
import WidgetService from '../services/WidgetServiceClient';
import {Record} from 'immutable';

const widgetService = WidgetService.instance;

const WidgetState = Record({
  widgets: [],
  previewOnly: false
});

const initialState = new WidgetState();

const sortWidgets = widgets => [...widgets].sort((a, b) => a.ordering - b.ordering);


export const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case MOVE_WIDGET_DOWN: {
      const newWidgets = [...state.widgets];
      for (let i = 0; i < newWidgets.length - 1; i++) {
        if (newWidgets[i].id === action.widgetId) {
          newWidgets[i].ordering++;
          newWidgets[i + 1].ordering--;
        }
      }
      return state.set('widgets', sortWidgets(newWidgets))
    }
    case MOVE_WIDGET_UP: {
      const newWidgets = [...state.widgets];
      for (let i = 1; i < newWidgets.length; i++) {
        if (newWidgets[i].id === action.widgetId) {
          newWidgets[i].ordering--;
          newWidgets[i - 1].ordering++;
        }
      }
      return state.set('widgets', sortWidgets(newWidgets))
    }
    case FETCH_WIDGETS_FULFILLED: {
      return state.set('widgets', sortWidgets(action.widgets));
    }
    case DELETE_WIDGET_LOCALLY: {
      let found = false;
      const newWidgets = [];
      state.widgets.forEach(widget => {
        if (widget.id === action.widgetId) {
          found = true;
          return;
        } else if (found) {
          widget.ordering = widget.ordering - 1;
        }
        newWidgets.push(widget);
      });
      return state.set('widgets', newWidgets);
    }
    case CREATE_WIDGET_LOCALLY: {
      const newWidget = {...action.widget, ordering: state.widgets.length};
      return state.set('widgets', [...state.widgets, newWidget]);
    }
    case UPDATE_WIDGET_LOCALLY: {
      return state.set('widgets', state.widgets.map(widget => widget.id === action.widget.id ? action.widget : widget));
    }
    case TOGGLE_PREVIEW: {
      return state.set('previewOnly', !state.previewOnly);
    }
    default:
      return state;
  }
};