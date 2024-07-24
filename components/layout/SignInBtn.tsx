"use client";
import React from "react";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignInBtn = () => {
  const { data: session } = useSession();
  const userId = session?.data.user.id;
  const router = useRouter();
  const redirectToPersonalPage = () => {
    console.log(userId);
    router.push(`/personal/${userId}`);
  };
  if (session && session.user)
    return (
      <div
        onClick={redirectToPersonalPage}
        className="flex gap-4 ml-auto text-center"
      >
        <p className="text-sky-600 flex items-center">
          {session.data.user.firstName + " "}

          {session.data.user.lastName}
        </p>
        <Link
          href={"/api/auth/signout"}
          className="flex gap-4 ml-auto text-red-600 items-center"
        >
          Sign Out
        </Link>
      </div>
    );
  return (
    <div>
      <div className="flex gap-4 ml-auto">
        <Link
          href={"/api/auth/signin"}
          className="flex gap-4 ml-auto text-red-600  items-center"
        >
          Sign in
        </Link>
        <Link
          href={"/api/auth/signup"}
          className="flex gap-4 ml-auto text-red-600  items-center"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
};

SignInBtn.propTypes = {};

export default SignInBtn;
