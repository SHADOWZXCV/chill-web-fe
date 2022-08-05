import React, { PureComponent } from "react";
import SignupEmailValidateComponent from "./SignupEmailValidate.component";
import Loading from "../Loading/Loading.component";
import { withFormHook } from "../../utils/wrappers/formHook";
import PropTypes from "prop-types";

export class SignupEmailValidate extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  state = {
    isSuccessfulSignup: false,
    isValidated: false,
  };

  componentDidMount() {
    const {
      history,
      location,
      location: { state },
    } = this.props;
    const searchQueryParams = new URLSearchParams(location.search);
    const tokenParam = searchQueryParams.get("token");
    const emailParam = searchQueryParams.get("email");
    const nameParam = searchQueryParams.get("username");
    if (tokenParam && emailParam) {
      console.log(tokenParam, emailParam);
      this.validateToken({ token: tokenParam, email: emailParam });
    } else if (nameParam && state) {
      console.log(nameParam);
      this.setState({ isSuccessfulSignup: true });
    } else history.push("/");
  }

  async validateToken(data) {
    const { history } = this.props;
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
        history.push({
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

export default withFormHook(SignupEmailValidate);
