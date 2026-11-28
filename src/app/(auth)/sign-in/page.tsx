"use client"

import { Suspense, useState, type FormEvent } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

function SignInForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()
  const registered = searchParams.get("registered") === "true"

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!email.trim() || !password) {
      setMessage("Please enter your email and password.")
      return
    }

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.")
      return
    }

    router.push("/home")
  }

  return (
    <div className="w-full max-w-md">
      <div className="border-hub-border bg-hub-surface rounded-3xl border p-7 shadow-xl shadow-hub-primary/5 sm:p-9">
        {/* Heading */}
        <div className="mb-8 text-center">
          <div className="bg-hub-primary-soft text-hub-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
            <LockKeyhole size={25} />
          </div>

          <h1 className="editorial-heading text-hub-title mt-6 text-3xl">
            Welcome back
          </h1>

          <p className="text-hub-muted mt-2 text-sm leading-6">
            Sign in to continue connecting with your community.
          </p>
        </div>
        {registered && (
          <div className="mb-5 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            Registration demo completed! You can now sign in.
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="text-hub-body mb-2 block text-sm font-semibold"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="text-hub-subtle absolute top-1/2 left-4 -translate-y-1/2"
              />

              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value)
                  setMessage("")
                }}
                required
                className="border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus:border-hub-focus focus:ring-hub-focus/15 h-12 w-full rounded-xl border pr-4 pl-11 text-sm transition outline-none hover:border-hub-primary-border focus:ring-4"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-hub-body text-sm font-semibold"
              >
                Password
              </label>

              <button
                type="button"
                onClick={() =>
                  setMessage(
                    "Password recovery is not implemented in this demo.",
                  )
                }
                className="text-hub-primary hover:text-hub-primary-hover text-xs font-semibold transition-colors"
              >
                Forgot password?
              </button>
            </div>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="text-hub-subtle absolute top-1/2 left-4 -translate-y-1/2"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setMessage("")
                }}
                required
                minLength={8}
                className="border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus:border-hub-focus focus:ring-hub-focus/15 h-12 w-full rounded-xl border pr-12 pl-11 text-sm transition outline-none hover:border-hub-primary-border focus:ring-4"
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="text-hub-subtle hover:text-hub-body absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <label className="flex cursor-pointer items-center gap-2.5">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="accent-hub-primary size-4 rounded border-hub-border-control"
            />
            <span className="text-hub-body text-sm">Remember me</span>
          </label>

          {/* Feedback */}
          {message && (
            <div
              role="status"
              aria-live="polite"
              className="border-hub-primary-border bg-hub-primary-soft text-hub-primary-deep rounded-xl border px-4 py-3 text-sm leading-6"
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-hub-primary hover:bg-hub-primary-hover focus-visible:outline-hub-focus flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold text-white shadow-lg shadow-hub-primary/15 transition hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Sign in
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Divider */}
        <div className="my-7 flex items-center gap-4">
          <div className="bg-hub-divider h-px flex-1" />
          <span className="text-hub-muted text-xs font-medium">
            CONNECT WITH CONFIDENCE
          </span>
          <div className="bg-hub-divider h-px flex-1" />
        </div>

        <div className="text-hub-muted flex items-center justify-center gap-2 text-xs">
          <ShieldCheck size={16} className="text-hub-success" />
          Your privacy matters to us.
        </div>

        {/* Sign up link */}
        <p className="text-hub-muted mt-7 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="text-hub-primary hover:text-hub-primary-hover font-semibold transition-colors"
          >
            Create an account
          </Link>
        </p>
      </div>

      <p className="text-hub-muted mt-5 text-center text-xs">
        This is a demonstration interface. No credentials are stored.
      </p>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense
      fallback={
        <div className="text-hub-muted flex min-h-[60vh] items-center justify-center text-sm">
          Loading sign in...
        </div>
      }
    >
      <SignInForm />
    </Suspense>
  )
}
