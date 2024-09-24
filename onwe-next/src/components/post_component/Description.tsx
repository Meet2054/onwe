import React from 'react';

// Helper function to convert mentions and hashtags into links
const linkify = (text: string) => {
  const mentionRegex = /(@\w+)/g;
  const hashtagRegex = /(#\w+)/g;

  // Replace mentions with a link to the profile page
  const processedText = text
    .replace(mentionRegex, (mention) => {
      const username = mention.slice(1); // Remove '@' from mention
      return `<a href="/profile/${username}" style="color:#1D9BF0">${mention}</a>`;
    })
    .replace(hashtagRegex, (hashtag) => {
      const tag = hashtag.slice(1); // Remove '#' from hashtag
      return `<a href="/explore?tag=${tag}" style="color:#1D9BF0">${hashtag}</a>`;
    });

  return processedText;
};

const Description = ({ des, text=false }: { des: string, text?:boolean }) => {
  return (
    <div className={` w-full  ${text ? 'text-xl ' : 'text-lg'}`} 
      dangerouslySetInnerHTML={{ __html: linkify(des) }} 
    />
  );
};

export default Description;
