import {DELETE_WIDGET, SAVE_WIDGETS, CREATE_WIDGET, UPDATE_WIDGET} from '../actions/widget';

const initialState = {
  widgets: [
    {name: 'widget 1'}
  ]
};

export const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_WIDGETS:
      // do something
      return state;
    case DELETE_WIDGET:
      // do something
      return state;
    case CREATE_WIDGET:
      // do something
      return state;
    case UPDATE_WIDGET:
      // do something
      return state;
    default:
      return state;
  }
};