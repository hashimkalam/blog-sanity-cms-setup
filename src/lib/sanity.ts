import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Post, SanityImageSource } from '@/types';

// Create and configure the Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
});

// Create an image URL builder
const builder = imageUrlBuilder(client);

// Updated urlFor function to handle different image source types more comprehensively
export const urlFor = (source: string | SanityImageSource | { asset?: SanityImageSource }): string => {
  // If it's already a string, return it directly
  if (typeof source === 'string') return source;

  // If it's a SanityImageSource with _ref, use it directly
  if ('_ref' in source) {
    try {
      return builder.image(source).url() || '';
    } catch (error) {
      console.error('Error generating image URL:', error);
      return '';
    }
  }

  // If it's an object with an asset property
  if (source.asset && '_ref' in source.asset) {
    try {
      return builder.image(source.asset).url() || '';
    } catch (error) {
      console.error('Error generating image URL:', error);
      return '';
    }
  }

  // If no valid image source is found, return an empty string
  return '';
};

// Function to fetch posts with the appropriate type
export const fetchPosts = async (): Promise<Post[]> => {
  const query = '*[_type == "post"]'; 
  return await client.fetch(query);
};

export { client };