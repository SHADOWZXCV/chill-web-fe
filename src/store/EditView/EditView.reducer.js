import { EDIT_VIEW_ACTION } from "./EditView.action";

const initialState = {
  editView: false,
};

export const editViewReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case EDIT_VIEW_ACTION:
      return {
        ...state,
        editView: action.payload,
      };
    default:
      return state;
  }
};

export default editViewReducer;
