import React, { Component } from "react";
import Spinner from "../common/spinner";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import { getposts } from "../../actions/postaction";
import PostFeed from "./PostFeed";
class Posts extends Component {
  componentDidMount() {
    this.props.getposts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postcontent;
    if (posts === null || loading) {
      postcontent = <Spinner />;
    } else {
      postcontent = <PostFeed posts={posts} />;
    }
    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <PostForm />
              {postcontent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    post: state.post
  };
};
export default connect(
  mapStateToProps,
  { getposts }
)(Posts);
