"use client";
import { Button } from "@/components/ui/button";
import { Package, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useTransition } from "react";
import { loginSchema } from "@/lib/validation/auth";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { login } from "../action";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const message = searchParams.get("message");
    const error = searchParams.get("error");
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [searchParams]);

  const handleFocus = useCallback((field: string) => {
    setErrors((prev) => ({ ...prev, [field]: false }));
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const data = {
      email: String(fd.get("email") || "").trim(),
      password: String(fd.get("password") || ""),
    };

    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Record<string, boolean> = {};
      result.error.issues.forEach((err) => {
        toast.error(err.message);
        if (err.path[0]) {
          fieldErrors[String(err.path[0])] = true;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    const serverFD = new FormData();
    serverFD.set("email", data.email);
    serverFD.set("password", data.password);

    startTransition(() => {
      login(serverFD);
    });
  }, []);

  const baseInputClass =
    "w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-900 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 focus:ring-primary";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <Toaster position="top-left" />
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
              Sign in to your work management account
            </p>
          </div>

          <form className="w-full space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@company.com"
                autoComplete="email"
                onFocus={() => handleFocus("email")}
                className={baseInputClass}
                style={errors.email ? { borderColor: "#ef4444" } : undefined}
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  onFocus={() => handleFocus("password")}
                  className={baseInputClass}
                  style={
                    errors.password ? { borderColor: "#ef4444" } : undefined
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
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

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={pending}
            >
              {pending ? "Signing in..." : "Sign In"}
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
