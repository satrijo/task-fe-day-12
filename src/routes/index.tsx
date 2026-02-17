import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Profile } from "@/modules/profile/components.tsx/profile";
import { useProfile } from "@/modules/profile/hooks/useProfile";
import { Todos } from "@/modules/todos/components/todos";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const navigate = useNavigate();
  const { data } = useProfile();
  const isAuthenticated = localStorage.getItem("Bearer") !== null;

  if (!data && !isAuthenticated) {
    navigate({ to: "/login" });
    return null;
  }
  return (
    <section className="h-screen flex flex-col justify-center items-center">
      <Profile />
      <Todos />
    </section>
  );
}
