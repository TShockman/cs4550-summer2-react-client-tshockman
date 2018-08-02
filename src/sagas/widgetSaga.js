import {all, fork, select, call, put, takeLatest} from 'redux-saga/effects';
import WidgetService from '../services/WidgetServiceClient';
import {FETCH_WIDGETS_FULFILLED, FETCH_WIDGETS_REQUESTED, SAVE_WIDGETS} from '../actions/widget';
import {selectWidgets} from '../selectors/widgetSelector';

const widgetService = WidgetService.instance;

function * fetchWidgets({lessonId}) {
  const widgets = yield call(widgetService.getWidgets, lessonId);
  yield put({type: FETCH_WIDGETS_FULFILLED, widgets});
}

function * saveWidgets({lessonId}) {
  const [newWidgets, oldWidgets] = yield all([
    select(selectWidgets),
    call(widgetService.getWidgets, lessonId)
  ]);

  const widgetMap = {};
  const oldWidgetSet = new Set(oldWidgets.map(oldW => oldW.id));
  const newWidgetSet = new Set(newWidgets.map(newW => {
    widgetMap[newW.id] = newW;
    return newW.id
  }));
  const actions = [...newWidgetSet].map(newWid => oldWidgetSet.has(newWid) ? [widgetService.updateWidget, widgetMap[newWid]] : [widgetService.createWidget, lessonId, widgetMap[newWid]]);
  actions.push(...[...oldWidgetSet].filter(oldWid => !newWidgetSet.has(oldWid)).map(oldWid => [widgetService.deleteWidget, oldWid]));

  const results = yield all([
    actions.map(action => call(...action))
  ]);

  console.log('RESULTS FROM SAVE ACTIONS', results);

  yield fetchWidgets({lessonId});
}

export default function * rootSaga () {
  yield all([
    fork(takeLatest, FETCH_WIDGETS_REQUESTED, fetchWidgets),
    fork(takeLatest, SAVE_WIDGETS, saveWidgets)
  ])
}