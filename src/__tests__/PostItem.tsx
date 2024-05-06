import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import PostItem from "../features/posts/components/PostItem";

const postData = {
  id: "1",
  title: "Test Title",
  body: "Test Body",
};

const postContext = {
  selectedPost: {
    id: "1",
    title: "Test Title",
    body: "Test Body",
  },
  setSelectedPost:  jest.fn(),
};

function renderComponent(postData: any, postContext: any) {
    render(
        <PostItem
        postData={postData}
        setSelectedPost={postContext.setSelectedPost}
        selectedPost={postContext.selectedPost}
        />
    );
    
}

describe("PostItem", () => {
  test("renders PostItem component with onClick event and PostContext", () => {
    renderComponent(postData, postContext);
    const postItem = screen.getByTestId("post-item");
    expect(postItem).toBeInTheDocument();
  });

  test("onclick events saves the selected Post", async () => {
    renderComponent(postData, postContext);
    const postItem = screen.getByTestId("post-item");
    await fireEvent.click(postItem);
    expect(postContext.setSelectedPost).toHaveBeenCalledWith(postData);
    expect(postContext.setSelectedPost).toHaveBeenCalledTimes(1);
  });
});
