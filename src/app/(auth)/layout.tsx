import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={``}>{children}</body>
      </html>
    </ClerkProvider>
  );
}
