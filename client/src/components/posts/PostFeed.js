import React, { Component } from "react";
import PostItem from "./PostItem";
import Spinner from "../common/spinner";
class PostFeed extends Component {
  render() {
    const { posts } = this.props;
    if (posts) {
      return posts.map(post => <PostItem key={post._id} post={post} />);
    } else {
      return <Spinner />;
    }
  }
}
export default PostFeed;
