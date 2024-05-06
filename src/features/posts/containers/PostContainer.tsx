import { useMutation, useQuery } from "@apollo/client";
import PostList from "../components/PostList";
import { GET_POSTS } from "../gql/queries";
import { postFragment } from "../gql/fragments";
import { Link } from "react-router-dom";
import PostContext from "../../../context/PostContext";
import { useContext } from "react";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { deletePostByIndex, findPostIndex } from "../utils/utilFunctions";
import { DELETE_POST } from "../gql/mutations";

const PostContainer = () => {
  const { selectedPost, setPosts, posts, setSelectedPost } =
    useContext(PostContext);
  const history = useNavigate();
  const [deletePostMutation] = useMutation(DELETE_POST, {
    onCompleted: (data) => {
      console.log(data);
      toast.success("Post deleted successfully");
      setSelectedPost({});
      const updatedPosts = deletePostByIndex(
        posts,
        findPostIndex(posts, selectedPost.id)
      );
      setPosts(updatedPosts);
    },
  });
  const deletePost = async () => {
    if (Object.keys(selectedPost).length === 0) {
      toast.error("Please select a post to delete");
      return;
    }
    try {
      await deletePostMutation({
        variables: {
          id: selectedPost.id,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error("Error deleting post");
    }
  };

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: { postFragment: postFragment },
  });

  const redirectToEdit = () => {
    console.log(selectedPost);
    if (!Object.keys(selectedPost).length) {
      toast.error("Please select a post to edit");
      return;
    }
    history("/edit");
  };

  ///setPosts(convertPostData(data.posts.data))

  if (loading)
    return (
      <Spin
        tip="Loading"
        size="large"
        className="flex justify-center items-center h-lvh"
      ></Spin>
    );
  if (error) return <p>Error : {error.message}</p>;
  if (data && posts.length === 0) {
    setPosts(data.posts.data);
  }
  return (
    <>
      <h1>Posts Page</h1>
      <div className="flex justify-center ">
        <PostList />
      </div>
      <div>
        <Link
          className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
          onClick={() => {
            console.log("Create");
          }}
          to="/new"
        >
          Create a new post
        </Link>
      </div>
      <div>
        <button
          className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
          onClick={redirectToEdit}
        >
          Update post
        </button>
      </div>
      <div>
        <button
          className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
          onClick={deletePost}
        >
          Delete post
        </button>
      </div>
    </>
  );
};
export default PostContainer;
