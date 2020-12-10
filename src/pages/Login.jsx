import React, { useState } from "react";
import { LOGIN_WITH_EMAIL_AND_PASSWORD } from "../graphql/login";
import { useMutation } from "@apollo/client";
import { connect } from "react-redux";
import { login } from "../redux/action";
import Spinner from "../components/Spinner";

const Login = ({ login, history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_WITH_EMAIL_AND_PASSWORD, {
    variables: values,
    update(proxy, result) {
      login(result.data.login);
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
    loginUser();
  };
  return (
    <div className="form_container">
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
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

          <button type="submit">Login</button>

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

export default connect(null, { login })(Login);
