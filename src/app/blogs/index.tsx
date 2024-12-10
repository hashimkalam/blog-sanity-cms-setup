import { client } from '../../lib/sanity';
import BlogPost from '../../components/BlogPost';
import { Post } from '../../types'; // Import Post type

export default function Home({ posts }: { posts: Post[] }) {
  return (
    <div>
      <h1>My Blog</h1>
      {posts.map((post) => (
        <BlogPost key={post._id} post={post} />
      ))}
    </div>
  );
}

export async function getStaticProps() {
  const query = '*[_type == "post"]'; // Sanity query to get posts
  const posts = await client.fetch(query);

  return {
    props: {
      posts,
    },
    revalidate: 60, // Optional: Re-generate the page every 60 seconds for new content
  };
}
