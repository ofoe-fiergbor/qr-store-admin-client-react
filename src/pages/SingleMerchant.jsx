import React from "react";
import { useQuery } from "@apollo/client";
import Spinner from "../components/Spinner";
import DeleteItem from "../components/DeleteItem";

import { FETCH_SINGLE_MERCHANT } from "../graphql/queries";
import QRCode from "qrcode.react";
import moment from "moment";

const SingleMerchant = (props) => {
  const merchantId = props.match.params.id;

  const { data, loading } = useQuery(FETCH_SINGLE_MERCHANT, {
    variables: {
      merchantId,
    },
    onError(err) {
      console.log(err);
    },
  });

  const format = (amount) => {
    return Number(amount)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  let singleMerch;
  if (loading) {
    singleMerch = <Spinner />;
  } else {
    const { createdAt, items, likes, name, id } = data.getMerchant;
    singleMerch = (
      <div className="singleMerchPage">
        <div className="headerContainer">
          <img
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            alt="avatar"
            className="avatarImg"
          />
          <QRCode
            value={id}
            style={{
              height: "10em",
              width: "10em",
            }}
          />
          <div style={{ textAlign: "center", marginTop: 10 }}>
            <h2>{name}</h2>
            <p style={{ color: "grey" }}>{moment(createdAt).fromNow()}</p>
            <p style={{ color: "grey" }}>Likes: {likes.length}</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {items &&
            items.map((item) => {
              return (
                <div className="card" key={item.id}>
                  <img
                    src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                    alt="avatar"
                    className="itemImage"
                  />
                  <h3>{item.itemName}</h3>
                  <h5 style={{ color: "grey" }}>
                    {moment(item.createdAt).fromNow()}
                  </h5>
                  <h4>GHc{format(item.price)}</h4>
                  <DeleteItem merchantId={id} itemId={item.id} />
                </div>
              );
            })}
        </div>
      </div>
    );
  }

  return singleMerch;
};

export default SingleMerchant;
