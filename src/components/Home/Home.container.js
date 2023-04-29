import React, { PureComponent } from "react";
import HomeComponent from "./Home.component";
import { connect } from "react-redux";
import changeTheme from "Store/DarkMode/DarkMode.action";
import { PropTypes } from "prop-types";

const mapDispatchToProps = (dispatch) => ({
  switchTheme: (theme) => dispatch(changeTheme(theme)),
});

const mapStateToProps = (state) => ({
  theme: state.darkModeReducer.theme,
});

export class Home extends PureComponent {
  static propTypes = {
    switchTheme: PropTypes.func,
    theme: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.switchHomeTheme = this.switchHomeTheme.bind(this);
  }

  switchHomeTheme(ev) {
    const { switchTheme } = this.props;

    if (ev.key !== "F10") return;
    ev.preventDefault();
    ev.stopImmediatePropagation();

    switchTheme(document.theme === "light" ? "dark" : "light");
    document.theme = document.theme === "light" ? "dark" : "light";
  }

  componentDidMount() {
    const { theme } = this.props;
    document.theme = theme;
    document.addEventListener("keydown", this.switchHomeTheme);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.switchHomeTheme);
  }

  containerFunctions = {};

  containerProps = {
    ...this.containerFunctions,
  };

  render() {
    return <HomeComponent {...this.props} {...this.containerProps} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
