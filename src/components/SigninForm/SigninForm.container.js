import React, { PureComponent } from "react";
import SigninFormComponent from "./SigninForm.component";
import PropTypes from "prop-types";
import { prepareUserEntrance } from "Utils/isSignedIn";
import withRouter from "Utils/wrappers/react-router/history";
import { withFormHook } from "Utils/wrappers/formHook";

export class SigninForm extends PureComponent {
  static propTypes = {
    handleSignin: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    noConnection: false,
  };

  handleBasedOnStatCode(res) {
    const { setError, navigate } = this.props;
    const { status } = res;

    return {
      405: () =>
        setError(
          "username",
          {
            type: "notFound",
            message: "Incorrect username or password, maybe a typo ?",
          },
          { shouldFocus: true }
        ),
      401: () =>
        setError(
          "username",
          {
            type: "notValid",
            message:
              "This user is not valid, check your email and validate the account!",
          },
          { shouldFocus: true }
        ),
      200: () => {
        console.log(res.body.ttl);
        prepareUserEntrance(res.body.ttl);
        navigate("/dashboard");
      },
    }[status]();
  }

  onSubmit(data) {
    const { handleSignin } = this.props;
    this.setState({ isLoading: true });
    handleSignin(data, (res, error) => {
      this.setState({ isLoading: false });

      if (!res) {
        console.error(error);
        return this.setState({ noConnection: true });
      }

      this.setState({ noConnection: false });
      return this.handleBasedOnStatCode(res);
    });
  }

  containerFunctions = {
    onSubmit: this.onSubmit.bind(this),
  };

  render() {
    return (
      <SigninFormComponent
        {...this.containerFunctions}
        {...this.state}
        {...this.props}
      />
    );
  }
}

export default withRouter(withFormHook(SigninForm));
