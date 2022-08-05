import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Loading from "Components/Loading/Loading.component";

import "./SignupForm.style.scss";

export class SignupForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    formState: PropTypes.any,
    errors: PropTypes.object,
    getValues: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    noConnection: PropTypes.bool.isRequired,
  };

  state = {
    passwordShown: false,
  };

  showErr(errType, errors) {
    switch (errType) {
      case "password": {
        if (!errors.password) return;
        const {
          password: { type },
        } = errors;

        return (
          <p className="error" id="password-err">
            {type === `pattern`
              ? `Password should have the following:
                At least 1 lowercase character , at least 1
                uppercase character, at least 1 number & 1 special
                character`
              : type === "minLength"
              ? `Password should have minLength
                of at least 8 characters!`
              : type === "maxLength"
              ? `Password
                should be at 20 characters max!`
              : null}
          </p>
        );
      }
      case "username": {
        if (!errors.username) return;
        const {
          username: { type },
        } = errors;

        return (
          <p className="error" id="username-err">
            {type === `pattern`
              ? `Usernames should start with a character and can only contain numbers, characters and underscores!`
              : type === "minLength"
              ? `username should have minLength
                of at least 7 characters!`
              : type === "maxLength"
              ? `Username
                should be at 29 characters max!`
              : null}
          </p>
        );
      }
      case "email": {
        if (!errors.email) return;
        const {
          email: { type, message },
        } = errors;

        return (
          <p className="error" id="email-err">
            {type === "exists" ? message : null}
          </p>
        );
      }
    }
  }

  render() {
    const {
      handleSubmit,
      register,
      formState: { errors },
      getValues,
      onSubmit,
      isLoading,
      noConnection,
    } = this.props;
    const { passwordShown } = this.state;

    return (
      <form id="signup-form" onSubmit={handleSubmit(onSubmit)}>
        <Loading isLoading={isLoading} />
        {/* <InputType
          name="password"
          message="Enter password"
          {...register("password", {
            maxLength: 29,
            minLength: 7,
            pattern: /^[A-Za-z][A-Za-z0-9_]{6,28}$/,
          })}
          error={errors["password"]}
          errors={{
            pattern: `Password should have the following:
            At least 1 lowercase character , at least 1
            uppercase character, at least 1 number & 1 special character`,
            minLength: `Password should have minLength
                    of at least 8 characters!`,
            maxLength: `Password should be at 20 characters max!`,
          }}
        /> */}
        <div className="input-group">
          <input
            type="text"
            className={errors.username ? "Input-Signup-error" : "Input-Signup"}
            name="username"
            id="username"
            placeholder="  "
            {...register("username", {
              maxLength: 29,
              minLength: 7,
              pattern: /^[A-Za-z][A-Za-z0-9_]{6,28}$/,
            })}
            required
          />
          <span className="floating-ph">Enter username</span>
          {this.showErr("username", errors)}
        </div>
        <div className="input-group">
          <input
            type="email"
            className={errors.email ? "Input-Signup-error" : "Input-Signup"}
            name="email"
            id="email"
            placeholder="  "
            {...register("email")}
            required
          />
          <span className="floating-ph">Enter Email</span>
        </div>
        {this.showErr("email", errors)}
        <div className="input-group">
          <input
            type={this.state.passwordShown ? "text" : "password"}
            id="password"
            className={errors.password ? "Input-Signup-error" : "Input-Signup"}
            name="password"
            placeholder="  "
            {...register("password", {
              maxLength: 20,
              minLength: 8,
              pattern:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*._-]).{8,}$/,
            })}
            required
          />
          <span className="floating-ph">Enter password</span>
          <span
            id="showPassword"
            onClick={() => {
              this.setState({
                passwordShown: !passwordShown,
              });
            }}
          >
            {passwordShown && getValues().password ? (
              <HiOutlineEyeOff size={20} />
            ) : !passwordShown && getValues().password ? (
              <HiOutlineEye size={20} />
            ) : null}
          </span>
          {this.showErr("password", errors)}
        </div>
        <input
          type="submit"
          className={noConnection ? "Submit-Signup-err" : "Submit-Signup"}
          value={noConnection ? "Can't connect, try again!" : "Signup"}
        />
      </form>
    );
  }
}

export default SignupForm;
