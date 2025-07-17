import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const {
    data = {},
    isLoading = false,
    isSuccess = false,
    isError = false,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: getAuthUser,
    retry: false,
  });

  const safeUser = data?.user ?? null;

  return {
    isLoading,
    isSuccess,
    isError,
    error,
    authUser: safeUser,
  };
};

export default useAuthUser;
