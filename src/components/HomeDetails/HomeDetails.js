import React from "react";
import "./HomeDetails.css";
import { ReactComponent as YourSvg } from "./bookdesk.svg";
import Fade from "react-reveal/Fade";
import Typist from "react-typist";
// import { ReactComponent as YourSvg } from './your-svg.svg';

class HomeDetails extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let style = {
      backgroundPosition: "bottom",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: "100%",
      marginTop: "5%",
      marginRight: "-2vw",
    };
    return (
      <div className="home-details">
        <div className="show-mobile"></div>

        <div className="hide-mobile">
          <div className="imgshow">
            <YourSvg style={style} />
            <div className="info-text">
              <a><Typist avgTypingDelay={150}>Hello There!</Typist></a>
              
              <Fade delay={2200}>
                Welcome to your one stop location for accessing library
                resources at IIT Dharwad.
              </Fade>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

export default HomeDetails;
