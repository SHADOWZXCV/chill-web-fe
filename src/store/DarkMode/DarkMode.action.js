export const CHANGE_MODE = "CHANGE_MODE";

export const changeTheme = (theme) => ({
  type: CHANGE_MODE,
  payload: theme,
});

export default changeTheme;
