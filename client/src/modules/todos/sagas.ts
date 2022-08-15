import { all, call, put, takeLatest } from 'redux-saga/effects';
import { omit } from 'lodash';

import { Actions, CreateToDoItemRequest, DeleteToDoItemRequest, GetToDoListRequest, UpdateToDoItemRequest } from "./types";
import { api } from '../../helpers/api';

function* getToDoSaga(action: GetToDoListRequest) {
  try {
    const { data } = yield call(api as any, {
      url: `/todo`,
      method: 'get',
    })

    yield put({ type: Actions.GET_TO_DO_LIST_FULFILLED, payload: data });
  } catch (e) {
    yield put({ type: Actions.GET_TO_DO_LIST_REJECTED, payload: undefined });
  }
}

function* createToDoSaga(action: CreateToDoItemRequest) {
  try {
    yield call(api as any, {
      url: `/todo/create`,
      method: 'post',
      data: action.payload,
    })

    // yield put({ type: Actions.CREATE_TO_DO_ITEM_FULFILLED, payload: action.payload });
    yield put({ type: Actions.GET_TO_DO_LIST_START, payload: undefined });
  } catch (e) {
    yield put({ type: Actions.CREATE_TO_DO_ITEM_REJECTED, payload: undefined });
  }
} 

function* updateToDoSaga(action: UpdateToDoItemRequest) {
  const id = action.payload._id;
  const updateData = { ...omit(action.payload, 'id') };
  try {
    yield call(api as any, {
      url: `/todo/${id}`,
      method: 'patch',
      data: updateData,
    })

    // yield put({ type: Actions.UPDATE_TO_DO_ITEM_FULFILLED, payload: action.payload });
    yield put({ type: Actions.GET_TO_DO_LIST_START, payload: undefined });
  } catch (e) {
    yield put({ type: Actions.UPDATE_TO_DO_ITEM_REJECTED, payload: undefined });
  }
} 

function* deleteToDoSaga(action: DeleteToDoItemRequest) {
  const id = action.payload;
  try {
    yield call(api as any, {
      url: `/todo/${id}`,
      method: 'delete',
    })

    // yield put({ type: Actions.DELETE_TO_DO_ITEM_FULFILLED, payload: id });
    yield put({ type: Actions.GET_TO_DO_LIST_START, payload: undefined });
  } catch (e) {
    yield put({ type: Actions.DELETE_TO_DO_ITEM_REJECTED, payload: undefined });
  }
} 

export function* todoWatchersSaga() {
  yield all ([takeLatest(Actions.GET_TO_DO_LIST_START, getToDoSaga)]);
  yield all ([takeLatest(Actions.CREATE_TO_DO_ITEM_START, createToDoSaga)]);
  yield all ([takeLatest(Actions.UPDATE_TO_DO_ITEM_START, updateToDoSaga)]);
  yield all ([takeLatest(Actions.DELETE_TO_DO_ITEM_START, deleteToDoSaga)]);
}

export default todoWatchersSaga;
