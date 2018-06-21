import React, { Component } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthtoken from "./utils/setauthtoken";
import { setCurrentUser, logout } from "./actions/authaction";
import { clearcurrentprofile } from "./actions/profileaction";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./components/dashboard/dashboard";
import PrivateRoute from "./components/common/privateroute";
if (localStorage.jwttoken) {
  setAuthtoken(localStorage.jwttoken);
  const user = jwt_decode(localStorage.jwttoken);
  store.dispatch(setCurrentUser(user));
  //check for expired token
  const currenttime = Date.now() / 1000;
  if (user.exp < currenttime) {
    //logout
    store.dispatch(logout());
    store.dispatch(clearcurrentprofile());
    window.location.href = "/login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <div className="container">
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Switch>
                {" "}
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
