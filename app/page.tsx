import { Button } from "@/components/ui/button";
import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
            <CheckSquare className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
            Task Manager
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            Organize your tasks, boost productivity, and get things done
            efficiently.
          </p>
        </div>

        <Link href="/Login">
          <Button size="lg" className="mt-4">
            Get Started
          </Button>
        </Link>

        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-zinc-500 dark:text-zinc-500">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Simple
            </span>
            <span>Interface</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Sync
            </span>
            <span>Anywhere</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
              Smart
            </span>
            <span>Organization</span>
          </div>
        </div>
      </main>
    </div>
  );
}
