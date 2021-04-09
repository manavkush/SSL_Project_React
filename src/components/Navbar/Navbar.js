import React from "react";
import MenuItems from "./MenuItems/MenuItems";
import { Button } from "../Button/Button";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../HomeDetails/logog.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";

class NavBar extends React.Component {
  state = {
    show: false,
    expanded: false,
    email: "",
    tokenId: "",
    isSigned: false,
    isAdmin: false,
  };

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  // Handle Functions
  signInOnSuccess = (res) => {
    this.setState({
      isSigned: true,
      tokenId: res.tokenId,
      name: res.profileObj.name,
      email: res.profileObj.email,
    });
  };

  signInOnError = (err) => {
    console.log(err);
  };

  signOutOnError = (err) => {
    console.log(err);
  };

  signOutOnSuccess = () => {
    this.setState({
      isSigned: false,
      tokenId: "",
      authRes: "",
      email: "",
      isAdmin: false,
      isVoter: false,
    });
    clearInterval(this.state.refresh);
  };

  render() {
    let styles = {
      zIndex: 10,
    };

    // Admin Tab in Navbar
    let AdminTab = null;
    if (this.state.isAdmin && this.state.isSigned) {
      AdminTab = (
        <NavLink
          to="/admin"
          className="NavLink nav-link"
          style={styles}
          activeClassName="selected"
          onClick={() => this.setState({ expanded: false })}
        >
          <div className="secondary_Text">Admin</div>
        </NavLink>
      );
    }

    return (
      <Navbar expand="lg" className="NavBar">
        <Navbar.Brand href="/">
          <img src={logo} className="logohome" alt="Library Management" />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => {
            this.setState({
              expanded: !this.state.expanded,
            });
          }}
        />

        <Navbar.Collapse id="responsive-navbar-nav" className="nav-menu">
          <Nav className="navbar-collapse justify-content-end">
            {AdminTab}
            <NavLink to="/library" className="NavLink nav-link">
              Library
            </NavLink>
            <NavLink to="/profile" className="NavLink nav-link">
              Profile
            </NavLink>
            <NavLink to="/printmg" className="NavLink nav-link">
              Printing
            </NavLink>
            <NavLink to="/team" className="NavLink nav-link">
              Team
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        
      </Navbar>
      // <Navbar expanded={this.state.expanded} className="NavBar" expand="lg">
      //   <NavLink to="" style={styles}>
      //     <img src={logo} className="logohome" alt="Library Management" />
      //   </NavLink>

      //   <Navbar.Toggle
      //     onClick={() => {
      //       if (this.state.expanded === "expanded")
      //         this.setState({ expanded: false });
      //       else this.setState({ expanded: "expanded" });
      //     }}
      //     aria-controls="responsive-navbar-nav"
      //   />

      //   <Navbar.Collapse
      //     id="responsive-navbar-nav"
      //     className="NavBar navbar-toggle"
      //   >
      //     <Nav className="mr-auto">
      //       <Nav.Link href="#features">Features</Nav.Link>
      //       <Nav.Link href="#pricing">Pricing</Nav.Link>

      //     </Nav>
      //   </Navbar.Collapse>
      // </Navbar>
    );
  }
}

export default NavBar;
