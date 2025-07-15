import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { useEffect, useState } from "react";

const FriendCard = ({ friend }) => {
  const [hasUnseenMessages, setHasUnseenMessages] = useState(false);

  // Listen for custom event from ChatPage
  useEffect(() => {
    const handleUnseen = (e) => {
      if (e.detail.userId === friend._id) {
        setHasUnseenMessages(e.detail.status);
      }
    };
    window.addEventListener("message-status", handleUnseen);
    return () => window.removeEventListener("message-status", handleUnseen);
  }, [friend._id]);

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <h3 className="font-semibold truncate">{friend.fullName}</h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>

        <Link to={`/chat/${friend._id}`} className="btn btn-outline w-full relative">
          Message
          {hasUnseenMessages && (
            <span className="absolute top-1 right-2 text-red-500 text-lg">🔴</span>
          )}
        </Link>
      </div>
    </div>
  );
};
export default FriendCard;

// eslint-disable-next-line react-refresh/only-export-components
export function getLanguageFlag(language) {
  if (!language) return null;
  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];
  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
