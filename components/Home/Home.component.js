import React, { PureComponent } from "react";

import "./Home.style.scss";
import pfp from "../../static/Home/pfp.png";
import mywork from "../../static/Home/mywork.jpg";

export default class HomeComponent extends PureComponent {
  renderNav() {
    return (
      <div className="Nav">
        <div className="Nav-Circle"></div>
        <h3 className="Nav-Greeting">Morning, Alex! 🌞</h3>
      </div>
    );
  }

  renderDashboard() {
    return (
      <>
        <div className="Dashboard">
          <img src={pfp} className="Dashboard-ProfilePic" />
          <div>
            <div className="Dashboard-Indicator Dashboard-Indicator-1"></div>
            <div className="Dashboard-Indicator Dashboard-Indicator-2"></div>
            <div className="Dashboard-Indicator Dashboard-Indicator-3"></div>
          </div>
        </div>
      </>
    );
  }

  renderContent() {
    return (
      <div className="Content">
        <h1 className="Content-VerticalWord">Dashboard</h1>
        {this.renderWorkTable()}
        {this.renderStudyingTable()}
      </div>
    );
  }

  renderWorkTable() {
    return (
      <div className="Table WorkTable">
        <h5 className="Table-Head">work summary</h5>
        <div className="Table-Body">
          <div className="WorkTable-Header">
            <div className="Horizontal-sb">
              <div className="Vertical">
                <p className="WorkTable-Header-Name">mycompany</p>
                <p className="WorkTable-Header-Date">Sep Q3, 2022</p>
              </div>
              <img src={mywork} className="WorkTable-Header-Pic" />
            </div>
          </div>
          <p className="Table-Memo">Recent activities</p>
          <div className="Table-Row">
            <div className="WorkTable-Row-Pic3" />
            <div className="Table-Row-Details">
              <p>
                <span>Kevin de bruyne</span> has approved your pull request!
              </p>
              <p>
                19th Sep, 2022 - 11:30 AM GMT+3 <span>#github-enigma</span>
              </p>
            </div>
          </div>
          <div className="Table-Row">
            <div className="WorkTable-Row-Pic1" />
            <div className="Table-Row-Details">
              <p>
                <span>Chantelle Torres: </span>please send latest updates to
                client :)
              </p>
              <p>
                18th Sep, 2022 - 10:30 PM GMT+3 <span>#Slack-private</span>
              </p>
            </div>
          </div>
          <div className="Table-Row">
            <div className="WorkTable-Row-Pic2" />
            <div className="Table-Row-Details">
              <p>
                <span>Thomas Mitchell</span> mentioned you in the following
                ticket: XSL-934
              </p>
              <p>
                19th Sep, 2022 - 09:02 AM GMT+3 <span>#Jira</span>
              </p>
            </div>
          </div>
          <div className="Table-Row">
            <div className="WorkTable-Row-Pic3" />
            <div className="Table-Row-Details">
              <p>
                <span>Kevin de bruyne</span> {"<sent an image>"}
              </p>
              <p>
                18th Sep, 2022 - 02:04 PM GMT+3<span>#slack-mc-channel</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderStudyingTable() {
    return (
      <div className="Table StudyTable">
        <h5 className="Table-Head">studies</h5>
        <div className="Table-Body">
          <p className="Table-Memo StudyTable-Memo">Current assignments</p>
          <div className="StudyTable-Section">
            <div className="Table-Row">
              <div className="StudyTable-Row-Unknown">?</div>
              <div className="Table-Row-Details">
                <p>PHYn002 - Assignment #6</p>
                <p>Due in: 5 Days, 2 hours & 54 minutes</p>
              </div>
            </div>
            <div className="Table-Row">
              <div className="StudyTable-Row-Unknown">?</div>
              <div className="Table-Row-Details">
                <p>MTHn002 - Assignment #2</p>
                <p>Due in: 1 hour, 12 minutes - you better hurry!</p>
              </div>
            </div>
            <div className="Table-Row">
              <div className="StudyTable-Row-Marked">✔</div>
              <div className="Table-Row-Details">
                <p>ECONOMICS ASSIGNMENT #4</p>
                <p>All resolved!</p>
              </div>
            </div>
            <div className="StudyTable-SpecialRow-SeeMore">
              <span>{">>"}</span>
              <p>See more</p>
            </div>
          </div>
          <p className="Table-Memo StudyTable-Memo">recent files</p>
          <div className="StudyTable-SpecialRow-SeeMore">
            <span>{">>"}</span>
            <p>See more</p>
          </div>
        </div>
      </div>
    );
  }

  renderComments() {
    return (
      <div className="">
        <p>
          Combining multiple methods, multiple tools, & multiple APIs, this app
          will be your right hand to achieve success! 💪
        </p>
        <br />
        <hr />
        <br />
        <ul>
          <li>Current version: 0.0.1 alpha</li>
          <br />
          <li>Current APIs count: 5</li>
        </ul>
        <br />
        <hr />
      </div>
    );
  }

  renderButtons() {
    return (
      <div className="Home-content-btns">
        <a href="#" id="try-out-btn">
          TRY IT OUT
        </a>
        <a href="#" id="features-btn">
          FEATURES
        </a>
      </div>
    );
  }
  render() {
    return (
      <div className="Home Home-Main">
        <div className="Home Home-content">
          <h1>Chill,</h1>
          <h2>
            Meet your futuristic life manager,{" "}
            <span id="bold-span">all in one!</span>
          </h2>
          {this.renderComments()}
          {this.renderButtons()}
          <p>{"Made with <3 , by a time manager, for time managers!"}</p>
        </div>
        <div className="Home Home-SideImage">
          <div className="Home-SideImage-Blur"></div>
          {this.renderNav()}
          {this.renderDashboard()}
          {this.renderContent()}
        </div>
      </div>
    );
  }
}
