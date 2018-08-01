import {connect} from 'react-redux'
import WidgetList from '../../components/widget/WidgetList';
import {CREATE_WIDGET, DELETE_WIDGET, SAVE_WIDGETS, UPDATE_WIDGET} from '../../actions/widget';

function mapStateToProps(state) {
  return {
    widgets: state.widgets
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteWidget: wid => dispatch({
      type: DELETE_WIDGET,
      widgetId: wid
    }),
    createWidget: w => dispatch({
      type: CREATE_WIDGET,
      widget: w
    }),
    updateWidget: w => dispatch({
      type: UPDATE_WIDGET,
      widget: w
    }),
    saveWidgets: () => dispatch({
      type: SAVE_WIDGETS
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);