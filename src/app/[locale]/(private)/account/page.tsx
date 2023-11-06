"use client";
import dynamic from "next/dynamic";
const AvatarForm = dynamic(() => import("@/components/account/avatar-form"));
const SignOutBtn = dynamic(() => import("@/components/account/sign-out-btn"));

export default function AccountPage() {
  return (
    <div>
      <h3 className="mb-3">Account</h3>
      <AvatarForm />
      <SignOutBtn />
    </div>
  );
}
