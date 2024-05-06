import { Card } from "antd";
const { Meta } = Card;
const selectedStyle = {
  borderColor: "transparent",
  boxShadow:
    "0 1px 2px -2px rgba(0, 0, 0, 0.16), 0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09)",
};

export const PostItem = ({ postData, setSelectedPost, selectedPost }: any) => (
  <Card
    hoverable
    key={postData.id}
    className="mb-2"
    style={postData.id === selectedPost.id ? selectedStyle : {}}
    onClick={() => setSelectedPost(postData)}
    data-testid="post-item"
  >
    <Meta title={postData.title} description={postData.body} />
    <div className="flex justify-between items-center mt-4">
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
        Read More
      </button>
      <div className="flex items-center">
        <img
          className="w-8 h-8 rounded-full mr-2"
          src="https://via.placeholder.com/50"
          alt="Avatar"
        />
        <p className="text-gray-700">John Doe</p>
      </div>
    </div>
  </Card>
);

export default PostItem;
