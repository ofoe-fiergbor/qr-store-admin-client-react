import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Spinner from "../components/Spinner";

import { ADD_NEW_MERCHANT } from "../graphql/addMerchant";
import { FETCH_ALL_MERCHANTS } from "../graphql/queries";

const AddMerchant = ({ login, history }) => {
  const [values, setValues] = useState({
    name: "",
    address: "",
  });

  const [addNewMerchant, { loading }] = useMutation(ADD_NEW_MERCHANT, {
    update(proxy, result) {
      history.push("/merchants");

      const data = proxy.readQuery({
        query: FETCH_ALL_MERCHANTS,
      });

      proxy.writeQuery({
        query: FETCH_ALL_MERCHANTS,
        data: {
          getMerchants: [result.data.createMerchant, ...data.getMerchants],
        },
      });

      values.name = "";
      values.address = "";
    },
    variables: values,
    onError(err) {
      console.log(JSON.stringify(err, null, 2));
    },
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;
    addNewMerchant();
  };
  return (
    <div className="form_container">
      <h1 style={{ marginBottom: 20 }}>Create New Merchant</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmit}>
          <div className="input_container">
            <label>Merchant Name</label>
            <input
              type="text"
              name="name"
              placeholder="Merchant name..."
              onChange={onChange}
              value={values.name}
            />
          </div>

          <div className="input_container">
            <label>Address</label>
            <input
              type="text"
              name="address"
              placeholder="Address..."
              onChange={onChange}
              value={values.address}
            />
          </div>

          <button type="submit">Create Merchant</button>
        </form>
      )}
    </div>
  );
};

export default AddMerchant;
