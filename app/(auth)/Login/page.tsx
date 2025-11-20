'use client';
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface UserCredentials {
  email: string,
  password: string
}

export default function LoginPage() {

  const [user, setUser] = useState<UserCredentials>({
    email: "",
    password: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({user});
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center gap-6 rounded-lg border bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10">
            <Package className="w-8 h-8 text-primary" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Welcome Back
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Sign in to your warehouse management account
            </p>
          </div>

          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="name@company.com"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                onChange={(e) => setUser(prev => ({ ...prev, email: e.target.value }))}
                value={user.email}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
                onChange={(e) => setUser(prev => ({ ...prev, password: e.target.value }))}
                value={user.password}
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="rounded border-zinc-300 dark:border-zinc-700"
                />
                <span className="text-zinc-600 dark:text-zinc-400">
                  Remember me
                </span>
              </label>
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign In
            </Button>
          </form>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:underline font-medium"
            >
              Sign up
            </Link>
          </p>

          <Link
            href="/"
            className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
