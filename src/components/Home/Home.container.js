import React, { PureComponent } from "react";
import HomeComponent from "./Home.component";
import { connect } from "react-redux";
import changeTheme from "Store/DarkMode/DarkMode.action";
import { PropTypes } from "prop-types";

const mapDispatchToProps = (dispatch) => ({
  changeTheme: (theme) => dispatch(changeTheme(theme)),
});

const mapStateToProps = (state) => ({
  theme: state.darkModeReducer.theme,
});

export class Home extends PureComponent {
  static propTypes = {
    changeTheme: PropTypes.func,
    theme: PropTypes.string,
  };

  componentDidMount() {
    const { changeTheme, theme } = this.props;
    document.theme = theme;
    document.addEventListener("keydown", (ev) => {
      if (ev.key !== "F10") return;
      ev.preventDefault();

      changeTheme(document.theme === "light" ? "dark" : "light");
      document.theme = document.theme === "light" ? "dark" : "light";
    });
  }

  containerFunctions = {};

  containerProps = {
    ...this.props,
    ...this.containerFunctions,
  };

  render() {
    return <HomeComponent {...this.containerProps} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
