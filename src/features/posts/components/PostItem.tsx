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
    
  </Card>
);

export default PostItem;
