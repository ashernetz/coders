import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { PostProvider } from "../context/PostContext";
import { ADD_POST } from "../features/posts/gql/mutations";
import NewPost from "../features/posts/containers/NewPost";
import { BrowserRouter } from "react-router-dom";
import user from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
const mocks = [
  {
    request: {
      query: ADD_POST,
      variables: {
        input: { title: "test title", body: "test body" },
      },
    },
    result: {
      data: {
        createPost: {
          id: "1",
          title: "Test Title",
          content: "Test Content",
        },
      },
    },
  },
];

function renderComponent() {
  render(
    <MockedProvider mocks={mocks}>
      <BrowserRouter>
        <PostProvider>
          <NewPost />
        </PostProvider>
      </BrowserRouter>
    </MockedProvider>
  );
}

describe("NewPost", () => {
  test("renders the NewPost component", async () => {
    renderComponent();
    const newPostComponent = screen.getByTestId("new-post");
    expect(screen.getByText("Add a new Post")).toBeInTheDocument();
    expect(newPostComponent).toBeInTheDocument();
  });

  test("the form is submitted successfully", async () => {
    renderComponent();
    const titleInput = screen.getByRole("textbox", { name: /title/i });
    const contentInput = screen.getByRole("textbox", { name: /body/i });
    const submitButton = screen.getByText("Add Post");
    await user.click(titleInput);
    await user.keyboard("post title");
    await user.click(contentInput);
    await user.keyboard("post body");
    await act(async () => {
      await user.click(submitButton);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  });
});

/*
fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    fireEvent.click(submitButton);
*/
