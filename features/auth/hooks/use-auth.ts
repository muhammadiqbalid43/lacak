import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { RegisterFormData } from "../types/register-schema";
import { loginUser, logoutUser, registerUser } from "../services/auth-services";
import { toast } from "sonner";

export function useRegister() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RegisterFormData) => registerUser(data),
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error("Register failed", {
        description:
          error.message || "Unable to create account. Please try again",
        duration: 5000,
      });
    },
  });
}

export function useLogin() {
  const router = useRouter();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      router.push("/dashboard");
    },
    onError: (error: Error) => {
      toast.error("Login failed", {
        description:
          error.message || "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      queryClient.invalidateQueries({ queryKey: ["protected-data"] });

      router.push("/login");
    },
    onError: (error: Error) => {
      toast.error("Logut failed", {
        description:
          error.message || "An unexpected error occurred. Please try again.",
        duration: 5000,
      });
    },
  });
}
