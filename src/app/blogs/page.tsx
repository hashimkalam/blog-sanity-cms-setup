import { client } from '@/lib/sanity'; // Ensure you import your Sanity client
import BlogPost from '@/components/BlogPost';
import { Post } from '@/types'; // Import the Post type

export default async function BlogPage() {
  const query = '*[_type == "post"]{_id, title, body, slug, mainImage}'; // Ensure to include slug and mainImage
  const posts: Post[] = await client.fetch(query); // Fetch the posts directly in the component


  console.log("posts - ", posts)
  return (
    <div>
      <h1>My Blog</h1>
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export const revalidate = 60; // Revalidate the page every 60 seconds (Optional)
