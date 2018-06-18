import "./post.css";
import React, { Component } from "react";
import axios from "axios";
import Post from "./post";
class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  liker(postid) {
    console.log(postid);
    axios
      .post(`http://localhost:3001/api/posts/like/${postid}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err.response.data));
  }

  render() {
    // console.log(this.props.data);
    let commments = this.props.data.comments.map(comment => (
      <p key={comment._id}>{comment.text}</p>
    ));
    console.log(this.props.data.comments);
    return (
      <div
        style={{
          boxShadow: "0px 1px 5px rgba(0,0,0,0.1)",
          margin: "15px",
          padding: "15px"
        }}
      >
        <header>
          <div className="Post-user">
            <div className="Post-user-avatar">
              <img
                src={this.props.data.user.avatar}
                alt={this.props.data.name}
              />
            </div>
            <div className="Post-user-nickname">
              <span>{this.props.data.name}</span>
            </div>
          </div>
        </header>
        <p>{this.props.data.text}</p>
        <i>from {this.props.data.name}</i>
        <i style={{ display: "inline" }}>created on{this.props.data.date}</i>
        <div className="Post-caption">
          <strong>{this.props.data.name}</strong> Moving the community!
        </div>
        <i>no of likes:{this.props.data.likes.length}</i>
        {/* <i>no of commments:{this.props.data.commments.length}</i> */}
        <p>{this.commments}</p>
        <button
          onClick={() => {
            this.liker(this.props.data._id);
          }}
        >
          like
        </button>
        {commments}
      </div>
    );
  }
}
export default Profile;
