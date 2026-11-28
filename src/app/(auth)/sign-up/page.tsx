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
      <div className="border-hub-border bg-hub-surface rounded-3xl border p-7 shadow-xl shadow-hub-primary/5 sm:p-9">
        {/* Heading */}
        <div className="mb-7 text-center">
          <div className="bg-hub-primary-soft text-hub-primary mx-auto flex size-14 items-center justify-center rounded-2xl">
            <UserRound size={25} />
          </div>

          <h1 className="editorial-heading text-hub-title mt-5 text-3xl">
            Create your account
          </h1>

          <p className="text-hub-muted mt-2 text-sm leading-6">
            Join ConnectHub and start building meaningful connections.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full name */}
          <div>
            <label
              htmlFor="fullName"
              className="text-hub-body mb-2 block text-sm font-semibold"
            >
              Full name
            </label>

            <div className="relative">
              <UserRound
                size={18}
                className="text-hub-subtle absolute top-1/2 left-4 -translate-y-1/2"
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
                className="border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus:border-hub-focus focus:ring-hub-focus/15 h-12 w-full rounded-xl border pr-4 pl-11 text-sm transition outline-none hover:border-hub-primary-border focus:ring-4"
              />
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="text-hub-body mb-2 block text-sm font-semibold"
            >
              Password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="text-hub-subtle absolute top-1/2 left-4 -translate-y-1/2"
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

            <p className="text-hub-muted mt-2 text-xs">
              Use at least 8 characters.
            </p>
          </div>

          {/* Confirm password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-hub-body mb-2 block text-sm font-semibold"
            >
              Confirm password
            </label>

            <div className="relative">
              <LockKeyhole
                size={18}
                className="text-hub-subtle absolute top-1/2 left-4 -translate-y-1/2"
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
                className="border-hub-border-control bg-hub-input-surface text-hub-ink placeholder:text-hub-placeholder focus:border-hub-focus focus:ring-hub-focus/15 h-12 w-full rounded-xl border pr-12 pl-11 text-sm transition outline-none hover:border-hub-primary-border focus:ring-4"
              />

              <button
                type="button"
                aria-label={
                  showConfirmPassword
                    ? "Hide confirm password"
                    : "Show confirm password"
                }
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-hub-subtle hover:text-hub-body absolute top-1/2 right-4 -translate-y-1/2 transition-colors"
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
              className="accent-hub-primary border-hub-border-control mt-0.5 size-4 shrink-0 rounded"
            />

            <span className="text-hub-muted text-xs leading-5">
              I agree to the{" "}
              <span className="text-hub-primary font-semibold">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="text-hub-primary font-semibold">
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
            Create account
            <ArrowRight size={17} />
          </button>
        </form>

        {/* Privacy note */}
        <div className="text-hub-muted mt-6 flex items-center justify-center gap-2 text-xs">
          <ShieldCheck size={16} className="text-hub-success" />
          Your information stays private in this demo.
        </div>

        {/* Sign in link */}
        <p className="text-hub-muted mt-6 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="text-hub-primary hover:text-hub-primary-hover font-semibold transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>

      <p className="text-hub-muted mt-5 text-center text-xs">
        Demonstration only. No credentials are stored and no account is created.
      </p>
    </div>
  )
}
