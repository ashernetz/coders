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
