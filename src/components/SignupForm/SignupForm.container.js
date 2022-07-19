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
    noConenction: false,
  };

  onSubmit(data) {
    const { handleSignup, setError } = this.props;
    this.setState({ isLoading: true });
    handleSignup(data, (data) => {
      this.setState({ isLoading: false });
      if (!data) {
        this.setState({ noConenction: true });
      }
      this.setState({ noConenction: false });
      switch (data.status) {
        case 405:
          setError(
            "email",
            {
              type: "exists",
              message: data.body.error,
            },
            { shouldFocus: true }
          );
          break;
        case 200:
          history.push(
            `/enter/validate?successfulSignup=${data.body.username}`
          );
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
