import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Post from "./post";
class Profile extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentWillMount() {
    axios
      .get("http://localhost:3001/api/posts")
      .then(res => {
        this.setState({ posts: res.data });
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }
  liker = user => {
    console.log(user);
  };
  render() {
    let button;

    if (this.state.posts) {
      button = this.state.posts.map(post => {
        return <Post data={post} key={post._id} />;
      });
    } else {
      button = "loading";
    }
    return (
      <div>
        <h1>Profile</h1>
        {button}
      </div>
    );
  }
}

export default Profile;
