import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_MERCHANT_MUTATION } from "../graphql/DeleteMerchant";
import { FETCH_ALL_MERCHANTS } from "../graphql/queries";

const DeleteButton = ({ merchantId }) => {
  const [deleteMerchant, { loading }] = useMutation(DELETE_MERCHANT_MUTATION);

  const updateCache = (client) => {
    const data = client.readQuery({
      query: FETCH_ALL_MERCHANTS,
    });
    const newData = {
      getMerchants: data.getMerchants.filter((m) => m.id !== merchantId),
    };

    client.writeQuery({
      query: FETCH_ALL_MERCHANTS,
      data: newData,
    });
  };

  const remove = () => {
    if (loading) return;
    deleteMerchant({
      variables: { merchantId },
      update: updateCache,
    });
  };

  return (
    <button
      onClick={remove}
      disabled={loading}
      style={{ backgroundColor: loading ? "#ffcccb " : "red" }}
      className="deleteBtn"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
