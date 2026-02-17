import { useMutation } from "@tanstack/react-query";
import { useNavigate, useRouter } from "@tanstack/react-router";
import toast from "react-hot-toast";

interface LoginSchema {
	email: string;
	password: string;
}

export function useLogin() {
	const redirect = useNavigate();
	const router = useRouter();
	return useMutation({
		mutationKey: ["login"],
		mutationFn: async ({ email, password }: LoginSchema) => {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/auth/login`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email,
						password,
					}),
				},
			);
			const response = await res.json();
			if (!res.ok) {
				if (response.error.name === "ZodError") {
					throw new Error(JSON.parse(response.error.message)[0].message);
				}
				throw new Error(response.error || "Login failed");
			}
			return response;
		},
		onSuccess: async (response) => {
			localStorage.setItem("Bearer", response.data.accessToken);
			await router.invalidate();
			await redirect({ to: "/" });
			toast.success("Login successful!");
		},
		onError: (error) => {
			const errorMessage =
				error instanceof Error ? error.message : "An error occurred";
			toast.error(errorMessage);
		},
	});
}
