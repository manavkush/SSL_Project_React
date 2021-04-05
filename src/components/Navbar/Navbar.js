import React from "react";
import MenuItems from "./MenuItems/MenuItems";
import { Button } from "../Button/Button";
import "./Navbar.css";
import Navbar from "react-bootstrap/Navbar";
import {Nav, NavDropdown} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logo from "../HomeDetails/logog.png";
import 'bootstrap/dist/css/bootstrap.min.css';

class NavBar extends React.Component {
  state = {
    show: false,
    expanded: false,
    email: "",
    tokenId: "",
    isSigned: "",
    isAdmin: "",
  };

  handleClick = () => {
    this.setState({
      expanded: !this.state.expanded,
    });
  };

  render() {
    let styles = {
      zIndex: 10,
    };
    return (
      <Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">
    <img src={logo} className="logohome" alt="Library Management" />
  </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Library</Nav.Link>
      <Nav.Link href="#link">Printer</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
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
