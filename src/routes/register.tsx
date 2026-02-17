import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useRegister } from "@/modules/auth/hooks/useRegister";

export const Route = createFileRoute("/register")({
    component: RouteComponent,
});

function RouteComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { mutate: submitRegister, isPending } = useRegister();

    const handleSubmitForm = (e: React.FormEvent) => {
        e.preventDefault();
        submitRegister({ email, password });
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
                            <h3>Register</h3>
                            <p>Create an account to access exclusive features!</p>
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
                                minLength={1}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" disabled={isPending} onClick={handleSubmitForm}>
                                {isPending ? "Registering..." : "Register"}
                            </button>
                        </section>
                        <section className="text-center">
                            <p>
                                Already have an account?{" "}
                                <Link to="/login">
                                    Login here
                                </Link>
                            </p>
                        </section>
                    </form>
                </div>
            </div>
        </div>
    );
}
