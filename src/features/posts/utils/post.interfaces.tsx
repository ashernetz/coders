export interface Post {
  id: string;
  title: string;
  body: string;
}

export interface User {
  email: string;
  id: string;
  name: string;
}


export interface CreatePostInput {
  title: string;
  body: string;
}