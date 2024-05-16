import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    message: String;
    data: {
      accestoken: String;
      user: {
        id: Number;
        firstName: String;
        lastName: String;
        Avatar: String;
        birthDay: String;
        Sexual: boolean;
      };
    };
  }
}
import { JWT } from "next-auth/jwt";
declare module "next-auth/jwt" {
  interface JWT {
    message: String;
    data: {
      accestoken: String;
      user: {
        id: Number;
        firstName: String;
        lastName: String;
        Avatar: String;
        birthDay: String;
        Sexual: boolean;
      };
    };
  }
}
