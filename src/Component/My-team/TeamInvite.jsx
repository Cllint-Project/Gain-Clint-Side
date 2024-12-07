/* eslint-disable react/prop-types */
import {CopyIcon,  MessageCircle,  ShareIcon } from 'lucide-react';
import { useState } from 'react';

 export const TeamInvite = ({ referralCode }) => {
  const whatsappGroupLink = 'https://chat.whatsapp.com/EdnBAh5pxDXD15sQkCFZBE'

  const [message, setMessage] = useState("");

  const handleShare = async () => {
    try {
      await navigator.share({
        title: 'Join my team!',
        text: `Use my referral code: ${referralCode}`,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    setMessage("Copied to clipboard!"); 
    setTimeout(() => setMessage(""), 2000);
  }

  const handleWhatsAppJoin = () => {
    window.open(whatsappGroupLink, '_blank');
  };
  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          {/* Copy and Referral Code */}
          <div className='flex items-center gap-6'>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                রেফারেল কোড: <span className='bg-green-100 text-green-800 px-2 py-1 rounded-2xl'>{referralCode}</span>
              </h3>
            </div>
            <div>
              <button
                onClick={handleCopy}
                className="btn-sm bg-gray-200 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                <CopyIcon size={20} />
              </button>
            </div>
          </div>
          <p className="text-gray-500 mt-1">বন্ধুদের সাথে শেয়ার করুন</p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <ShareIcon size={20} />
            Share
          </button>

          {/* WhatsApp Group Join Button */}
          <button
            onClick={handleWhatsAppJoin}
            className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle size={20} />
            WhatsApp Group
          </button>
        </div>
      </div>

      {/* Message bar */}
      {message && (
        <div className="absolute top-[40px] left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-lg shadow-md transition-opacity">
          {message}
        </div>
      )}
    </div>
  );
};