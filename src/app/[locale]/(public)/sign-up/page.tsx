"use client";
import dynamic from "next/dynamic";
const SignUpForm = dynamic(() => import("@/components/forms/sign-up-form"));

export default function SignUp() {
  return <SignUpForm />;
}
