// pages/api/auth/[...nextauth].ts
import { Backend_url } from "@/app/lib/Constant";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const loginInfo = {
          userName: username,
          Password: password,
        };
        const res = await fetch(Backend_url + "/auth/login", {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 401) {
          return null;
        }
        const user = await res.json();

        console.log(user.data.accestoken);
        return user;
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };
      return token;
    },
    async session({ token, session }) {
      session.data = token.data;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
