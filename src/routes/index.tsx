import { createFileRoute, redirect } from "@tanstack/react-router";
import { Profile } from "@/modules/profile/components.tsx/profile";
import { Todos } from "@/modules/todos/components/todos";

export const Route = createFileRoute("/")({
  ssr: false,
  loader: () => {
    const token = localStorage.getItem("Bearer");
    if (!token) {
      throw redirect({ to: "/login" });
    }
    return { authenticated: true };
  },
  pendingComponent: () => (
    <div className="h-screen flex items-center justify-center">
      <span>Loading...</span>
    </div>
  ),
  component: IndexPage,
});

function IndexPage() {
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <Profile />
      <Todos />
    </section>
  );
}
