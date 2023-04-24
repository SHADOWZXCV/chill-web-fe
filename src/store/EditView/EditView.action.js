export const EDIT_VIEW_ACTION = "EDIT_VIEW";

export const changeEditView = (switcher) => ({
  type: EDIT_VIEW_ACTION,
  payload: switcher,
});

export default changeEditView;
