import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { useLogin } from "@/modules/auth/hooks/useLogin";

export const Route = createFileRoute("/login")({
    ssr: false,
    loader: () => {
        const token = localStorage.getItem("Bearer");
        if (token) {
            throw redirect({ to: "/" });
        }
        return { authenticated: false };
    },
    pendingComponent: () => (
        <div className="h-screen flex items-center justify-center">
            <span>Loading...</span>
        </div>
    ),
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: submitLogin, isPending } = useLogin();

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        submitLogin({ email, password });
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 items-center rounded-xl shadow-lg">
                <div className="hidden lg:block w-full">
                    <img
                        src="https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Login"
                        className="w-full h-full object-cover rounded-l-xl"
                    />
                </div>
                <div className="w-full p-6 h-auto">
                    <form className="w-full h-full p-4 space-y-8" onSubmit={handleSubmitForm}>
                        <section className="text-center">
                            <h3>Login</h3>
                            <p>Sign in to access your account!</p>
                        </section>
                        <section className="space-y-2">
                            <input
                                type="email"
                                placeholder="email@domain.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" disabled={isPending}>
                                {isPending ? "Logging in..." : "Login"}
                            </button>
                        </section>
                        <section className="text-center">
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register">
                                    Register here
                                </Link>
                            </p>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}

