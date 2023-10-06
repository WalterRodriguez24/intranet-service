import { headers } from "next/headers";
import AuthProvider from "@/components/AuthProvider";

import type { Session } from "next-auth";
import type { ReactNode } from "react";

import "./globals.css";
import { Poppins, Philosopher } from "next/font/google";

const sanSerif = Poppins({
  weight: ["200", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
  variable: "--font-sans",
});

const serif = Philosopher({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata = {
  title: "JCU Intranet",
  description: "Intranet de la empresa JCU",
};

export const revalidate = 0;

async function getSession(cookie: string): Promise<Session> {
  const response = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/session`, {
    headers: {
      cookie,
    },
  });

  const session = await response.json();

  return Object.keys(session).length > 0 ? session : null;
}

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const fontsClasses = `${sanSerif.variable} ${serif.variable}`;

  const session = await getSession(headers().get("cookie") ?? "");

  return (
    <html lang="es">
      <body className={fontsClasses}>
        <AuthProvider session={session}>{children}</AuthProvider>
      </body>
    </html>
  );
}
