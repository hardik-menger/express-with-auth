import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletepost, addlike } from "../../actions/postaction";

class PostItem extends Component {
  ondeleteclick(id) {
    this.props.deletepost(id);
  }
  togglelike(id, likes) {
    this.props.addlike(id);
  }
  render() {
    const { post, auth, showActions } = this.props;
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
                <button
                  type="button"
                  className="btn btn-light mr-1 btn-primarys"
                  onClick={this.togglelike.bind(this, post._id, post.likes)}
                >
                  <i className="fas fa-thumbs-up" />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>

                {post.user._id === auth.user.id ||
                post.user === auth.user.id ? (
                  <button
                    type="button"
                    onClick={this.ondeleteclick.bind(this, post._id)}
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
PostItem.defaultProps = {
  showActions: true
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(
  mapStateToProps,
  { deletepost, addlike }
)(PostItem);
