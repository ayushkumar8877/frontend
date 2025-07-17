/* eslint-disable react-hooks/rules-of-hooks */
import { Link } from "react-router-dom";
import { LANGUAGE_TO_FLAG } from "../constants";
import useUnseenStore from "../store/unseenStore";

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

const FriendCard = ({ friend }) => {
  if (!friend) return null;

  const unseenMap = useUnseenStore((state) => state.unseenMap);
  const unseenCount = unseenMap[friend._id] || 0;

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12 relative">
            <img
              src={friend.profilePic || "/default-avatar.png"}
              alt={friend.fullName || "User"}
              className="rounded-full w-full h-full object-cover"
            />

            {/* 🔵 Unseen message badge */}
            {unseenCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-purple-500 text-black text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                {unseenCount > 4 ? "4+" : unseenCount}
              </span>
            )}

            {/* 🟢 Green dot for online user */}
            {friend.online && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>

          <h3 className="font-semibold truncate">
            {friend.fullName || "Unnamed"}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage || "Unknown"}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage || "Unknown"}
          </span>
        </div>

        <Link
          to={`/chat/${friend._id}`}
          className="btn btn-outline w-full relative"
        >
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;
