import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { isMobile } from "react-device-detect";

import "./Home.style.scss";
import chillGuy from "Static/home/sun.png";
import Themable from "Components/Themable";

export class HomeComponent extends PureComponent {
  static propTypes = {
    navigate: PropTypes.func,
  };

  componentDidMount() {
    // first time item is responsible for determining what to show for users
    // that are here for the first time, for example: signup page instead of signin page.
    const isFirstTime = localStorage.getItem("firstTime");
    if (!isFirstTime) localStorage.setItem("firstTime", true);
  }

  renderNav() {
    return (
      <div className="Nav">
        <h1>Chill</h1>
        {this.renderButtons()}
      </div>
    );
  }

  renderDescriptionAndReviews() {
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
    const { navigate } = this.props;

    return (
      <div className="Home-content-btns">
        <a onClick={() => navigate("/enter")} id="try-out-btn">
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
      <div id="chill-gang">
        <img id="chillGuy" src={chillGuy} />
        <p id="chill-message">Come and chill with me..</p>
        <p className="love-message">
          {"Made with ❤ , by a software developer"}
        </p>
      </div>
    );
  }

  /**
   * render function
   * @returns Home page component view.
   * Difference between isMobile variable, the "_isMobileOrTablet" modifier & the mixin: "mobile":
   * - isMobile distinguishes between Desktop & any other mobile-form device ( phone, tablet, etc )
   * - "_isMobileOrTablet" is the same, but I use it to tunnel the "isMobile" variable to Sass.
   * - the "mobile" mixin is made for sizes smaller than 810px in width,
   *   use it to distinguish between mobiles and tablets.
   */
  render() {
    return (
      <Themable>
        <div className={`Home Home-Main${isMobile ? "_isMobileOrTablet" : ""}`}>
          {isMobile ? (
            <div className="Home Home-Nav">{this.renderNav()}</div>
          ) : null}
          <div className="Home Home-content">
            {!isMobile ? <h1>Chill,</h1> : null}
            <h2>
              Meet your futuristic life manager,{" "}
              <span id="bold-span">all in one!</span>
            </h2>
            {this.renderDescriptionAndReviews()}
            {!isMobile ? (
              <>
                {this.renderButtons()}
                <p>
                  {
                    "Made with ❤ , by a software developer ( Psst.. press F10 for a surprise :) )"
                  }
                </p>
              </>
            ) : null}
          </div>
          {isMobile ? (
            this.renderCoolImageWithLoveMessage()
          ) : (
            // Using a div instead of img to handle hovering action and image changing solely in sass.
            <div className="Home Home-SideImage"></div>
          )}
        </div>
      </Themable>
    );
  }
}

export default HomeComponent;
