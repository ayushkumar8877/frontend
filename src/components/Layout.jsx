import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { useQuery } from "@tanstack/react-query";
import { getStreamToken } from "../lib/api";
import useAuthUser from "../hooks/useAuthUser";
import useUnseenStore from "../store/unseenStore";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const STREAM_API_KEY = import.meta.env.VITE_STREAM_API_KEY;

const client = StreamChat.getInstance(STREAM_API_KEY); // ✅ Move client outside component (singleton)

const Layout = ({ children, showSidebar = false }) => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const pathname = location.pathname;

  const { data: tokenData } = useQuery({
    queryKey: ["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser,
  });

  const incrementUnseen = useUnseenStore.getState().incrementUnseen;

  useEffect(() => {
    if (!authUser?._id || !tokenData?.token) return;

    let cleanupFn;

    const connectAndListen = async () => {
      try {
        if (!client.userID) {
          await client.connectUser(
            {
              id: authUser._id,
              name: authUser.fullName,
              image: authUser.profilePic,
            },
            tokenData.token
          );
        }

        const handleNewMessage = (event) => {
          const senderId = event.user?.id;
          const currentChatId = pathname.split("/").pop();

          if (
            senderId &&
            senderId !== authUser._id &&
            currentChatId !== senderId
          ) {
            incrementUnseen(senderId);
          }
        };

        client.on("message.new", handleNewMessage);

        // Cleanup function
        cleanupFn = () => {
          client.off("message.new", handleNewMessage);
        };
      } catch (err) {
        console.error("Stream connect error:", err);
      }
    };

    connectAndListen();

    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, [
    authUser._id,
    tokenData?.token,
    pathname,
    authUser?.fullName,
    authUser?.profilePic,
    incrementUnseen,
  ]);

  return (
    <div className="min-h-screen">
      <div className="flex">
        {showSidebar && <Sidebar />}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
