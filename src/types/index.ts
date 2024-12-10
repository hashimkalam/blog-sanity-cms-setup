export interface SanityImageSource {
  _ref: string;
  _type?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  mainImage: string | SanityImageSource | { asset?: SanityImageSource };
  body: Array<{
    _type: string;
    children: Array<{ text: string }>;
    asset?: { _ref: string };
  }>;
}