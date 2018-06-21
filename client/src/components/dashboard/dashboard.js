import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getcurrentprofile } from "../../actions/profileaction";
import "./dashboard.css";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getcurrentprofile();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardcontent;
    if (profile === null || loading) {
      dashboardcontent = (
        <div className="wrapper">
          <div className="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
    } else {
      //check if profile exists
      console.log(user.name);
      if (Object.keys(profile).length > 0) {
        //profile exists
        dashboardcontent = <h4>profile</h4>;
      } else {
        //doesnt exist
        dashboardcontent = <h4>profile</h4>;
      }
      dashboardcontent = (
        <div>
          <p className="lead text-muted">welcome {user.name}</p>
          <h4>You have not created your profile</h4>
          <Link to="/create-profile" className="btn btn-lg btn-info">
            Create Profile
          </Link>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">{dashboardcontent}</div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { profile: state.profile, auth: state.auth };
};
export default connect(
  mapStateToProps,
  { getcurrentprofile }
)(Dashboard);
