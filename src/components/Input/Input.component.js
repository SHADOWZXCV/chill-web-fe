import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import "./Input.style.scss";

export class InputComponent extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    register: PropTypes.func.isRequired,
    errors: PropTypes.object,
    getValues: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    specialTypeWithIcon: PropTypes.string,
    specialIcon: PropTypes.shape({
      IconOff: PropTypes.elementType,
      IconOn: PropTypes.elementType,
      size: PropTypes.number,
    }),
    rules: PropTypes.object,
    placeholder: PropTypes.string.isRequired,
    required: PropTypes.bool,
  };

  state = {
    stateOfIcon: false,
    focused: false,
  };

  customErrorMessage = {
    password: {
      pattern: `Password should have the following:
        At least 1 lowercase character , at least 1
        uppercase character, at least 1 number & 1 special
        character`,
      minLength: `Password should have minLength
        of at least 8 characters!`,
      maxLength: `Password
        should be at 20 characters max!`,
    },
    username: {
      pattern: `Usernames should start with a character and can only contain numbers, characters and underscores!`,
      minLength: `username should have minLength of at least 7 characters!`,
      maxLength: `Username should be at 29 characters max!`,
    },
  };

  showErr() {
    const { name, errors } = this.props;
    const { focused } = this.state;

    if (!focused || !errors[name]) return;
    const {
      [name]: { type, message },
    } = errors;
    const errorText = message || this.customErrorMessage[name][type];

    if (!errorText) return;

    return (
      <p className="error" id={`${name}-err`}>
        {errorText}
      </p>
    );
  }

  renderSpecialIcon() {
    const {
      id,
      getValues,
      specialIcon,
      specialIcon: { IconOff, IconOn, size } = {},
      name,
    } = this.props;
    const { stateOfIcon } = this.state;

    if (!specialIcon) return null;

    return (
      <span
        id={`${id}-icon`}
        onClick={() => {
          this.setState({
            stateOfIcon: !stateOfIcon,
          });
        }}
      >
        {stateOfIcon && getValues()[name] ? (
          <IconOff size={size} />
        ) : !stateOfIcon && getValues()[name] ? (
          <IconOn size={size} />
        ) : null}
      </span>
    );
  }

  render() {
    const {
      register,
      errors,
      type,
      name,
      id,
      rules = {},
      placeholder,
      required,
      specialTypeWithIcon,
    } = this.props;
    const { stateOfIcon } = this.state;

    return (
      <div className="input-group">
        <input
          type={stateOfIcon ? specialTypeWithIcon : type}
          className={errors[name] ? "Input-Signup-error" : "Input-Signup"}
          name={name}
          id={id}
          placeholder="  "
          {...register(name, rules)}
          required={required}
          onFocus={() => this.setState({ focused: true })}
          onBlur={() => this.setState({ focused: false })}
        />
        <span className="floating-ph">{placeholder}</span>
        {this.renderSpecialIcon()}
        {this.showErr()}
      </div>
    );
  }
}

export default InputComponent;
