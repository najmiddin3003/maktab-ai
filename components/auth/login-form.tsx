"use client";

import { DEMO_PASSWORD, DEMO_USERNAME } from "@/lib/auth";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rawFrom = searchParams.get("from") || "/";
  const from =
    rawFrom.startsWith("/login") || !rawFrom.startsWith("/") ? "/" : rawFrom;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Kirish muvaffaqiyatsiz");
        return;
      }
      router.replace(from);
      router.refresh();
    } catch {
      setError("Tarmoq xatosi");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden overflow-y-auto bg-background bg-gradient-to-br from-slate-100 via-teal-50/50 to-slate-100 px-4 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="absolute right-4 top-4 z-20 w-40 sm:right-8 sm:top-8">
        <ThemeToggle />
      </div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-500/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-1/4 h-64 w-64 rounded-full bg-teal-500/15 blur-3xl dark:bg-teal-400/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500 text-lg font-bold text-white shadow-lg shadow-teal-500/30"
          >
            MA
          </motion.div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Maktab AI</h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Tizimga kirish</p>
        </div>

        <motion.form
          onSubmit={onSubmit}
          className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/40 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-black/50"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.3 }}
        >
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Login
            <input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-teal-500/20 focus:border-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="admin"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Parol
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-teal-500/20 focus:border-teal-500 focus:ring-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              placeholder="••••••••"
            />
          </label>

          {error ? (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-3 text-sm font-medium text-red-600 dark:text-red-400"
            >
              {error}
            </motion.p>
          ) : null}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="mt-6 w-full rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white shadow-md shadow-teal-500/25 transition-colors hover:bg-teal-600 disabled:opacity-60"
          >
            {loading ? "Kutilmoqda…" : "Kirish"}
          </motion.button>

          <p className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
            Demo: <span className="font-mono font-medium text-slate-800 dark:text-slate-300">{DEMO_USERNAME}</span> /{" "}
            <span className="font-mono font-medium text-slate-800 dark:text-slate-300">{DEMO_PASSWORD}</span>
          </p>
        </motion.form>

        <p className="mt-8 text-center text-xs text-slate-600 dark:text-slate-400">
          Maktab monitoring tizimi
        </p>
      </motion.div>
    </div>
  );
}
