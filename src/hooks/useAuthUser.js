import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  return {
    isLoading,
    isSuccess,
    authUser: data?.user || null,
  };
};

export default useAuthUser;
