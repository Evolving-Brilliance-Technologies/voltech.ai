import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ErrorComponent from "@/components/Common/ErrorComponent";
import NotFound from "@/components/Common/NotFound";
import { BottomNav } from "@/components/impactmaker/layout/BottomNav";

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-[#FAFAFA] pb-20 max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
      <HeadContent />
      <Outlet />
      <BottomNav />
      <TanStackRouterDevtools position="bottom-right" />
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  ),
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ErrorComponent />,
});
