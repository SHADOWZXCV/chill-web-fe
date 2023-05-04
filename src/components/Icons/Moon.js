import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { changeTheme } from "../../store/DarkMode/DarkMode.action";

const mapStateToProps = (state) => ({ theme: state.darkModeReducer.theme });
const mapDispatchToProps = (dispatch) => ({
  changeTheme: (theme) => dispatch(changeTheme(theme)),
});

export class Moon extends PureComponent {
  render() {
    const { theme, changeTheme } = this.props;

    return (
      <svg
        stroke="currentColor"
        fill={theme === "light" ? "#777C84" : "#FCD03E"}
        strokeWidth="0"
        viewBox="0 0 512 512"
        height="2rem"
        width="2rem"
        onClick={() => changeTheme(theme === "dark" ? "light" : "dark")}
      >
        <path
          stroke="currentColor"
          strokeWidth="2"
          d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"
        ></path>
      </svg>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Moon);
