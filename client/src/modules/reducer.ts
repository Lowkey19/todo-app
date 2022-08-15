import { combineReducers } from "redux";
import { reducer as todo } from "./todos";

const reducer = combineReducers({
  todo,
});

export default reducer;