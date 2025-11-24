"use client";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";
import { useEffect, useCallback, useTransition, useState } from "react";
import { signup } from "../action";
import { signupSchema } from "@/lib/validation/auth";

export default function SignUpPage() {
  const searchParams = useSearchParams();
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const message = searchParams.get("message");
    const error = searchParams.get("error");
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [searchParams]);

  const handleFocus = useCallback((field: string) => {
    setErrors((prev) => ({ ...prev, [field]: false }));
  }, []);

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const data = {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      company: String(fd.get("company") || "").trim(),
      password: String(fd.get("password") || ""),
      confirmPassword: String(fd.get("confirmPassword") || ""),
      terms: fd.get("terms") === "on",
    };

    const result = signupSchema.safeParse(data);
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

    // Clear errors on successful validation
    setErrors({});

    // Build FormData for server action (exclude confirmPassword / terms)
    const serverFD = new FormData();
    serverFD.set("name", data.name);
    serverFD.set("email", data.email);
    serverFD.set("company", data.company);
    serverFD.set("password", data.password);

    startTransition(() => {
      signup(serverFD);
    });
  }, []);

  // Base class that's always the same
  const baseInputClass =
    "w-full rounded-md border bg-white px-3 py-2 text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-2 dark:bg-zinc-900 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 focus:ring-primary";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black py-12">
      <Toaster position="top-left" />
      <div className="w-full max-w-md px-4">
        <div className="flex flex-col items-center gap-6 rounded-lg border bg-white p-8 shadow-lg dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10">
            <Package className="w-8 h-8 text-primary" />
          </div>

          <div className="text-center">
            <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              Create Account
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
              Get started with your work management system
            </p>
          </div>

          <form className="w-full space-y-4" onSubmit={onSubmit} noValidate>
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
                onFocus={() => handleFocus("name")}
                className={baseInputClass}
                style={errors.name ? { borderColor: "#ef4444" } : undefined}
              />
            </div>

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
                htmlFor="company"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Company Name
              </label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Acme Inc."
                autoComplete="organization"
                onFocus={() => handleFocus("company")}
                className={baseInputClass}
                style={errors.company ? { borderColor: "#ef4444" } : undefined}
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
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                onFocus={() => handleFocus("password")}
                className={baseInputClass}
                style={errors.password ? { borderColor: "#ef4444" } : undefined}
              />
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Min 8 chars, upper, lower, number.
              </p>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-50"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
                autoComplete="new-password"
                onFocus={() => handleFocus("confirmPassword")}
                className={baseInputClass}
                style={
                  errors.confirmPassword
                    ? { borderColor: "#ef4444" }
                    : undefined
                }
              />
            </div>

            <div className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                id="terms"
                name="terms"
                onFocus={() => handleFocus("terms")}
                className="mt-0.5 rounded border-zinc-300 dark:border-zinc-700"
                style={errors.terms ? { borderColor: "#ef4444" } : undefined}
              />
              <label
                htmlFor="terms"
                className="text-zinc-600 dark:text-zinc-400"
              >
                I agree to the{" "}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={pending}
            >
              {pending ? "Creating..." : "Create Account"}
            </Button>
          </form>

          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/Login"
              className="text-primary hover:underline font-medium"
            >
              Sign in
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
