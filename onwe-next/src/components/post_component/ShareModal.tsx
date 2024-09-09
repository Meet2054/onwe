// components/ShareModal.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
  FacebookShareButton, FacebookIcon,
  LineShareButton, LineIcon,
  PinterestShareButton, PinterestIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  LinkedinShareButton, LinkedinIcon,
  EmailShareButton, EmailIcon
} from 'next-share';

const ShareModal = ({ postId, onClose }: {postId:number,  onClose: () => void }) => {
  // Create a ref for the modal container
  const [link, setLink] = useState<string>(`http://localhost:3000/post/${postId}`);

  return (
    <>
      {/* Inline styles for animations */}
      <style jsx>{`
        @keyframes jump {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-jump {
          animation: jump 0.5s ease-in-out infinite;
        }

        .share-modal {
          display: flex;
          gap: 10px;
          align-items: center;
          margin-top: -4px;
         /* Adjust margin as needed */
        }
      `}</style>

      {/* Share button container */}
      <div  className="share-modal">
        <LineShareButton url={link}>
          <LineIcon size={30} round className="animate-jump" />
        </LineShareButton>
        <WhatsappShareButton url={link} title={'Check this out!'} separator=":: ">
          <WhatsappIcon size={30} round className="animate-jump" />
        </WhatsappShareButton>
        <FacebookShareButton url={link} hashtag={'#nextshare'}>
          <FacebookIcon size={30} round className="animate-jump" />
        </FacebookShareButton>
        <TwitterShareButton url={link} title={'Check this out!'}>
          <TwitterIcon size={30} round className="animate-jump" />
        </TwitterShareButton>
        <PinterestShareButton url={link} media={'Check this out!'}>
          <PinterestIcon size={30} round className="animate-jump" />
        </PinterestShareButton>
        <LinkedinShareButton url={link}>
          <LinkedinIcon size={30} round className="animate-jump" />
        </LinkedinShareButton>
        <EmailShareButton url={link} subject={'Check this out!'} body="body">
          <EmailIcon size={30} round className="animate-jump" />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareModal;
