import { useContext, useEffect, useState } from "react";
import PostContext from "../../../context/PostContext";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import { CreatePostInput, Post } from "../utils/post.interfaces";
import { findPostIndex, updatePostsByIndex } from "../utils/utilFunctions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_POST } from "../gql/mutations";

const EditPost = () => {
  const [postData, setPostData] = useState<Post>({
    id: "",
    title: "",
    body: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);
  const history = useNavigate();
  const [updatePostMutation] = useMutation(UPDATE_POST, {
    onError(error, clientOptions) {
      console.log(error);
      console.log(clientOptions);
    },
    onCompleted: (data) => {
      console.log(data);
      const postIndex = findPostIndex(posts, selectedPost.id);
      const updatedPosts = updatePostsByIndex(posts, postIndex, postData);
      setPosts(updatedPosts);
      setSelectedPost(postData);
      toast.success("Post updated successfully");
      setIsUpdated(false);
    },
  });
  const { selectedPost, posts, setPosts, setSelectedPost } =
    useContext(PostContext);

  const onSubmit = async () => {
    if (isUpdated) return;
    try {
      setIsUpdated(true);
      await updatePostMutation({
        variables: {
          id: `${postData.id}`,
          input: { title: postData.title, body: postData.body },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onMutation = (value: string, element: string) => {
    setPostData({ ...postData, [element]: value });
  };

  useEffect(() => {
    setPostData({
      id: selectedPost.id,
      title: selectedPost.title,
      body: selectedPost.body,
    });
  }, [selectedPost]);
  return (
    <div className="container mx-auto py-8">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        autoComplete="off"
        className="flex justify-center flex-col"
      >
        <Form.Item<CreatePostInput>
          label="Title"
          rules={[{ required: true, message: "Please input the post title" }]}
        >
          <Input
            onChange={(e) => onMutation(e.target.value, "title")}
            value={postData.title}
          />
        </Form.Item>

        <Form.Item<CreatePostInput>
          label="Body"
          rules={[{ required: true, message: "Please input the post content" }]}
        >
          <TextArea
            onChange={(e) => onMutation(e.target.value, "body")}
            value={postData.body}
          ></TextArea>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <button
            className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
            type="submit"
            disabled={isUpdated}
          >
            Edit Post
          </button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="button"
            danger
            disabled={isUpdated}
            onClick={() => history("/")}
          >
            back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default EditPost;
