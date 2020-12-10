import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_ITEM } from "../graphql/DeleteMerchant";
// import { FETCH_ALL_MERCHANTS } from "../graphql/queries";

const DeleteItem = ({ merchantId, itemId }) => {
  const [deleteMerchant, { loading }] = useMutation(DELETE_ITEM);

  // const updateCache = (client) => {
  //   const data = client.readQuery({
  //     query: FETCH_ALL_MERCHANTS,
  //   });
  //   const newData = {
  //     getMerchants: data.getMerchants.filter((m) => m.id !== merchantId),
  //   };

  //   client.writeQuery({
  //     query: FETCH_ALL_MERCHANTS,
  //     data: newData,
  //   });
  // };

  const remove = () => {
    if (loading) return;
    deleteMerchant({
      variables: { merchantId, itemId },
    });
  };
  return (
    <button
      style={{
        marginTop: 10,
        width: 80,
        height: 25,
        backgroundColor: "red",
        border: "none",
        color: "#fff",
        fontWeight: "bold",
        outline: "none",
      }}
      onClick={remove}
    >
      Delete
    </button>
  );
};

export default DeleteItem;
