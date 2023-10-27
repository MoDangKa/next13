"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function Form() {
  const router = useRouter();
  const [username, setUsername] = useState<undefined | string>("");
  const [password, setPassword] = useState<undefined | string>("");
  const [confirmPassword, setConfirmPassword] = useState<undefined | string>(
    ""
  );

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = await fetch("/api/login", {
      method: "post",
      body: JSON.stringify({ username, password }),
    });

    if (result.ok) {
      router.push("/feed");
    } else {
      alert("log in failed");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 p-5 max-w-xs w-full bg-slate-800 rounded-lg"
    >
      <div className="text-center">
        <h3 className="font-semibold">Sign In</h3>
      </div>

      <div className="my-3">
        <hr />
      </div>

      <div>
        <div className="flex flex-col gap-2">
          <label>Username</label>
          <input
            className="text-black p-3 border border-slate-700 rounded-lg"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            placeholder="Username"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            className="text-black p-3 border border-slate-700 rounded-lg"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />
        </div>
      </div>

      <button type="submit" className="mt-4 bg-slate-900 p-3 rounded-lg">
        Sign In
      </button>
    </form>
  );
}

export default Form;
