
import { urlFor } from '@/lib/sanity';
import { Post, SanityImageSource } from '@/types';
import Image from 'next/image';
import { Key } from 'react';

// Update the types to handle Sanity image sources correctly
interface SanityBlock {
  _type: 'block' | 'image';
  children?: { text: string }[];
  asset?: { _ref: string };
}

export default function BlogPost({ post }: { post: Post }) {
  // Calculate how many blocks should go to the left column (60%) and right column (40%)
  const leftColumnContent = post.body.slice(0, Math.floor(post.body.length * 0.6));
  const rightColumnContent = post.body.slice(Math.floor(post.body.length * 0.6));

  // Safely handle image source conversion
  const getSafeImageSrc = (imageSource: SanityImageSource | { _ref: string } | undefined) => {
    if (!imageSource) return '';
    
    // If it's already a string (URL), return it
    if (typeof imageSource === 'string') return imageSource;
    
    // If it has a _ref, use urlFor
    if ('_ref' in imageSource) {
      return urlFor(imageSource) || '';
    }
    
    return '';
  };

  return (
    <div className="max-w-7xl mx-auto p-5 h-screen overflow-y-auto">
      <h2 className="text-3xl font-bold mb-5">{post.title}</h2>

      {/* Render the main image */}
      {/* <Image 
        src={getSafeImageSrc(post.mainImage)} 
        alt={post.title} 
        width={600} 
        height={400} 
        className="mb-8"
      /> */}

      {/* Render the body with 60%/40% columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column (60% of the content) */}
        <div>
          {leftColumnContent.map((block: any, index: Key) => {
            switch (block._type) {
              case 'block': {
                // Handle text block (e.g., paragraphs, headings)
                return (
                  <div key={index} className="mb-4">
                    <p>{block.children?.map((child: { text: any; }) => child.text).join(' ') || ''}</p>
                  </div>
                );
              }
              case 'image': {
                // Check if asset exists before calling urlFor
                if (block.asset?._ref) {
                  return (
                    <div key={index} className="mb-4">
                      <Image
                        src={getSafeImageSrc(block.asset)}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                  );
                }
                return null;
              }
              default:
                return null;
            }
          })}
        </div>

        {/* Right Column (40% of the content) - SanityBlock */} 
        <div>
          {rightColumnContent.map((block: any, index: Key) => {
            switch (block._type) {
              case 'block': {
                // Handle text block (e.g., paragraphs, headings)
                return (
                  <div key={index} className="mb-4">
                    <p>{block.children?.map((child: { text: any; }) => child.text).join(' ') || ''}</p>
                  </div>
                );
              }
              case 'image': {
                // Check if asset exists before calling urlFor
                if (block.asset?._ref) {
                  return (
                    <div key={index} className="mb-4">
                      <Image
                        src={getSafeImageSrc(block.asset)}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="object-cover"
                      />
                    </div>
                  );
                }
                return null;
              }
              default:
                return null;
            }
          })}
        </div>
      </div>
    </div>
  );
}