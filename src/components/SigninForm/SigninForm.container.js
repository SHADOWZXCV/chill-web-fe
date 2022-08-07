import React, { PureComponent } from "react";
import SigninFormComponent from "./SigninForm.component";
import PropTypes from "prop-types";
import { prepareUserEntrance } from "Utils/isSignedIn";

export class SigninForm extends PureComponent {
  static propTypes = {
    handleSignin: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    isLoading: false,
    noConnection: false,
  };

  onSubmit(data, setError) {
    const { handleSignin, history } = this.props;
    this.setState({ isLoading: true });
    handleSignin(data, (res) => {
      this.setState({ isLoading: false });
      if (!res) {
        return this.setState({ noConnection: true });
      }

      this.setState({ noConnection: false });
      switch (res.status) {
        case 404:
          setError(
            "username",
            {
              type: "notFound",
              message: "This user is not found, maybe a typo ?",
            },
            { shouldFocus: true }
          );
          break;
        case 403:
          setError(
            "username",
            {
              type: "notValid",
              message:
                "This user is not valid, check your email and validate the account!",
            },
            { shouldFocus: true }
          );
          break;
        case 200:
          prepareUserEntrance(res.body.ttl);
          history.push("/dashboard");
          break;
      }
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

export default SigninForm;
