import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getcurrentprofile, deleteaccount } from "../../actions/profileaction";
import Spinner from "../common/spinner";
import ProfileActions from "./profileactions";
import Experience from "./Experience";
import Education from "./Education";
class Dashboard extends Component {
  componentDidMount() {
    this.props.getcurrentprofile();
  }
  onDeleteClick(e) {
    this.props.deleteaccount();
  }
  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashboardcontent;
    if (profile === null || loading) {
      dashboardcontent = <Spinner />;
    } else {
      //check if profile exists
      if (Object.keys(profile).length > 0) {
        //profile exists
        dashboardcontent = (
          <div>
            <h4>
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </h4>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.onDeleteClick.bind(this)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        );
      } else {
        //doesnt exist
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
  { getcurrentprofile, deleteaccount }
)(Dashboard);
