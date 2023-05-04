import React, { PureComponent } from "react";
import PropTypes from "prop-types";

export class SignupEmailValidate extends PureComponent {
  static propTypes = {
    isSuccessfulSignup: PropTypes.bool.isRequired,
    isValidated: PropTypes.bool.isRequired,
    state: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  state = {
    noConnection: false,
  };

  renderPartialMail() {
    const {
      location: { state },
    } = this.props;
    if (state) {
      const {
        signupContext: { email },
      } = state;
      return email.replace(/(\w{2})[\w.-]+@([\w.]+\w)/, "$1*****@$2");
    }

    const { location } = this.props;
    const searchQueryParams = new URLSearchParams(location.search);
    const email = searchQueryParams.get("email");
    const partialMail = email.replace(
      /(\w{2})[\w.-]+@([\w.]+\w)/,
      "$1*****@$2"
    );

    return partialMail;
  }

  renderSuccessfulSignup() {
    return (
      <>
        <h1>A message is on its way to you email!</h1>
        <p>
          Check out your email&apos;s inbox, click the link to verify the email
          address: {this.renderPartialMail()}
        </p>
      </>
    );
  }

  renderEmailValidated() {
    return (
      <>
        <h1>Successful validation!</h1>
        <p>Your email: {this.renderPartialMail()} is validated.</p>
        <p>redirecting...</p>
      </>
    );
  }

  renderNotValidated() {
    return (
      <>
        <h1>Expired validation!</h1>
        <p>
          The token seems to be either expired or wrong, please contact the
          developer to check what went wrong!
        </p>
      </>
    );
  }

  render() {
    const { isSuccessfulSignup, isValidated } = this.props;
    return (
      <div className="PerfectCenterChildren">
        {isSuccessfulSignup
          ? this.renderSuccessfulSignup()
          : isValidated
          ? this.renderEmailValidated()
          : this.renderNotValidated()}
      </div>
    );
  }
}

export default SignupEmailValidate;
