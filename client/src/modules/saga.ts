import { all, fork } from 'redux-saga/effects';

import { todoWatchersSaga } from './todos';

export function* rootSaga() {
  yield all([fork(todoWatchersSaga)]);
}