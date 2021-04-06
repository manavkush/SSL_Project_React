import React from "react";
import "./HomeDetails.css";
import { ReactComponent as YourSvg } from "./bookdesk.svg";
import libImg from "./lib.svg";
import printImg from "./print.svg";
import Fade from "react-reveal/Fade";
import Typist from "react-typist";
import Button from "react-bootstrap/Button";
// import { ReactComponent as YourSvg } from './your-svg.svg';

class HomeDetails extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    let style = {
      backgroundPosition: "bottom",
      "align-content": "start",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      width: "100%",
      display: "block",
    //   marginTop: "-9vh",
      marginRight: "0vw",
    };
    return (
      <div className="home-details">
        <div className="show-mobile">

        </div>

        <div className="hide-mobile">
          <div className="imgshow">
            <YourSvg style={style} />
            <div className="info-text">
              <a><Typist avgTypingDelay={130}>Hello There!</Typist></a>
            <br/>
              <Fade delay={2200}>
                Welcome to your one stop location for accessing library
                resources at IIT Dharwad.
              </Fade>
            </div>
          </div>
          <div className="info-card">
            <div className="info-card-child">
              <img src={libImg} alt="Library" className="homepgImg filt" />
              <Fade top><h2>Library Resources</h2></Fade>
              <ul>
                <Fade left><li>Check for availability of Books in the Database.</li></Fade>
                <Fade left><li>Plan the visits to library accordingly.</li></Fade>
                <Fade left><li>Admin Portal for issuing, returning books.</li></Fade>
                <Fade left><li>Admin Portal for Adding, Removing stock books.</li></Fade>
              </ul>
              <Button className="homeBtn" onClick={()=> this.props.history.push('/library')}>
                Take Me There
              </Button>
            </div>
            <div className="info-card-child">
              <img src={printImg} alt="Printer" className="homepgImg filt" />
              <Fade top><h2>Printing Facilities</h2></Fade>
              <ul>
                <Fade left><li>Upload the documents to be printed on the portal itself.</li></Fade>
                <Fade left><li>Specify any special instructions for printing if required.</li></Fade>
                <Fade left><li>Collect printed documents when email notification is recieved.</li></Fade>
                <Fade left><li>Pay on a monthly basis</li></Fade>
              </ul>
              <Button className="homeBtn" onClick={()=> this.props.history.push('/printmg')}>
                Take Me There
              </Button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default HomeDetails;
