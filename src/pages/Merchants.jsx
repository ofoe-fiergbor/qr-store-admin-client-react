import React from "react";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_MERCHANTS } from "../graphql/queries";
import { connect } from "react-redux";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

import MechantCard from "../components/MechantCard";

const Merchants = ({ user, userMerchants }) => {
  const { data, loading } = useQuery(FETCH_ALL_MERCHANTS);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <div
            style={{
              width: "60vw",
            }}
          >
            <button className="addMerchant">
              <Link id="addMerchant" to="/addMerchant">
                Add Merchant
              </Link>
            </button>
            {data &&
              data.getMerchants
                .filter((e) => e.email === user.email)
                .map((item) => {
                  return <MechantCard key={item.id} item={item} />;
                })}
          </div>
        )}
      </div>
    </div>
  );
};

function mstp(state) {
  return {
    user: state.auth.user,
  };
}
export default connect(mstp)(Merchants);
