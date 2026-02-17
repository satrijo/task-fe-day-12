import { useQuery } from "@tanstack/react-query";

export function useProfile() {
	return useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const res = await fetch(
				`${import.meta.env.VITE_API_URL ?? "http://localhost:8000"}/profile/me`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem("Bearer")}`,
					},
				},
			);

			const response = await res.json();
			return response;
		},
	});
}
