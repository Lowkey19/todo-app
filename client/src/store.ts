import { configureStore } from '@reduxjs/toolkit';import createSagaMiddleware from 'redux-saga';

import reducer from './modules/reducer';
import { rootSaga } from './modules/saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ],
});

export type RootState = ReturnType<typeof reducer>;

sagaMiddleware.run(rootSaga);

export default store;