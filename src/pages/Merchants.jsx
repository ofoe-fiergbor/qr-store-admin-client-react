import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useQuery } from "@apollo/client";
import { FETCH_ALL_MERCHANTS } from "../graphql/queries";
import { Button } from "semantic-ui-react";

import MerchantCard from "../components/MechantCard";
import { allMerchants } from "../redux/action";
import { Link } from "react-router-dom";

const Merchants = ({ user, allMerchants }) => {
  const { loading, data } = useQuery(FETCH_ALL_MERCHANTS);
  const yourMerchantItems =
    user &&
    data &&
    data.getMerchants.filter((item) => item.email === user.email);

  useEffect(() => {
    allMerchants(yourMerchantItems);
  });

  return (
    <div>
      <div className="merchantHeader">
        <h1 className="headerText">Your Merchants</h1>
        <Button color="teal" as={Link} to="/addMerchant">
          Add Merchant
        </Button>
      </div>

      {loading ? (
        <h1>Loading.....</h1>
      ) : (
        user &&
        data &&
        yourMerchantItems.map((item) => {
          return (
            <div key={item.id}>
              <MerchantCard data={item} />
            </div>
          );
        })
      )}
    </div>
  );
};

function mstp(state) {
  return {
    user: state.auth.user,
  };
}

export default connect(mstp, { allMerchants })(Merchants);
