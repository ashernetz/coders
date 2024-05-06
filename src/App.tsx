import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PostContainer from "./features/posts/containers/PostContainer";
import NewPost from "./features/posts/containers/NewPost";
import { PostProvider } from "./context/PostContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditPost from "./features/posts/containers/EditPost";

const client = new ApolloClient({
  uri: "https://graphqlzero.almansi.me/api",
  cache: new InMemoryCache(),
});

type Post = {
  id: number;
  title: string;
  body: string;
};

const NewPostItem = (post: Post) => (
  <div key={post.id} className="bg-secondary rounded-md px-2 py-1 mt-4">
    <h2>{post.title}</h2>
    <p className="text-dark-body text-sm m-0">{post.body}</p>
  </div>
);

export const Main = () => {
  return <div className="container mx-auto py-8">holi</div>;
};

function App() {
  return (
    <>
    <ToastContainer />
    <PostProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="container sm mx-auto">
            <Routes>
              <Route path="/" element={<PostContainer />} />
              <Route path="/new" element={<NewPost />} />
              <Route path="/edit" element={<EditPost />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
      </PostProvider>
    </>
  );
}

export default App;
