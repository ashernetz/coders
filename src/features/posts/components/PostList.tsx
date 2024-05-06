import { Post } from "../utils/post.interfaces";
import PostItem from "./PostItem";
import PostContext from "../../../context/PostContext";
import { useContext } from "react";

const PostList = () => {
  const { setSelectedPost, selectedPost, posts } = useContext(PostContext);
  return (
    <div className="flex flex-col max-w-4xl" data-testid="post-list">
      {posts.map((postData: Post, id:number) => (
        <PostItem
          postData={postData}
          setSelectedPost={setSelectedPost}
          key={id}
          selectedPost={selectedPost}
        />
      ))}
    </div>
  );
};

export default PostList;
