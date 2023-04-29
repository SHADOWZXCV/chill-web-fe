import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import Loading from "Components/Loading/Loading.component";
import Input from "Components/Input";

import "./SigninForm.style.scss";

export class SigninForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    formState: PropTypes.any,
    errors: PropTypes.object,
    getValues: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    noConnection: PropTypes.bool.isRequired,
  };

  render() {
    const {
      handleSubmit,
      register,
      formState: { errors },
      onSubmit,
      getValues,
      isLoading,
      noConnection,
      setError,
    } = this.props;

    return (
      <form
        id="signin-form"
        onSubmit={handleSubmit((data) => onSubmit(data, setError))}
      >
        <Loading isLoading={isLoading} />
        <Input
          type="text"
          name="username"
          id="username"
          placeholder="Enter username"
          rules={{
            maxLength: 29,
            minLength: 7,
            pattern: /^[A-Za-z][A-Za-z0-9_]{6,28}$/,
          }}
          register={register}
          getValues={getValues}
          errors={errors}
          required={true}
        />
        <Input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          rules={{
            maxLength: 20,
            minLength: 8,
            pattern:
              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*._-]).{8,}$/,
          }}
          specialIcon={{
            IconOn: HiOutlineEye,
            IconOff: HiOutlineEyeOff,
            size: 20,
          }}
          specialTypeWithIcon="text"
          register={register}
          getValues={getValues}
          errors={errors}
          required={true}
        />
        <input
          type="submit"
          className={noConnection ? "Submit-Signup-err" : "Submit-Signup"}
          value={noConnection ? "Can't connect, try again!" : "Signin"}
        />
      </form>
    );
  }
}

export default SigninForm;
