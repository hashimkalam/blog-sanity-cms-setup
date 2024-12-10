import { client } from '@/lib/sanity'; // Ensure you import your Sanity client
import BlogPost from '@/components/BlogPost';

export default async function BlogPage() {
  const query = '*[_type == "post"]'; // Sanity query to get all posts
  const posts = await client.fetch(query); // Fetch the posts directly in the component

  return (
    <div>
      <h1>My Blog</h1>
      {posts.map((post: { _id: string; title: string; body: string }) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds (Optional)
