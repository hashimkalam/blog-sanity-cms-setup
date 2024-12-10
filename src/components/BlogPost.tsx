import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { Post } from '@/types';
 
// Define BlogPost component with correct types
export default function BlogPost({ post }: { post: Post }) {
  return (
    <div>
      <h2>{post.title}</h2>
      {/* Ensure urlFor is correctly used to generate the image URL */}
      <Image 
        src={urlFor(post.mainImage).url()} 
        alt={post.title} 
        width={600} 
        height={400} 
      />
      <div>{post.body}</div> {/* Assuming body contains rich text */}
    </div>
  );
}
