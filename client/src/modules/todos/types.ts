import { Action } from "../../types/Misc";

export enum Actions {
  GET_TO_DO_LIST_START = '@todo/GET_TO_DO_LIST_START',
  GET_TO_DO_LIST_FULFILLED = '@todo/GET_TO_DO_LIST_FULFILLED',
  GET_TO_DO_LIST_REJECTED = '@todo/GET_TO_DO_LIST_REJECTED',
  CREATE_TO_DO_ITEM_START = '@todo/CREATE_TO_DO_ITEM_START',
  CREATE_TO_DO_ITEM_FULFILLED = '@todo/CREATE_TO_DO_ITEM_FULFILLED',
  CREATE_TO_DO_ITEM_REJECTED = '@todo/CREATE_TO_DO_ITEM_REJECTED',
  UPDATE_TO_DO_ITEM_START = '@todo/UPDATE_TO_DO_ITEM_START',
  UPDATE_TO_DO_ITEM_FULFILLED = '@todo/UPDATE_TO_DO_ITEM_FULFILLED',
  UPDATE_TO_DO_ITEM_REJECTED = '@todo/UPDATE_TO_DO_ITEM_REJECTED',
  DELETE_TO_DO_ITEM_START = '@todo/DELETE_TO_DO_ITEM_START',
  DELETE_TO_DO_ITEM_FULFILLED = '@todo/DELETE_TO_DO_ITEM_FULFILLED',
  DELETE_TO_DO_ITEM_REJECTED = '@todo/DELETE_TO_DO_ITEM_REJECTED',
}

export type IToDo = {
  _id?: string;
  text: string;
  isCompleted: boolean;
};

export interface ToDoState {
  toDoList: IToDo[];
  apiInProgress: boolean;
}

export type GetToDoListRequest = Action<typeof Actions.GET_TO_DO_LIST_START>;
type GetToDoListAction = Action<typeof Actions.GET_TO_DO_LIST_FULFILLED, IToDo[]>;
type GetToDoListError = Action<typeof Actions.GET_TO_DO_LIST_REJECTED>;

export type CreateToDoItemRequest = Action<typeof Actions.CREATE_TO_DO_ITEM_START, IToDo>;
type CreateToDoItemAction = Action<typeof Actions.CREATE_TO_DO_ITEM_FULFILLED, IToDo>
type CreateToDoItemError = Action<typeof Actions.CREATE_TO_DO_ITEM_REJECTED>;

export type UpdateToDoItemRequest = Action<typeof Actions.UPDATE_TO_DO_ITEM_START, IToDo>;
type UpdateToDoItemAction = Action<typeof Actions.UPDATE_TO_DO_ITEM_FULFILLED, IToDo>;
type UpdateToDoItemError = Action<typeof Actions.UPDATE_TO_DO_ITEM_REJECTED>;

export type DeleteToDoItemRequest = Action<typeof Actions.DELETE_TO_DO_ITEM_START, string>;
type DeleteToDoItemAction = Action<typeof Actions.DELETE_TO_DO_ITEM_FULFILLED>;
type DeleteToDoItemError = Action<typeof Actions.DELETE_TO_DO_ITEM_REJECTED>;

export type ToDoTypes =
| GetToDoListRequest
| GetToDoListAction
| GetToDoListError
| CreateToDoItemRequest
| CreateToDoItemAction
| CreateToDoItemError
| UpdateToDoItemRequest
| UpdateToDoItemAction
| UpdateToDoItemError
| DeleteToDoItemRequest
| DeleteToDoItemAction
| DeleteToDoItemError