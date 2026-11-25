"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  UserRound,
  ShieldCheck,
} from "lucide-react"

export default function SignUpPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (fullName.trim().length < 2) {
      setMessage("Please enter your full name.")
      return
    }

    if (password.length < 8) {
      setMessage("Your password must contain at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setMessage("Your passwords do not match.")
      return
    }

    if (!acceptedTerms) {
      setMessage("Please accept the terms and conditions to continue.")
      return
    }

    router.push("/sign-in?registered=true")
  }

  return (
    <div className="w-full max-w-md">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-xl shadow-indigo-100/40 sm:p-9">
        {/* Heading */}
        <div className="mb-7 text-center">
          <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <UserRound size={25} />
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
            Create your account
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Join ConnectHub and start building meaningful connections.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Full name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
              />

              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value)
                  setMessage("")
                }}
                required
                minLength={2}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-11 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Email address
            </label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
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
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-4 pl-11 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
              />

              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Create a password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value)
                  setMessage("")
                }}
                required
                minLength={8}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-12 pl-11 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                aria-label={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="mt-2 text-xs text-slate-400">
              Use at least 8 characters.
            </p>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Confirm password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-slate-400"
              />

              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value)
                  setMessage("")
                }}
                required
                minLength={8}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white pr-12 pl-11 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
              />

              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute top-1/2 right-4 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex cursor-pointer items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(event) => {
                setAcceptedTerms(event.target.checked)
                setMessage("")
              }}
              className="mt-0.5 size-4 shrink-0 rounded border-slate-300 accent-indigo-600 focus:ring-indigo-500"
            />

            <span className="text-xs leading-5 text-slate-500">
              I agree to the{" "}
              <span className="font-semibold text-indigo-600">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="font-semibold text-indigo-600">
                Privacy Policy
              </span>
              .
            </span>
          </label>

          {/* Feedback */}
          {message && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm leading-6 text-indigo-700"
            >
              {message}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create account
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Privacy note */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
          <ShieldCheck size={16} className="text-emerald-600" />
          Your information stays private in this demo.
        </div>

        {/* Sign in link */}
        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-semibold text-indigo-600 transition hover:text-indigo-700"
          >
            Sign in
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-xs text-slate-400">
        Demonstration only. No credentials are stored and no account is created.
      </p>
    </div>
  )
}
