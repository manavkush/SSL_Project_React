import "./App.css";
import React from "react";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import HomeDetails from "./components/HomeDetails/HomeDetails";
import Admin from "./components/Admin/Admin"
import LibStud from "./components/LibStud/LibStud"
import Teampage from "./components/Teampage/Teampage"

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter onUpdate={() => (window.scrollTo(0,0))}>
          <Navbar />
          <Switch>
            
            <Route 
              path='/'
              render={
                withRouter((props) => (
                  <HomeDetails
                    {...props}
                  />
                ))
              }
            />

            
            <Route
              path='/admin'
              render={
                (props) => (
                  <Admin
                    {...props}
                  />
                )
              }
            />

            
            <Route
              path='/library'
              exact component={
                withRouter((props)=> {
                  <LibStud
                    {...props}
                  />
                })
              }
            />
            
            
            <Route 
              path='/team'
              render={
                (props)=> {
                  <Teampage 
                    {...props}
                  />
                }
              }
            />
          </Switch>
        </BrowserRouter>
      </div>
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
