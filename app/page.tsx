import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-black">
      <main className="flex flex-col items-center justify-center gap-8 px-4 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10">
            <Package className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl md:text-6xl">
            Warehouse Management
          </h1>
          <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
            Streamline your inventory, optimize operations, and manage your warehouse with ease.
          </p>
        </div>
        
        <Link href="/Login">
          <Button size="lg" className="mt-4">
            Login
          </Button>
        </Link>
        
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-zinc-500 dark:text-zinc-500">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">99.9%</span>
            <span>Uptime</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">24/7</span>
            <span>Support</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">Real-time</span>
            <span>Tracking</span>
          </div>
        </div>
      </main>
    </div>
  );
}
