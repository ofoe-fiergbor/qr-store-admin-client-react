import { gql } from "@apollo/client";

export const ADD_NEW_MERCHANT = gql`
  mutation createMerchant($name: String!, $address: String!) {
    createMerchant(name: $name, address: $address) {
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
// createItem(itemName: String!, price: Int!, merchantId: ID!): Merchant!

export const ADD_MERCHANT_ITEM = gql`
  mutation createItem($itemName: String!, $price: Int!) {
    createItem(itemName: $itemName, price: $price) {
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
