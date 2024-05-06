import { SetStateAction, createContext, useState, Dispatch } from "react";

interface PostContextType {
  selectedPost: any;
  setSelectedPost: Dispatch<SetStateAction<object>>;
  posts: any[];
  setPosts: Dispatch<SetStateAction<any>>;
}
export const PostContext = createContext<PostContextType>({
  selectedPost: {},
  setSelectedPost: () => {},
  posts: [],
  setPosts: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const PostProvider = ({ children }: Props) => {
  const [selectedPost, setSelectedPost] = useState({});
  const [posts, setPosts] = useState([]);
  return (
    <PostContext.Provider
      value={{
        selectedPost,
        setSelectedPost,
        posts,
        setPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export default PostContext;
