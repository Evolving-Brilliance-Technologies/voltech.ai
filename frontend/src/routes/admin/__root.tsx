import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ErrorComponent from "@/components/Common/ErrorComponent";
import NotFound from "@/components/Common/NotFound";

export const Route = createRootRoute({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
      <div className="hidden md:block">
        <TanStackRouterDevtools position="top-right" />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-right" />
      </div>
    </>
  ),
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <ErrorComponent />,
});
