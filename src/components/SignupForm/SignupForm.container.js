import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withFormHook } from "Utils/wrappers/formHook";
import withRouter from "Utils/wrappers/react-router/history";
import SignupFormComponent from "./SignupForm.component";

export class SignupForm extends PureComponent {
  static propTypes = {
    handleSignup: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    noConnection: false,
  };

  handleBasedOnStatCode(res, data) {
    const { setError, navigate } = this.props;
    const { status } = res;

    return {
      405: () => setError("email", res.body.errors, { shouldFocus: true }),
      200: () =>
        navigate(`/enter/validate?username=${data.username}`, {
          state: { signupContext: { email: data.email } },
        }),
    }[status]();
  }

  onSubmit(data) {
    const { handleSignup } = this.props;
    this.setState({ isLoading: true });
    handleSignup(data, (res, error) => {
      this.setState({ isLoading: false });

      if (!res) {
        console.error(error);
        return this.setState({ noConnection: true });
      }
      // to remove the prev try "no connection" state.
      this.setState({ noConnection: false });

      return this.handleBasedOnStatCode(res, data);
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

export default withRouter(withFormHook(SignupForm));
