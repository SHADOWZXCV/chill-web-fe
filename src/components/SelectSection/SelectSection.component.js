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

  selectSection(key) {
    this.setState({ selectedKey: key });
  }

  renderSelectHeadSections() {
    const { sections } = this.props;

    return sections.map((section, indx) =>
      this.renderSelectHeadSection(section.name, indx, sections.length)
    );
  }

  renderSelectHeadSection(name, key, sectionsLength) {
    const { separator } = this.props;
    const { selectedKey } = this.state;

    // usage of Fragment to be able to add a key without adding a div or any element!
    return (
      <Fragment key={key}>
        <div
          className="head-select-group"
          key={key}
          onClick={() => this.selectSection(key)}
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

  renderSelectBodySections() {
    const { sections } = this.props;

    return sections.map((section, indx) =>
      this.renderSelectBodySection(section, indx)
    );
  }

  renderSelectBodySection(section, key) {
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
        <div id="head-select">{this.renderSelectHeadSections()}</div>
        <div id="body-select">{this.renderSelectBodySections()}</div>
      </div>
    );
  }
}

export default SelectSection;
