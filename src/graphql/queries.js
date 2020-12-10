import { gql } from "@apollo/client";

export const FETCH_ALL_MERCHANTS = gql`
  {
    getMerchants {
      id
      username
      createdAt
      name
      email
      uniqID
      items {
        id
        username
        itemName
        email
        price
        createdAt
      }
      likes {
        id
        username
        email
        createdAt
      }
    }
  }
`;

export const FETCH_SINGLE_MERCHANT = gql`
  query($merchantId: ID!) {
    getMerchant(merchantId: $merchantId) {
      id
      username
      createdAt
      name
      email
      uniqID
      items {
        id
        username
        itemName
        email
        price
        createdAt
      }
      likes {
        id
        username
        email
        createdAt
      }
    }
  }
`;
