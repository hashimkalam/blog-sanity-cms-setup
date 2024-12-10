import { client } from '../../lib/sanity';
import BlogPost from '../../components/BlogPost';

export default function Post({ post }: any) {
  return (
    <div>
      <BlogPost post={post} />
    </div>
  );
}

export async function getStaticPaths() {
  const query = '*[_type == "post"]{slug}'; // Query to get slugs
  const posts = await client.fetch(query);

  const paths = posts.map((post: { slug: { current: any; }; }) => ({
    params: { slug: post.slug.current },
  }));

  return { paths, fallback: false }; // Paths are pre-generated, no fallback
}

export async function getStaticProps({ params }: any) {
  const query = `*[_type == "post" && slug.current == "${params.slug}"][0]`; // Fetch single post by slug
  const post = await client.fetch(query);

  return {
    props: {
      post,
    },
  };
}
