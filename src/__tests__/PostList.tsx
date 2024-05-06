import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { PostContext } from "../context/PostContext";
import PostList from "../features/posts/components/PostList";

const PostContextData = {
  posts: [
    {
      id: 1,
      title: "Test Title",
      body: "Test Body",
    },
  ],
  selectedPost: {
    id: 1,
    title: "Test Title",
    body: "Test Body",
  },
  setSelectedPost: jest.fn(),
};

function renderComponent(PostContextData: any) {
  render(
    <PostContext.Provider value={PostContextData}>
      <PostList />
    </PostContext.Provider>
  );
}

describe("testing the PostLists", () => {
  test("renders PostList component with PostContext", () => {
    renderComponent(PostContextData);
    const postList = screen.getByTestId("post-list");
    expect(postList).toBeInTheDocument();
  });
});
