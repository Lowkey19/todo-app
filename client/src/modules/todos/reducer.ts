import { Actions, ToDoState, ToDoTypes } from "./types";

export const initialState: ToDoState = {
  toDoList: [],
  apiInProgress: false,
};

const reducer = (state = initialState, action: ToDoTypes) => {
  switch(action.type) {
    case Actions.GET_TO_DO_LIST_START: {
      return {
        ...state,
        apiInProgress: true,
      }
    }
    case Actions.GET_TO_DO_LIST_FULFILLED: {
      return {
        ...state,
        toDoList: action.payload,
        apiInProgress: false,
      }
    }
    case Actions.GET_TO_DO_LIST_REJECTED: {
      return {
        ...state,
        apiInProgress: false,
      }
    }
    case Actions.CREATE_TO_DO_ITEM_FULFILLED: {
      return {
        ...state,
        apiInProgress: false,
        // toDoList: [...state.toDoList, action.payload],
      };
    }
    case Actions.UPDATE_TO_DO_ITEM_FULFILLED: {
      const { _id } = action.payload;
      const toDoIndex = state.toDoList.findIndex((obj) => obj._id === _id);
      state.toDoList[toDoIndex] = action.payload;
      return {
        ...state,
        apiInProgress: false,
        toDoList: state.toDoList,
      };
    }
    case Actions.DELETE_TO_DO_ITEM_FULFILLED: {
      const toDoIndex = state.toDoList.findIndex((obj) => obj._id === action.payload);
      state.toDoList.splice(toDoIndex, 1);
      return {
        ...state,
        apiInProgress: false,
        toDoList: state.toDoList,
      };
    }
    default: {
      return state;
    }
  }
}

export default reducer;