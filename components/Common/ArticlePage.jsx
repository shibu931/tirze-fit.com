import { cache } from 'react';

const ArticlePage = async ({ content }) => {
  const sanitizedHTML = await sanitizeContent(content);

  return <article className='article' dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></article>;
};

const sanitizeContent = cache(async (content) => {
  if (!content) {
    return '';
  }

  let result = content;
  const headingRegex = /<(h[1-5])>(.*?)<\/\1>/gs; // Matches h2 to h5 tags

  result = result.replace(headingRegex, (match, tag, text) => {
    const id = text.toLowerCase().replace(/\s+/g, '-');
    return `<${tag} id="${id}">${text}</${tag}>`;
  });

  return result;
});

export default ArticlePage;