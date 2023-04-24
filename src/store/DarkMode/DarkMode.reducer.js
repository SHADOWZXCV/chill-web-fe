import { CHANGE_MODE } from "./DarkMode.action";

const initialState = {
  theme: "light",
};

export const darkModeReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case CHANGE_MODE:
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default darkModeReducer;
