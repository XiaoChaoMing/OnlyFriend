"use client";
import React from "react";
import PropTypes from "prop-types";
import { useSession } from "next-auth/react";
import Link from "next/link";

const SignInBtn = () => {
  const { data: session } = useSession();
  if (session && session.user)
    return (
      <div className="flex gap-4 ml-auto">
        <p className="text-sky-600">
          {session.data.user.firstName}
          {session.data.user.lastName}
        </p>
        <Link
          href={"/api/auth/signout"}
          className="flex gap-4 ml-auto text-red-600"
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
          className="flex gap-4 ml-auto text-red-600"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
};

SignInBtn.propTypes = {};

export default SignInBtn;
