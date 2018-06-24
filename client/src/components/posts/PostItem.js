import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { deletepost, addlike } from "../../actions/postaction";
class PostItem extends Component {
  ondeleteclick(id) {
    console.log(id);
    this.props.deletepost(id);
  }
  togglelike(id) {
    this.props.addlike(id);
  }
  render() {
    let like = false;
    const { post, auth } = this.props;
    const onclicktoggle = like => {
      console.log(like);
      like = !like;
      return like;
    };
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            <span>
              <button
                type="button"
                className="btn btn-light mr-1"
                onClick={this.togglelike.bind(this, post._id)}
              >
                <i className="fas fa-thumbs-up" />
                <span className="badge badge-light">{post.likes.length}</span>
              </button>
              <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                Comments
              </Link>

              {post.user._id === auth.user.id ? (
                <button
                  type="button"
                  onClick={this.ondeleteclick.bind(this, post._id)}
                  className="btn btn-danger mr-1"
                >
                  <i className="fas fa-times" />
                </button>
              ) : null}
            </span>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { deletepost, addlike }
)(PostItem);
