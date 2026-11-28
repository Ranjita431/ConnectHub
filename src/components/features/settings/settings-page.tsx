"use client"

import { useState, type FormEvent } from "react"
import { Check, LockKeyhole, UserRound, Bell } from "lucide-react"
import { DemoNote } from "@/components/features/shared/demo-note"
import { PageHeader } from "@/components/features/shared/page-header"
import { Avatar } from "@/components/ui/avatar"
import { useDemoPlatform } from "@/lib/demo-platform-state"
import type { DemoPlatformState, DemoPreferences } from "@/lib/demo-platform"

type SettingsTab = "profile" | "notifications" | "privacy"
type EmailPreference = Exclude<keyof DemoPreferences, "profileVisibility">

const emailPreferences: {
  key: EmailPreference
  label: string
  description: string
}[] = [
  {
    key: "connectionEmails",
    label: "Connection activity",
    description: "A note when someone sends or accepts a connection request.",
  },
  {
    key: "communityDigestEmails",
    label: "Community digest",
    description: "A small roundup of conversations from communities you join.",
  },
  {
    key: "messageEmails",
    label: "Message updates",
    description: "An email when a new message arrives in your inbox.",
  },
  {
    key: "weeklyRecapEmails",
    label: "Weekly recap",
    description: "A weekly look at activity across your ConnectHub circles.",
  },
]

const tabItems: {
  id: SettingsTab
  label: string
  icon: typeof UserRound
}[] = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy", icon: LockKeyhole },
]

function SettingRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="border-hub-divider flex cursor-pointer items-start justify-between gap-5 border-b py-4 last:border-b-0">
      <span>
        <span className="text-hub-heading block text-sm font-medium">
          {label}
        </span>
        <span className="text-hub-muted-strong mt-1 block max-w-lg text-xs leading-5">
          {description}
        </span>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="accent-hub-primary focus-visible:outline-hub-focus mt-1 size-4 shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2"
      />
    </label>
  )
}

function getTabDescription(state: DemoPlatformState, tab: SettingsTab) {
  if (tab === "profile") {
    return `Manage the details shown on ${state.profile.name.split(" ")[0]}'s local profile preview.`
  }
  if (tab === "notifications") {
    return "Choose which email updates you'd like to receive in this demo."
  }
  return "Set a simple visibility preference for your profile."
}

export function SettingsPage() {
  const { state, actions } = useDemoPlatform()
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile")
  const [name, setName] = useState(state.profile.name)
  const [email, setEmail] = useState(state.profile.email)
  const [bio, setBio] = useState(state.profile.bio)
  const [interests, setInterests] = useState(state.profile.interests.join(", "))
  const [status, setStatus] = useState("")
  const activeTabInfo = tabItems.find((tab) => tab.id === activeTab)!

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const parsedInterests = Array.from(
      new Set(
        interests
          .split(",")
          .map((interest) => interest.trim())
          .filter(Boolean),
      ),
    )
    actions.updateProfile({
      name: name.trim(),
      email: email.trim(),
      bio: bio.trim(),
      interests: parsedInterests,
    })
    setStatus("Your demo profile has been updated.")
  }

  function updateEmailPreference(key: EmailPreference, value: boolean) {
    actions.updatePreferences({ [key]: value })
  }

  return (
    <div className="mx-auto w-full max-w-[1080px] space-y-6">
      <PageHeader
        eyebrow="Your space, your way"
        title="Settings"
        description="A few thoughtful choices to make this space feel more like yours."
      />

      <div className="grid gap-5 lg:grid-cols-[230px_minmax(0,1fr)]">
        <nav
          aria-label="Settings sections"
          className="border-hub-border bg-hub-surface flex gap-1 overflow-x-auto rounded-2xl border p-2 lg:flex-col lg:self-start"
        >
          {tabItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              aria-current={activeTab === id ? "page" : undefined}
              onClick={() => {
                setActiveTab(id)
                setStatus("")
              }}
              className={`focus-visible:outline-hub-focus inline-flex min-h-10 shrink-0 items-center gap-3 rounded-xl px-3 text-left text-xs font-medium transition-colors focus-visible:outline-2 motion-reduce:transition-none ${
                activeTab === id
                  ? "text-hub-primary bg-hub-primary-soft"
                  : "text-hub-muted hover:text-hub-heading hover:bg-[#f8f7f4]"
              }`}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </button>
          ))}
        </nav>

        <section
          aria-labelledby="settings-panel-title"
          className="border-hub-border bg-hub-surface min-w-0 overflow-hidden rounded-2xl border"
        >
          <div className="border-hub-divider border-b px-5 py-5 sm:px-7">
            <h2
              id="settings-panel-title"
              className="text-hub-ink text-base font-semibold"
            >
              {activeTabInfo.label}
            </h2>
            <p className="text-hub-muted-strong mt-1.5 text-xs leading-5">
              {getTabDescription(state, activeTab)}
            </p>
          </div>

          {activeTab === "profile" && (
            <form onSubmit={saveProfile} className="space-y-5 p-5 sm:p-7">
              <div className="bg-hub-surface-warm flex items-center gap-4 rounded-xl p-4">
                <Avatar
                  name={state.profile.name}
                  size="lg"
                  className="bg-hub-avatar-lavender text-hub-avatar-lavender-ink"
                />
                <div>
                  <p className="text-hub-heading text-sm font-semibold">
                    Your profile
                  </p>
                  <p className="text-hub-muted-strong mt-1 text-[11px] leading-5">
                    Profile photos are not editable in this demo.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="text-hub-body-muted space-y-1.5 text-xs font-medium">
                  Display name
                  <input
                    required
                    minLength={2}
                    maxLength={60}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="border-hub-border-control bg-hub-input-surface text-hub-ink focus:border-hub-primary-light focus:ring-hub-accent/10 h-10 w-full rounded-lg border px-3 text-sm font-normal outline-none focus:ring-3"
                  />
                </label>
                <label className="text-hub-body-muted space-y-1.5 text-xs font-medium">
                  Email address
                  <input
                    required
                    type="email"
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="border-hub-border-control bg-hub-input-surface text-hub-ink focus:border-hub-primary-light focus:ring-hub-accent/10 h-10 w-full rounded-lg border px-3 text-sm font-normal outline-none focus:ring-3"
                  />
                </label>
              </div>

              <label className="text-hub-body-muted block space-y-1.5 text-xs font-medium">
                A little about you
                <textarea
                  rows={3}
                  maxLength={240}
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  className="border-hub-border-control bg-hub-input-surface text-hub-ink focus:border-hub-primary-light focus:ring-hub-accent/10 w-full resize-y rounded-lg border px-3 py-2.5 text-sm leading-6 font-normal outline-none focus:ring-3"
                />
              </label>

              <label className="text-hub-body-muted block space-y-1.5 text-xs font-medium">
                Interests
                <input
                  value={interests}
                  onChange={(event) => setInterests(event.target.value)}
                  placeholder="Design, gardening, books"
                  className="border-hub-border-control bg-hub-input-surface text-hub-ink focus:border-hub-primary-light focus:ring-hub-accent/10 h-10 w-full rounded-lg border px-3 text-sm font-normal outline-none focus:ring-3"
                />
                <span className="text-hub-placeholder block text-[10px] font-normal">
                  Separate interests with commas.
                </span>
              </label>

              <div className="border-hub-divider flex flex-wrap items-center gap-3 border-t pt-5">
                <button
                  type="submit"
                  className="bg-hub-primary hover:bg-hub-primary-hover focus-visible:outline-hub-primary inline-flex min-h-10 items-center gap-2 rounded-full px-5 text-xs font-semibold text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
                >
                  <Check size={14} aria-hidden="true" />
                  Save profile
                </button>
                <span aria-live="polite" className="text-xs text-[#526c42]">
                  {status}
                </span>
              </div>
            </form>
          )}

          {activeTab === "notifications" && (
            <div className="px-5 py-2 sm:px-7">
              {emailPreferences.map((preference) => (
                <SettingRow
                  key={preference.key}
                  label={preference.label}
                  description={preference.description}
                  checked={state.preferences[preference.key]}
                  onChange={(value) =>
                    updateEmailPreference(preference.key, value)
                  }
                />
              ))}
            </div>
          )}

          {activeTab === "privacy" && (
            <fieldset className="space-y-3 p-5 sm:p-7">
              <legend className="text-hub-heading text-sm font-medium">
                Who can see your profile?
              </legend>
              <label className="border-hub-divider hover:bg-hub-surface-warm flex cursor-pointer items-start gap-3 rounded-xl border p-4">
                <input
                  type="radio"
                  name="profile-visibility"
                  value="public"
                  checked={state.preferences.profileVisibility === "public"}
                  onChange={() =>
                    actions.updatePreferences({ profileVisibility: "public" })
                  }
                  className="accent-hub-primary focus-visible:outline-hub-focus mt-0.5 size-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                />
                <span>
                  <span className="text-hub-heading block text-sm font-medium">
                    Everyone
                  </span>
                  <span className="text-hub-muted-strong mt-1 block text-xs leading-5">
                    Set this as your intended visibility; the demo does not
                    apply it to profile access.
                  </span>
                </span>
              </label>
              <label className="border-hub-divider hover:bg-hub-surface-warm flex cursor-pointer items-start gap-3 rounded-xl border p-4">
                <input
                  type="radio"
                  name="profile-visibility"
                  value="connections"
                  checked={
                    state.preferences.profileVisibility === "connections"
                  }
                  onChange={() =>
                    actions.updatePreferences({
                      profileVisibility: "connections",
                    })
                  }
                  className="accent-hub-primary focus-visible:outline-hub-focus mt-0.5 size-4 focus-visible:outline-2 focus-visible:outline-offset-2"
                />
                <span>
                  <span className="text-hub-heading block text-sm font-medium">
                    Connections only
                  </span>
                  <span className="text-hub-muted-strong mt-1 block text-xs leading-5">
                    Set connections-only as your intended visibility; profile
                    access is unchanged in this demo.
                  </span>
                </span>
              </label>
              <p className="text-hub-placeholder pt-2 text-[10px] leading-5">
                This preference is stored in the current page session only. It
                does not enforce access controls or change what other demo
                profiles can see.
              </p>
            </fieldset>
          )}
        </section>
      </div>

      <DemoNote>
        Settings update the in-memory demo experience only; no account or email
        service is connected.
      </DemoNote>
    </div>
  )
}
