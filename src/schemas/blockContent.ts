// schemas/blockContent.js
export default {
    name: 'blockContent',
    title: 'Block Content',
    type: 'array',
    of: [
      {
        type: 'block',  // Standard block content like paragraphs, headings
      },
      {
        type: 'image',  // You can also include other content like images
      },
    ],
  };
  