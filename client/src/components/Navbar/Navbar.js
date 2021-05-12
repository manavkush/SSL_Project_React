import React from "react";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../HomeDetails/logog.png";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../GoogleButton/Login";
import Logout from "../GoogleButton/Logout";
import Swal from "sweetalert2";

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
              <Nav.Link
                className="NavLink nav-link"
                onClick={() =>
                  Swal.fire({
                    title: "Look Up Profile Details?",
                    showCancelButton: true,
                    confirmButtonText: "Look Up",
                    showLoaderOnConfirm: true,
                    preConfirm: async () => {
                      var requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: this.state.email }),
                      };
                      return fetch(`/getProfile`, requestOptions)
                        .then((response) => {
                          console.log(response);
                          if (!response.ok) {
                            throw new Error(response.statusText);
                          }
                          return response.json();
                        })
                        .catch((error) => {
                          Swal.showValidationMessage(
                            `Request failed: ${error}`
                          );
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    console.log(result);
                    if (result.isConfirmed) {
                      if (result.value.Status) {
                        Swal.fire({
                          icon: "info",
                          title: "Hello!",
                          html:
                            `<div style=text-align:start>` +
                            `<b>User name: </b> ${result.value.student_name} <br>` +
                            `<b>Roll number: </b> ${result.value.student_rollno} <br>` +
                            `<b>Branch :  </b> ${result.value.student_branch} <br>` +
                            `<b>Due amount (in Rs.): ${result.value.student_due} <br>` +
                            `</div>`,
                        });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: `${result.value.StatusMessage}`,
                        });
                      }
                    }
                  })
                }
              >
                Profile
              </Nav.Link>
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
