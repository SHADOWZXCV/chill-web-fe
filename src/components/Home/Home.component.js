import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import "./Home.style.scss";
import chillGuy from "../../static/home/sun.png";
import { withRouter } from "react-router-dom";

export class HomeComponent extends PureComponent {
  static propTypes = {
    history: PropTypes.object.isRequired,
  };

  renderNav() {
    return (
      <div className="Nav">
        <h1>Chill</h1>
        {this.renderButtons()}
      </div>
    );
  }

  renderComments() {
    return (
      <div className="Content">
        <p>
          Combining multiple methods, multiple tools, & multiple APIs, this app
          will be your right hand to achieve success! 💪
        </p>
        <br />
        <hr />
        <ul className="Home-content-comments-ul">
          <li>Current version: 0.0.1 alpha</li>
          <br />
          <li>Current APIs count: 5</li>
        </ul>
        <hr />
      </div>
    );
  }

  renderButtons() {
    const { history } = this.props;

    return (
      <div className="Home-content-btns">
        <a onClick={() => history.push("/enter")} id="try-out-btn">
          TRY IT OUT
        </a>
        <a href="#" id="features-btn">
          FEATURES
        </a>
      </div>
    );
  }

  renderCoolImageWithLoveMessage() {
    return (
      <>
        <div id="chill-gang">
          <img id="chillGuy" src={chillGuy} />
          <p id="chill-message">Come and chill with me..</p>
        </div>
        <p className="love-message">
          {"Made with ❤ , by a time manager, for time managers!"}
        </p>
      </>
    );
  }

  render() {
    return (
      <div className="Home Home-Main">
        <div className="Home Home-Nav">
          {isMobile ? this.renderNav() : null}
        </div>
        <div className="Home Home-content">
          {isMobile ? null : <h1>Chill,</h1>}
          <h2>
            Meet your futuristic life manager,{" "}
            <span id="bold-span">all in one!</span>
          </h2>
          {this.renderComments()}
          {isMobile ? null : this.renderButtons()}
          {isMobile ? null : (
            <p>{"Made with ❤ , by a time manager, for time managers!"}</p>
          )}
        </div>
        {isMobile ? (
          this.renderCoolImageWithLoveMessage()
        ) : (
          <div className="Home Home-SideImage"></div>
        )}
      </div>
    );
  }
}

export default withRouter(HomeComponent);
