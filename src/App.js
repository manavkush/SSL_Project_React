import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import HomeDetails from "./components/HomeDetails/HomeDetails";
import Admin from "./components/Admin/Admin";
import LibStud from "./components/LibStud/LibStud";
import Teampage from "./components/Teampage/Teampage";
import Footer from "./components/Footer/Footer";
import OnImagesLoaded from "react-on-images-loaded";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.props.showLoader();
    this.state = {
      showImages: false,
      isSigned: false,
      isAdmin: false,
      tokenId: "",
      emailid: "",
      currenttab: "/",
    };
  }

  render() {
    return (
      <OnImagesLoaded
        onLoaded={() => {
          // this.props.hideLoader();
          this.setState({ showImages: true });
        }}
        onTimeout={() => {
          this.setState({ showImages: true });
          // this.props.hideLoader();
        }}
        timeout={7000}
      >
        <div className="App">
          <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
            <Navbar />
            <Switch>
              <Route
                path="/"
                render={withRouter((props) => (
                  <HomeDetails
                    {...props}
                    hideLoader={this.props.hideLoader}
                    showLoader={this.props.showLoader}
                  />
                ))}
              />

              <Route
                path="/admin"
                render={(props) => (
                  <Admin
                    {...props}
                    hideLoader={this.props.hideLoader}
                    showLoader={this.props.showLoader}
                  />
                )}
              />

              <Route
                path="/library"
                exact
                component={withRouter((props) => {
                  <LibStud
                    {...props}
                    hideLoader={this.props.hideLoader}
                    showLoader={this.props.showLoader}
                  />;
                })}
              />

              <Route
                path="/team"
                render={(props) => {
                  <Teampage
                    {...props}
                    hideLoader={this.props.hideLoader}
                    showLoader={this.props.showLoader}
                  />;
                }}
              />
            </Switch>
          </BrowserRouter>
          <Footer />
        </div>
      </OnImagesLoaded>
    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
