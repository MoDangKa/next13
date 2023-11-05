"use client";

import AvatarForm from "@/components/account/avatar-form";
import SignOutBtn from "@/components/account/sign-out-btn";

export default function AccountPage() {
  return (
    <div>
      <h3 className="mb-3">Account</h3>
      <AvatarForm />
      <SignOutBtn />
    </div>
  );
}
