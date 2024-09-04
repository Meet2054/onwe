// components/ShareModal.tsx
import React, { useEffect, useRef } from 'react';
import {
  FacebookShareButton, FacebookIcon,
  LineShareButton, LineIcon,
  PinterestShareButton, PinterestIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  LinkedinShareButton, LinkedinIcon,
  EmailShareButton, EmailIcon
} from 'next-share';

const ShareModal = ({ onClose }: { onClose: () => void }) => {
  // Create a ref for the modal container

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
        <WhatsappShareButton url={'https://github.com/next-share'} title={'Check this out!'} separator=":: ">
          <WhatsappIcon size={30} round className="animate-jump" />
        </WhatsappShareButton>
        <FacebookShareButton url={'https://github.com/next-share'} hashtag={'#nextshare'}>
          <FacebookIcon size={30} round className="animate-jump" />
        </FacebookShareButton>
        <TwitterShareButton url={'https://github.com/next-share'} title={'Check this out!'}>
          <TwitterIcon size={30} round className="animate-jump" />
        </TwitterShareButton>
        <PinterestShareButton url={'https://github.com/next-share'} media={'Check this out!'}>
          <PinterestIcon size={30} round className="animate-jump" />
        </PinterestShareButton>
        <LinkedinShareButton url={'https://github.com/next-share'}>
          <LinkedinIcon size={30} round className="animate-jump" />
        </LinkedinShareButton>
        <EmailShareButton url={'https://github.com/next-share'} subject={'Check this out!'} body="body">
          <EmailIcon size={30} round className="animate-jump" />
        </EmailShareButton>
      </div>
    </>
  );
};

export default ShareModal;
