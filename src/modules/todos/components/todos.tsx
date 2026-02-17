import { useTodos } from "../hooks/useTodos";

export function Todos() {
    const { data, isLoading, isError, error } = useTodos();
    return (
        <div className="mt-8">
            <div className="mt-4 bg-primary-shade p-4 rounded-lg shadow-md w-full min-w-md ">
                {isLoading ? (
                    <p>Loading...</p>
                ) : isError ? (
                    <p>Error: {(error as Error).message}</p>
                ) : (
                    <ul>
                        {data?.map((todo) => (
                            <li key={todo.id} className="mb-2">
                                <div className="flex gap-4 items-center border-b border-gray-300 py-2 justify-center w-full">
                                    <div className={`w-6 h-6 rounded-full ${todo.completed ? "bg-primary" : "bg-gray-400"}`} />
                                    {todo.title} - {todo.completed ? "Completed" : "Pending"}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
