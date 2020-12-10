import { gql } from "@apollo/client";

export const DELETE_MERCHANT_MUTATION = gql`
  mutation deleteMerchant($merchantId: ID!) {
    deleteMerchant(merchantId: $merchantId)
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($merchantId: ID!, $itemId: ID!) {
    deleteItem(merchantId: $merchantId, itemId: $itemId) {
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
