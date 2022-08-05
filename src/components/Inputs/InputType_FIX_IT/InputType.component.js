//TODO: FIX THIS!
// ISSUE: can't control inputtype
import React, { useState } from "react";
import "./InputType.style.scss";

export const InputType = (props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const passwordSpecials = () => {
    const { name } = props;
    if (name !== "password") return null;
    return (
      <span
        id="showPassword"
        onClick={() => {
          setPasswordShown({
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
    );
  };
  const showErr = () => {
    const { error, errors } = props;
    console.log(error);
    if (!error) return;
    const errorMessage = errors[error["type"]];

    return (
      <p className="error" id="password-err">
        {errorMessage}
      </p>
    );
  };

  const { register, rules, name, error, placeholder, validate } = props;
  return (
    <div className="input-group">
      <input
        type={name == "password" ? name : "text"}
        className={error ? "Input-error" : "Input"}
        name={name}
        id={name}
        placeholder="  "
        {...register(name, rules)}
        required
      />
      <span className="floating-ph">{placeholder}</span>
      {error && showErr()}
      {/* {passwordSpecials()} */}
    </div>
  );
};

export default InputType;
