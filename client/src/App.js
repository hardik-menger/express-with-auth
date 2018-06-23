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
import CreateProfile from "./components/create-profile/createprofile";
import EditProfile from "./components/edit-profile/editprofile";
import AddExperience from "./components/add-credentials/AddExperience";
import AddEducation from "./components/add-credentials/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
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
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                {" "}
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
              </Switch>
              <Switch>
                {" "}
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                {" "}
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                {" "}
                <PrivateRoute
                  exact
                  path="/add-experience"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                {" "}
                <PrivateRoute
                  exact
                  path="/add-education"
                  component={AddEducation}
                />
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
