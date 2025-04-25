import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi, getCurrentUser } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: async () => {
      const user = await getCurrentUser();

      if (!user) {
        toast.error("Something went wrong. Try again.");
        return;
      }

      queryClient.setQueryData(["user"], user);
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Email or password are incorrect");
    },
  });

  return { isLogin, login };
}
