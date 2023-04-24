import { combineReducers } from "redux";

import darkModeReducer from "./DarkMode";
import editViewReducer from "./EditView";

const rootReducer = combineReducers({
  darkModeReducer,
  editViewReducer,
});

export default rootReducer;
