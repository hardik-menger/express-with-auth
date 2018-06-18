import React, { Component } from "react";
import axios from "axios";
import classnames from "classnames";
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      terms: false,
      errors: {}
    };
    this.handleinputchange = this.handleinputchange.bind(this);
  }

  handleinputchange(event) {
    let target = event.target;
    let field = target.name;
    let value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({ [field]: value });
  }
  handleSubmit(event) {
    event.preventDefault();
    var counter = 0;
    if (this.state.name.length > 3) {
      counter++;
      const { password, ...state } = this.state.errors;
      this.setState({ errors: state });
    } else {
      setTimeout(() => {
        this.setState({
          errors: {
            name: "name field is required"
          }
        });
      }, 0.2);
    }

    //pass eval
    if (
      this.state.password.match(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
      ) &&
      this.state.password == this.state.password2
    ) {
      counter++;
      const { password, ...state } = this.state.errors;
      this.setState({ errors: state });
    } else {
      setTimeout(() => {
        this.setState({
          errors: {
            password:
              "passwords should be atleast 8 aplhanumeric characters with one special character"
          }
        });
      }, 0.1);
    }

    //emailid eval
    if (
      /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/.test(this.state.email)
    ) {
      counter++;
      const { email, ...state } = this.state.errors;

      this.setState({ errors: state });
    } else {
      this.setState({
        errors: { email: "this.emailid" }
      });
    }
    if (this.state.terms) {
      counter++;
    }
    if (counter === 4) {
      const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
      };
      console.log(newUser);
      axios
        .post("http://localhost:3001/api/users/register", newUser)
        .then(res => console.log(res.data))
        .catch(err => this.setState({ errors: err.response.data }));
      counter = 0;
    } else {
      counter = 0;
    }
  }
  render() {
    const errors = this.state.errors;
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    onChange={this.handleinputchange}
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.name
                    })}
                    placeholder="Name"
                    name="name"
                    ref="name"
                    value={this.state.name}
                  />
                  {errors.name && (
                    <div className="invalid-feedback">{errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleinputchange}
                    type="email"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.email
                    })}
                    placeholder="Email Address"
                    name="email"
                    ref="email"
                    value={this.state.email}
                  />
                  <small className="form-text text-muted">
                    This site uses Gravatar so if you want a profile image, use
                    a Gravatar email
                  </small>
                  {errors.email && (
                    <div className="invalid-feedback">{errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleinputchange}
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.password
                    })}
                    placeholder="Password"
                    name="password"
                    ref="password"
                    value={this.state.password}
                  />
                  {errors.password && (
                    <div className="invalid-feedback">{errors.password}</div>
                  )}
                </div>
                <div className="form-group">
                  <input
                    onChange={this.handleinputchange}
                    type="password"
                    className={"form-control form-control-lg"}
                    placeholder="Confirm Password"
                    name="password2"
                    ref="password2"
                    value={this.state.password2}
                  />
                </div>
                <div className="row">
                  <label style={{ marginLeft: "20px" }}>
                    <input
                      autoComplete="given-name"
                      type="checkbox"
                      style={{ marginLeft: "20" }}
                      checked={this.state.terms}
                      onChange={this.handleinputchange}
                      name="terms"
                    />
                    <span>Accept the terms and conditions</span>
                  </label>
                </div>

                <input type="Submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Register;
