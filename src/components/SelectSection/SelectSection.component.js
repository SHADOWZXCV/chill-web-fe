import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import "./SelectSection.style.scss";

class SelectSection extends PureComponent {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    separator: PropTypes.string,
    selected: PropTypes.number,
  };

  state = {
    selectedKey: 0,
  };

  // A simple trick to show user sign up page if it is
  // his first time here, otherwise it goes to sign in
  // works only for sign in and up selection sections
  componentDidMount() {
    const { selected } = this.props;
    const isFirstTime = localStorage.getItem("firstTime");
    if (isFirstTime === "true") return localStorage.setItem("firstTime", false);
    if (!selected) return;
    this.selectItem(selected);
  }

  selectItem(key) {
    this.setState({ selectedKey: key });
  }

  renderSelectItems() {
    const { sections } = this.props;

    return sections.map((section, indx) =>
      this.renderSelectItem(section.name, indx, sections.length)
    );
  }

  renderSelectItem(name, key, sectionsLength) {
    const { separator } = this.props;
    const { selectedKey } = this.state;

    // usage of Fragment to be able to add a key without adding a div or any element!
    return (
      <Fragment key={key}>
        <div
          className="head-select-group"
          key={key}
          onClick={() => this.selectItem(key)}
        >
          <h1 className="head-select-item">{name}</h1>
          <div
            className={
              selectedKey === key ? "select-indicator" : "select-indicator-off"
            }
          ></div>
        </div>
        {separator && key !== sectionsLength - 1 && (
          <p className="head-select-separator">{separator}</p>
        )}
      </Fragment>
    );
  }

  renderSelectBodyItems() {
    const { sections } = this.props;

    return sections.map((section, indx) =>
      this.renderSelectBodyItem(section, indx)
    );
  }

  renderSelectBodyItem(section, key) {
    const { Component, props } = section;
    const { selectedKey } = this.state;

    return (
      <Fragment key={key}>
        {selectedKey === key ? (
          <div className="body-select-group" key={key}>
            <Component {...props} />
          </div>
        ) : null}
      </Fragment>
    );
  }

  render() {
    return (
      <div id="select">
        <div id="head-select">{this.renderSelectItems()}</div>
        <div id="body-select">{this.renderSelectBodyItems()}</div>
      </div>
    );
  }
}

export default SelectSection;
