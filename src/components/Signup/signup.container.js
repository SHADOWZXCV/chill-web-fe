import React, { PureComponent } from "react";
import { withRouter } from "react-router-dom";
import SignupComponent from "./Signup.component";

class Signup extends PureComponent {
  async handleSignup(data, done) {
    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const body = await res.json();
      return done({ status: res.status, body: body });
    } catch (error) {
      return done(false);
    }
  }

  async handleSignin(data, done) {
    const res = await fetch("http://localhost:3000/signin", {
      method: "POST",
      mode: "cors",
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    switch (res.status) {
      case 404:
        return done({ status: res.status });
    }

    console.log(res.body);
  }

  containerFunctions = {
    handleSignup: this.handleSignup.bind(this),
    handleSignin: this.handleSignin.bind(this),
  };

  containerProps = {
    ...this.state,
    ...this.containerFunctions,
  };

  render() {
    return <SignupComponent {...this.containerProps} />;
  }
}

export default withRouter(Signup);
