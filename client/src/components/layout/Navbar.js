import React, { Component } from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authaction";
import { clearcurrentprofile } from "../../actions/profileaction";
class Navbar extends Component {
  onlogout = e => {
    e.preventDefault();
    this.props.clearcurrentprofile();
    this.props.logout();
  };
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const authlinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            {" "}
            Feed
          </Link>
        </li>{" "}
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard">
            Dashboard
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            onClick={this.onlogout.bind(this)}
            to="/login"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: "25px", marginRight: "5px" }}
              title="Profile pic connected to this email is shown"
            />
            Logout
          </Link>
        </li>
      </ul>
    );
    const guestlinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            DevConnector
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/profiles">
                  {" "}
                  Developers
                </Link>
              </li>
            </ul>
            {isAuthenticated ? authlinks : guestlinks}
          </div>
        </div>
      </nav>
    );
  }
}
Navbar.propTypes = {
  logout: propTypes.func.isRequired
  // auth: propTypes.object.isRequired
};
const mapStateToProps = state => {
  return { auth: state.auth };
};
export default connect(
  mapStateToProps,
  { clearcurrentprofile, logout }
)(Navbar);
