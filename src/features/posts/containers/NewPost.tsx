import type { FormProps } from "antd";
import { Button, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useContext, useState } from "react";
import { CreatePostInput } from "../../../__generated__/graphql";
import { ADD_POST } from "../gql/mutations";
import { useMutation } from "@apollo/client";
import { convertPost, addPostToList } from "../utils/utilFunctions";
import PostContext from "../../../context/PostContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const history = useNavigate();
  const { posts, setPosts } = useContext(PostContext);
  const [useAddPostMutation] = useMutation(ADD_POST, {
    onCompleted: (data) => {
      console.log(data)
      const convertedPost = convertPost(data.createPost);
      const newPostList = addPostToList(posts, convertedPost);
      setPosts(newPostList);
      toast.success("Post added successfully");
    },
  });
  const [postData, setPostData] = useState<CreatePostInput>({
    title: "",
    body: "",
  });

  const onFinishFailed: FormProps<CreatePostInput>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  const onMutation = (value: string, element: string) => {
    setPostData({ ...postData, [element]: value });
  };

  const onSubmit = async () => {
    try {
      await useAddPostMutation({
        variables: {
          input: { title: postData.title, body: postData.body },
        },
      });
    } catch (e) {
      console.log(e);
      toast.error("Failed to add post");
    }
  };

  return (
    <div className="place-content-center grid" data-testid="new-post">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center text-gray-900 mt-8 md:mt-12 lg:mt-16 leading-tight mb-8">
        Add a new Post
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="flex justify-center flex-col"
      >
        <Form.Item<CreatePostInput>
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input the post title" }]}
        >
          <Input
            onChange={(e) => onMutation(e.target.value, "title")}
            value={postData.title}
            name="title"
          />
        </Form.Item>

        <Form.Item<CreatePostInput>
          label="Body"
          name="body"
          rules={[{ required: true, message: "Please input the post content" }]}
        >
          <TextArea
            onChange={(e) => onMutation(e.target.value, "body")}
            value={postData.title}
            name="body"
          ></TextArea>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <button
            className="bg-white text-dark-body text-sm px-4 py-2 border-light-body border-2 border-solid rounded-xl"
            type="submit"
          >
            Add Post
          </button>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="button"
            danger
            onClick={() => history("/")}
          >
            back
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewPost;
