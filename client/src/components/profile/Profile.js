import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/spinner";
import { getProfileByHandle } from "../../actions/profileaction";
class Profile extends Component {
  count = 0;
  constructor(props) {
    super(props);
    this.state = {
      profile: this.props.profile
    };
    // props.getProfileByHandle(props.match.params.handle);
  }
  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileByHandle(this.props.match.params.handle);
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profilecontent;
    if (profile === null || loading || !profile.user.name) {
      profilecontent = <Spinner />;
    } else {
      profilecontent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
                Back To Profiles
              </Link>
            </div>
            <div className="col-md-6" />
          </div>
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          <ProfileCreds
            education={profile.education}
            experience={profile.experience}
          />
        </div>
      );
    }
    return (
      <div>
        <div className="profile">
          <div className="container">
            <div className="row">
              <div className="col-md-12">{profilecontent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getProfileByHandle }
)(Profile);
