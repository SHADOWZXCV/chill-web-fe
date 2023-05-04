import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { withFormHook } from "Utils/wrappers/formHook";
import withLocation from "Utils/wrappers/react-router/location";
import Loading from "Components/Loading/Loading.component";
import SignupEmailValidateComponent from "./SignupEmailValidate.component";

export class SignupEmailValidate extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    navigate: PropTypes.func,
  };

  state = {
    isSuccessfulSignup: false,
    isValidated: false,
  };

  componentDidMount() {
    const {
      navigate,
      location,
      location: { state },
    } = this.props;
    const searchQueryParams = new URLSearchParams(location.search);
    const tokenParam = searchQueryParams.get("token");
    const emailParam = searchQueryParams.get("email");
    const nameParam = searchQueryParams.get("username");

    if (tokenParam && emailParam) {
      this.validateToken({ token: tokenParam, email: emailParam });
    } else if (nameParam && state) {
      this.setState({ isSuccessfulSignup: true });
    } else navigate("/");
  }

  async validateToken(data) {
    const { navigate } = this.props;
    const { token, email } = data;

    const response = await fetch("http://localhost:3000/signup/validate", {
      method: "POST",
      mode: "cors",
      withCredentials: true,
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ token, email }),
    });

    if (!response.ok) return this.setState({ isValidated: false });
    this.setState({ isValidated: true });

    setTimeout(
      () =>
        navigate({
          pathname: "/",
          search: `?successfulSignup=1`,
        }),
      5000
    );
  }

  containerFunctions = {
    validateToken: this.validateToken.bind(this),
  };

  render() {
    const { isValidated, isSuccessfulSignup } = this.state;
    return isValidated || !isValidated || isSuccessfulSignup ? (
      <SignupEmailValidateComponent
        {...this.props}
        {...this.containerFunctions}
        {...this.state}
      />
    ) : (
      <Loading isLoading={true} />
    );
  }
}

export default withLocation(withFormHook(SignupEmailValidate));
