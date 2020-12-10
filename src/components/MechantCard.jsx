import React from "react";
import moment from "moment";
import DeleteButton from "../components/DeleteButton";
import { Link } from "react-router-dom";

const MechantCard = ({ item }) => {
  return (
    <div className="yourMerchDisplay">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <img
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          alt="merchant img"
        />
        <div style={{ marginLeft: 20 }}>
          <h3>
            <Link id="marchantName" to={`/merchants/${item.id}`}>
              {item.name}
            </Link>
          </h3>
          <p style={{ fontSize: 12, color: "gray" }}>
            {moment(item.createdAt).fromNow()}
          </p>
        </div>
      </div>
      <div
        style={{
          width: 150,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DeleteButton merchantId={item.id} />
        <button>Edit</button>
      </div>
    </div>
  );
};

export default MechantCard;
