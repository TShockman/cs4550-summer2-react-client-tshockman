import {connect} from 'react-redux'
import WidgetList from '../../components/widget/WidgetList';
import {
  CREATE_WIDGET_LOCALLY,
  DELETE_WIDGET_LOCALLY,
  FETCH_WIDGETS_REQUESTED,
  SAVE_WIDGETS,
  TOGGLE_PREVIEW,
  UPDATE_WIDGET_LOCALLY,
  MOVE_WIDGET_UP,
  MOVE_WIDGET_DOWN
} from '../../actions/widget';

function mapStateToProps(state) {
  console.log('STATE in map state to props', state);
  return {
    widgets: state.widgets,
    previewOnly: state.previewOnly
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteWidget: wid => dispatch({
      type: DELETE_WIDGET_LOCALLY,
      widgetId: wid
    }),
    createWidget: w => dispatch({
      type: CREATE_WIDGET_LOCALLY,
      widget: w
    }),
    updateWidget: w => dispatch({
      type: UPDATE_WIDGET_LOCALLY,
      widget: w
    }),
    saveWidgets: lid => dispatch({
      type: SAVE_WIDGETS,
      lessonId: lid
    }),
    fetchWidgets: lid => dispatch({
      type: FETCH_WIDGETS_REQUESTED,
      lessonId: lid
    }),
    togglePreview: () => dispatch({
      type: TOGGLE_PREVIEW
    }),
    moveWidgetUp: wid => dispatch({
      type: MOVE_WIDGET_UP,
      widgetId: wid
    }),
    moveWidgetDown: wid => dispatch({
      type: MOVE_WIDGET_DOWN,
      widgetId: wid
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);