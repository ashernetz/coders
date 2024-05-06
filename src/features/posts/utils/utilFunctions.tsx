import { Post } from "./post.interfaces";

export const convertPost = (post: Post) => ({ ...post });

export const convertPostData = (postData: Record<"Posts", Post>) =>
  Object.values(postData);

export const addPostToList = (postsList: Post[], newPost: Post) => [
  newPost,
  ...postsList,
];

export const findPostById = (postsList: Post[], postId: string) =>
  postsList.find((post: Post) => post.id === postId);

export const findPostIndex = (postsList: Post[], postId: string) =>
  postsList.findIndex((post: Post) => post.id === postId);

export const clonePosts = (posts: Post[]) => [...posts];

export const updatePostsByIndex = (
  posts: Post[],
  index: number,
  updatedPost: Post
) => {
  const updatedPosts = clonePosts(posts);
  updatedPosts[index] = updatedPost;
  return updatedPosts;
};

export const deletePostByIndex = (posts: Post[], index: number) => {
  const updatedPosts = clonePosts(posts);
  updatedPosts.splice(index, 1);
  return updatedPosts;
}