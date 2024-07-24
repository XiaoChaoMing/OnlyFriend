// components/AuthenticatedLayout.tsx
"use client"; // Đảm bảo rằng component này chỉ chạy trên client-side

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"; // Đảm bảo import đúng từ next/navigation
import { ReactNode, useEffect } from "react";
import LoadingPage from "./layout/LoadingPage";
import { usePathname } from "next/navigation"; // Import usePathname

interface Props {
  children: ReactNode;
}

const AuthenticatedLayout = ({ children }: Props) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (status === "loading") return;
    if (!session && !isAuthRoute(pathname)) {
      router.push("/sign-in");
    }
  }, [session, status, pathname, router]);

  const isAuthRoute = (path: string) => {
    return path === "/sign-in" || path === "/sign-up";
  };

  if (status === "loading") {
    return <LoadingPage />;
  }

  return <>{children}</>;
};

export default AuthenticatedLayout;
