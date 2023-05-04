import React, { PureComponent } from "react";
import EnterAccountComponent from "./EnterAccount.component";

class EnterAccount extends PureComponent {
  async handleSign(type, data, done) {
    try {
      console.log(`http://localhost:3000/${type}`);
      const res = await fetch(`http://localhost:3000/${type}`, {
        method: "POST",
        mode: "cors",
        withCredentials: true,
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const body = await res.json();

      return done({ status: res.status, body });
    } catch (error) {
      return done(null, error);
    }
  }

  containerFunctions = {
    handleSign: this.handleSign.bind(this),
  };

  containerProps = {
    ...this.state,
    ...this.containerFunctions,
  };

  render() {
    return <EnterAccountComponent {...this.props} {...this.containerProps} />;
  }
}

export default EnterAccount;
