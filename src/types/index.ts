// Define the Post interface
export interface Post {
  _id: string;
  title: string;
  mainImage: {
    asset: {
      _ref: string;
    };
  };
  body: any; // You can refine this depending on your schema (e.g., rich text)
  slug: {
    current: string;
  };
}
