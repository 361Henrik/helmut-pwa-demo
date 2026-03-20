import { Outlet } from "react-router-dom";
import { BottomTabBar } from "./BottomTabBar";

export function AppShell() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <main className="flex-1 pb-20">
        <Outlet />
      </main>
      <BottomTabBar />
    </div>
  );
}
