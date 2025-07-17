import useAuthUser from "../hooks/useAuthUser";
import { getFriends } from "../lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FriendsPage = () => {
  const { authUser, isLoading: userLoading, isSuccess } = useAuthUser();

  const {
    data: friends,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["friends", authUser?._id],
    queryFn: () => getFriends(authUser._id),
    enabled: isSuccess,
  });

  if (userLoading) return <p className="p-4">Loading user info...</p>;
  if (!authUser) return <p className="p-4">Please log in to view friends.</p>;
  if (isLoading) return <p className="p-4">Loading friends...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load friends.</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Your Friends</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {!friends || friends.length === 0 ? (
          <p>No friends added yet.</p>
        ) : (
          friends.map((friend) => (
            <div
              key={friend._id}
              className="bg-base-200 rounded-xl p-5 border border-base-300 flex flex-col items-center"
            >
              {/* Avatar with online dot */}
              <div className="relative">
                <img
                  src={friend.profilePic}
                  alt={friend.fullName}
                  className="w-20 h-20 rounded-full mb-3"
                />
                {friend.online && (
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>

              {/* Name */}
              <div className="relative flex items-center justify-center">
                <h2 className="text-xl font-semibold">{friend.fullName}</h2>
              </div>

              {/* Language info */}
              <div className="flex gap-2 my-2">
                <span className="badge badge-success">
                  Native: {friend.nativeLanguage}
                </span>
                <span className="badge badge-info">
                  Learning: {friend.learningLanguage}
                </span>
              </div>

              {/* Message button */}
              <Link
                to={`/chat/${friend._id}`}
                className="btn btn-outline btn-primary w-full mt-3"
              >
                Message
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FriendsPage;
