import React, { useState } from "react";
import { REGISTER_NEW_USER } from "../graphql/register";
import { useMutation } from "@apollo/client";
import Spinner from "../components/Spinner";
import { login } from "../redux/action";
import { connect } from "react-redux";

const Register = ({ login, history }) => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_NEW_USER, {
    variables: values,
    update(proxy, result) {
      login(result.data.register);
      history.push("/");
    },
    onError(err) {
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };
  return (
    <div className="form_container">
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <div className="input_container">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username.."
              onChange={onChange}
              value={values.username}
            />
          </div>

          <div className="input_container">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email..."
              onChange={onChange}
              value={values.email}
            />
          </div>

          <div className="input_container">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password..."
              onChange={onChange}
              value={values.password}
            />
          </div>

          <div className="input_container">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password.."
              onChange={onChange}
              value={values.confirmPassword}
            />
          </div>

          <button type="submit">Register</button>

          {Object.keys(errors).length > 0 && (
            <div className="error_message">
              <ul className="list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default connect(null, { login })(Register);
