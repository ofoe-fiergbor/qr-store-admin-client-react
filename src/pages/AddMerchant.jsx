import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { ADD_NEW_MERCHANT } from "../graphql/addMerchant";
import { FETCH_ALL_MERCHANTS } from "../graphql/queries";

const AddMerchant = ({ history }) => {
  const [values, setValues] = useState({
    name: "",
    address: "",
  });

  const [createMerchant, { error }] = useMutation(ADD_NEW_MERCHANT, {
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
    },
    variables: values,
    onError(error) {
      console.log(error);
    },
  });

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    if (values.name.length === 0 && values.address.length === 0) {
      alert("Fields cannot be empty");
    }
    createMerchant();
    e.preventDefault();
  };
  return (
    <div className="formContainer">
      <Form onSubmit={onSubmit} noValidate>
        <h1 style={{ textAlign: "center" }}>Login</h1>

        <Form.Input
          label="Name"
          placeholder="Name..."
          name="name"
          onChange={onChange}
          value={values.name}
          type="text"
        />

        <Form.Input
          label="Address"
          placeholder="Address..."
          name="address"
          onChange={onChange}
          value={values.address}
          type="text"
        />

        <Button type="submit" color="teal">
          Create Merchant
        </Button>
      </Form>
    </div>
  );
};

export default AddMerchant;
