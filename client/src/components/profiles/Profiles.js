import React, { Component } from "react";
import { connect } from "react-redux";
import { getprofiles } from "../../actions/profileaction";
import Spinner from "../common/spinner";
import ProfileItem from "./ProfileItem";
class Profiles extends Component {
  componentWillMount() {
    this.props.getprofiles();
  }

  render() {
    let profiles;
    let { loading } = this.props.profile;
    let profileItems = this.props.profile.profiles;
    if (profileItems === null || loading) {
      profiles = <Spinner />;
    } else {
      if (profileItems.length > 0) {
        profiles = profileItems.map(profile => (
          <ProfileItem profile={profile} key={profile._id} />
        ));
      } else {
        profiles = <h4>No profiles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <p className="lead text-center">
                Browse and connect with developers
              </p>
              {profiles}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    profile: state.profile
  };
};
export default connect(
  mapStateToProps,
  { getprofiles }
)(Profiles);
