import { ShareIcon } from 'lucide-react';

 export const TeamInvite = ({ referralCode }) => {
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

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            Referral Code: {referralCode}
          </h3>
          <p className="text-gray-500 mt-1">Share with friends to earn rewards</p>
        </div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <ShareIcon size={20} />
          Share
        </button>
      </div>
    </div>
  );
};