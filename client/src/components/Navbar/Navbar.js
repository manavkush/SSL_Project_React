import React from "react";
import MenuItems from "./MenuItems/MenuItems";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../HomeDetails/logog.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import Login from "../GoogleButton/Login";
import Logout from "../GoogleButton/Logout";

class NavBar extends React.Component {
  state = {
    show: false,
    expanded: false,
    email: "",
    tokenId: "",
    isSigned: false,
    isAdmin: false,
    name: "",
  };

  refreshToken = (oldres) => {
    oldres.reloadAuthResponse().then((res) => {
      this.setState({ tokenId: res.id_token });
    });
  };

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  // Handle Functions
  signInOnSuccess = (res) => {
    console.log("[Login Success]", res);
    this.setState({
      isSigned: true,
      tokenId: res.tokenId,
      name: res.profileObj.name,
      email: res.profileObj.email,
    });
    this.isAdmin();
  };

  signInOnFailure = (err) => {
    console.log("[LogIn Failure]", err);
  };

  signOutOnFailure = (err) => {
    console.log("[LogOut Failure]", err);
  };

  signOutOnSuccess = (res) => {
    console.log("[Logout Success]", res);
    this.setState({
      isSigned: false,
      tokenId: "",
      authRes: "",
      email: "",
      isAdmin: false,
      isVoter: false,
      name: "",
    });
    // clearInterval(this.state.refresh);
  };

  isAdmin() {
    if (
      this.state.email === "190010029@iitdh.ac.in" ||
      this.state.email === "190010023@iitdh.ac.in" ||
      this.state.email === "190010034@iitdh.ac.in"
    ) {
      this.setState({ isAdmin: true });
    }
  }

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
            {this.state.isSigned ? (
              <NavLink to="/profile" className="NavLink nav-link">
                Profile
              </NavLink>
            ) : null}
            <NavLink to="/printmg" className="NavLink nav-link">
              Printing
            </NavLink>
            <NavLink to="/team" className="NavLink nav-link">
              Team
            </NavLink>
            <Nav.Link>
              {this.state.isSigned ? (
                <Logout
                  signOutOnSuccess={this.signOutOnSuccess}
                  signInOnFailure={this.signOutOnFailure}
                />
              ) : (
                <Login
                  signInOnSuccess={this.signInOnSuccess}
                  signInOnFailure={this.signInOnFailure}
                />
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
