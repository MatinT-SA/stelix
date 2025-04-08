import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const naivagate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLoggingOut, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries();
      naivagate("/login");
    },
  });

  return { isLoggingOut, logout };
}
