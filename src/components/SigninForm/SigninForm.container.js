import React, { PureComponent } from "react";
import { withFormHook } from "../../utils/wrappers/formHook";
import SigninFormComponent from "./SigninForm.component";
import PropTypes from "prop-types";
// import history from "../../utils/History";

export class SigninForm extends PureComponent {
  static propTypes = {
    handleSignin: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
  };

  state = {
    isLoading: false,
    noConnection: false,
  };

  // (data) => {
  //   this.setState({ isLoading: true });
  //   handleSignin(data, (data) => {
  //     this.setState({ isLoading: false });
  //     switch (data.status) {
  //       case 404:
  //         setError(
  //           "username",
  //           {
  //             type: "notFound",
  //             message: "This user is not found, maybe a typo ?",
  //           },
  //           { shouldFocus: true }
  //         );
  //         break;
  //     }
  //   });
  // })
  onSubmit(data) {
    const { handleSignin, setError } = this.props;
    this.setState({ isLoading: true });
    handleSignin(data, (res) => {
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
            "username",
            {
              type: "notFound",
              message: "This user is not found, maybe a typo ?",
            },
            { shouldFocus: true }
          );
          break;
        case 200:
          console.log("signed in!");
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

export default withFormHook(SigninForm);
