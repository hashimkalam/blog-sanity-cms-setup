import { client } from '@/lib/sanity'; // Ensure you import your Sanity client
import BlogPost from '@/components/BlogPost';

export default async function PostPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "post" && slug.current == "${params.slug}"][0]`; // Sanity query to get the specific post by slug
  const post = await client.fetch(query);

  return (
    <div>
      <h2>{post.title}</h2>
      <BlogPost post={post} />
    </div>
  );
}

export async function generateStaticParams() {
  const query = '*[_type == "post"]{slug}'; // Query to get slugs for all posts
  const posts = await client.fetch(query);

  return posts.map((post: { slug: { current: string } }) => ({
    slug: post.slug.current,
  }));
}
