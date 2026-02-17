import { useQuery } from "@tanstack/react-query";
import type { Todo } from "../types";

export function useTodos() {
	const todos = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: async () => {
			const response = await fetch(
				"http://localhost:8000/mock-todos?throttle=true",
			);
			const data = await response.json();
			return data;
		},
	});

	return todos;
}
