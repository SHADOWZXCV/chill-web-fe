import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SelectSection from "../SelectSection/SelectSection.component";
import SignupForm from "Components/SignupForm";
import SigninForm from "../SigninForm";

import "./Signup.style.scss";

class EnterAccountComponent extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    handleSign: PropTypes.func.isRequired,
  };

  renderNav() {
    const { navigate } = this.props;
    return (
      <div className="Nav-Signup">
        <h2 onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          Chill
        </h2>
      </div>
    );
  }

  getSections() {
    const { handleSign } = this.props;

    return [
      {
        name: "Signup",
        Component: SignupForm,
        props: {
          handleSignup: (data, done) => handleSign("signup", data, done),
        },
      },
      {
        name: "Signin",
        Component: SigninForm,
        props: {
          handleSignin: (data, done) => handleSign("signin", data, done),
        },
      },
    ];
  }

  renderSignupForm() {
    // selected prop takes the index of the selected section in the array sent to sections prop.
    return (
      <div className="Form-Signup">
        <SelectSection separator="Or" sections={this.getSections()} />
      </div>
    );
  }

  render() {
    return (
      <div className="Signup-Container">
        {this.renderNav()}
        {this.renderSignupForm()}
      </div>
    );
  }
}

export default EnterAccountComponent;
