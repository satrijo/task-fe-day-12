import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface RegisterSchema {
	email: string;
	password: string;
}

export function useRegister() {
	return useMutation({
		mutationKey: ["register"],
		mutationFn: async ({ email, password }: RegisterSchema) => {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/auth/register`,
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
				throw new Error(response?.message || "Registration failed");
			}
			return response;
		},
		onSuccess: () => {
			toast.success("Registration successful! Please log in.");
		},
		onError: (error) => {
			toast.error(error instanceof Error ? error.message : "An error occurred");
		},
	});
}
