import { useNavigate } from "@tanstack/react-router";
import { useProfile } from "../hooks/useProfile";

export function Profile() {
    const { data, isLoading, isError, error } = useProfile();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("Bearer");
        navigate({ to: "/login" });
    };

    return (
        <>
            {isLoading ? (
                <span>Loading...</span>
            ) : isError ? (
                <span>Error: {(error as Error).message}</span>
            ) : (
                <div className="mt-4 bg-primary-shade p-4 rounded-lg shadow-md w-full max-w-md ">
                    <h1 className="text-xl font-bold">Welcome, {data?.data.email}</h1>
                    <button type="button" className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </>
    );
}
