import React, { PureComponent } from "react";
import { withFormHook } from "../../utils/wrappers/formHook";
import SignupFormComponent from "./SignupForm.component";
import PropTypes from "prop-types";
import history from "../../utils/History";

export class SignupForm extends PureComponent {
  static propTypes = {
    handleSignup: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    noConnection: false,
  };

  onSubmit(data) {
    const { handleSignup, setError } = this.props;
    this.setState({ isLoading: true });
    handleSignup(data, (res) => {
      this.setState({ isLoading: false });
      if (!res) {
        return this.setState({ noConnection: true });
      }
      console.log("res: ", res);
      console.log("data: ", data);
      this.setState({ noConnection: false });
      switch (res.status) {
        case 405:
          setError(
            "email",
            {
              type: "exists",
              message: res.body.error,
            },
            { shouldFocus: true }
          );
          break;
        case 200:
          history.push({
            pathname: `/enter/validate`,
            search: `?username=${data.username}`,
            state: { signupContext: { email: res.body.email } },
          });
      }
    });
  }

  containerFunctions = {
    onSubmit: this.onSubmit.bind(this),
  };

  render() {
    return (
      <SignupFormComponent
        {...this.containerFunctions}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default withFormHook(SignupForm);
