import React from "react";
import Dashboard from "./Components/HomePage/Dashboard";
import Login from "./features/Login";
import Register from "./features/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Profile from "./Components/Profile";

function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route exact path="/">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
