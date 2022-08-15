import { Actions, IToDo } from "./types";

export const getToDoList = () => ({
  type: Actions.GET_TO_DO_LIST_START,
  payload: undefined,
});

export const createToDo = (params: IToDo) => ({
  type: Actions.CREATE_TO_DO_ITEM_START,
  payload: params,
});

export const updateToDo = (params: IToDo) => ({
  type: Actions.UPDATE_TO_DO_ITEM_START,
  payload: params,
});

export const deleteToDo = (params: string) => ({
  type: Actions.DELETE_TO_DO_ITEM_START,
  payload: params,
});
