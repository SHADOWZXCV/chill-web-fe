import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./SelectSection.style.scss";

class SelectSection extends PureComponent {
  static propTypes = {
    sections: PropTypes.array.isRequired,
    separator: PropTypes.string,
  };

  state = {
    selectedKey: 0,
  };

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

    return (
      <>
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
        {separator && sectionsLength !== key + 1 && (
          <p className="head-select-separator">{separator}</p>
        )}
      </>
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
      <>
        {selectedKey === key ? (
          <div className="body-select-group" key={key}>
            <Component {...props} />
          </div>
        ) : null}
      </>
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
