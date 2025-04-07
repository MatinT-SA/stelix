import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();

  const { isLoading: isLogin, mutate: login } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),

    onSuccess: (user) => {
      console.log(user);
      navigate("/dashboard");
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Email or password are incorrect");
    },
  });

  return { isLogin, login };
}
