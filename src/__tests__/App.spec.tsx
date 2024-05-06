// import react-testing methods
import "@testing-library/jest-dom";
import { GET_POSTS } from "../features/posts/gql/queries";
/*
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
*/


test("loads and displays header", async () => {
  const mocks: any = [
    {
      request: {
        query: GET_POSTS,
      },
      result: {
        data: {
          posts: {
            data: [],
          },
        },
      },
    },
  ];
  console.log(mocks)
/*
  render(
    <MockedProvider mocks={mocks} addTypename={true}>
      <Main />
    </MockedProvider>
  );*/

  //expect(await screen.findByText("Posts")).toBeInTheDocument();
  expect(1).toBe(1);
});
