"use client";
import dynamic from "next/dynamic";
const SignInForm = dynamic(() => import("@/components/forms/sign-in-form"));

export default function SignIn() {
  return <SignInForm />;
}
