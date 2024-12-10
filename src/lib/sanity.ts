import {createClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Retrieve the project ID from the environment variable
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, 
  useCdn: true, // Enable CDN for faster queries
});

// Create image URL builder
const builder = imageUrlBuilder(client);

// Generate image URL
const urlFor = (source: any) => builder.image(source);

export {client, urlFor}