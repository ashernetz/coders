import { gql } from "@apollo/client";

export const postFragment = gql`
  fragment PostFragment on Post {
    id
    title
    body
    user {
      id
      name
      email
    }
  }
  `