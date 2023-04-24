import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import SelectSection from "../SelectSection/SelectSection.component";
import SignupForm from "Components/SignupForm";
import SigninForm from "../SigninForm";

import "./Signup.style.scss";

class SignupComponent extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
    handleSignup: PropTypes.func.isRequired,
    handleSignin: PropTypes.func.isRequired,
  };

  renderNav() {
    const { navigate } = this.props;
    return (
      <div className="Nav-Signup">
        <h2 onClick={() => navigate("/")}>Chill</h2>
      </div>
    );
  }

  selectSections() {
    const { handleSignup, handleSignin } = this.props;

    return [
      {
        name: "Signup",
        Component: SignupForm,
        props: {
          handleSignup,
        },
      },
      {
        name: "Signin",
        Component: SigninForm,
        props: {
          handleSignin,
        },
      },
    ];
  }

  renderSignupForm() {
    // selected prop takes the index of the selected section in the array sent to sections prop.
    return (
      <div className="Form-Signup">
        <SelectSection
          separator="Or"
          sections={this.selectSections()}
          selected={1}
        />
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

export default SignupComponent;
