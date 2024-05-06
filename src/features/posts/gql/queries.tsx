import { gql } from "@apollo/client";
export const GET_POSTS = gql`
  query Posts {
    posts(options: {sort:[{field: "id", order: DESC}], slice:{limit: 10}}) {
      data {
        id
        title
        body
        user {
          id
          name
          email
        }
      }
    }
  }
`;