"use client"

import { useEffect, useMemo, useState, type FormEvent } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  ArrowLeft,
  MessageCircle,
  MoreHorizontal,
  Search,
  Send,
} from "lucide-react"
import { EmptyState } from "@/components/feedback/empty-state"
import { DemoNote } from "@/components/features/shared/demo-note"
import { Avatar } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { demoPeople } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function MessagesPage() {
  const [query, setQuery] = useState("")
  const [selectedConversationId, setSelectedConversationId] = useState("")
  const [mobileThreadOpen, setMobileThreadOpen] = useState(false)
  const [draft, setDraft] = useState("")
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { state, actions } = useDemoPlatform()
  const requestedPersonId = searchParams.get("person")
  const requestedConversation = state.conversations.find(
    (conversation) => conversation.personId === requestedPersonId,
  )
  const selectedConversation =
    requestedConversation ??
    state.conversations.find(
      (conversation) => conversation.id === selectedConversationId,
    ) ??
    state.conversations[0]
  const activePerson = selectedConversation
    ? demoPeople.find((person) => person.id === selectedConversation.personId)
    : undefined
  const normalizedQuery = query.trim().toLowerCase()

  const visibleConversations = useMemo(
    () =>
      state.conversations.filter((conversation) => {
        const person = demoPeople.find(
          (candidate) => candidate.id === conversation.personId,
        )
        const latestMessage =
          conversation.messages[conversation.messages.length - 1]?.text ?? ""
        return `${person?.name ?? ""} ${person?.role ?? ""} ${latestMessage}`
          .toLowerCase()
          .includes(normalizedQuery)
      }),
    [normalizedQuery, state.conversations],
  )

  useEffect(() => {
    if (requestedConversation?.unreadCount) {
      actions.markConversationRead(requestedConversation.id)
    }
  }, [actions, requestedConversation])

  function chooseConversation(conversationId: string) {
    const conversation = state.conversations.find(
      (item) => item.id === conversationId,
    )
    if (!conversation) return
    setSelectedConversationId(conversationId)
    setMobileThreadOpen(true)
    actions.markConversationRead(conversationId)
    const params = new URLSearchParams(searchParams.toString())
    params.set("person", conversation.personId)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  function returnToConversationList() {
    setMobileThreadOpen(false)
    const params = new URLSearchParams(searchParams.toString())
    params.delete("person")
    const suffix = params.toString()
    router.replace(suffix ? `${pathname}?${suffix}` : pathname, {
      scroll: false,
    })
  }

  function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!selectedConversation || !draft.trim()) return
    actions.sendMessage(selectedConversation.id, draft)
    setDraft("")
  }

  const showThread = mobileThreadOpen || Boolean(requestedConversation)

  return (
    <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-5">
      <header className="flex items-end justify-between gap-4">
        <div>
          <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.16em] uppercase">
            A note between people
          </p>
          <h1 className="text-hub-title mt-1.5 text-2xl font-semibold tracking-[-0.045em] sm:text-[2rem]">
            Messages
          </h1>
          <p className="text-hub-muted mt-2 text-sm leading-6">
            Conversation previews with people in your demo network.
          </p>
        </div>
        <span className="text-hub-subtle hidden items-center gap-1.5 text-[10px] sm:inline-flex">
          <span className="size-1.5 rounded-full bg-[#aabf88]" />
          Local demo
        </span>
      </header>

      <div className="border-hub-border grid min-h-[520px] overflow-hidden rounded-2xl border bg-white md:grid-cols-[minmax(245px,0.78fr)_minmax(0,1.5fr)]">
        <aside
          aria-label="Conversation list"
          className={`border-hub-divider min-w-0 flex-col border-r ${
            showThread ? "hidden md:flex" : "flex"
          }`}
        >
          <div className="border-hub-divider border-b p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-hub-ink text-sm font-semibold">
                Conversations
              </h2>
              <span className="bg-hub-primary-soft text-hub-primary rounded-full px-2 py-1 text-[9px] font-semibold">
                {state.conversations.length}
              </span>
            </div>
            <label className="relative mt-3 block">
              <span className="sr-only">Search conversations</span>
              <Search
                size={14}
                className="text-hub-subtle pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
                aria-hidden="true"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search conversations..."
                className="border-hub-border-subtle focus:border-hub-primary-light focus:ring-hub-accent/10 h-9 w-full rounded-lg border bg-[#fbfaf8] pr-3 pl-9 text-[11px] transition-colors outline-none focus:ring-3 motion-reduce:transition-none"
              />
            </label>
          </div>
          <ul className="min-h-0 flex-1 overflow-y-auto">
            {visibleConversations.map((conversation) => {
              const person = demoPeople.find(
                (candidate) => candidate.id === conversation.personId,
              )
              if (!person) return null
              const latestMessage =
                conversation.messages[conversation.messages.length - 1]
              const isSelected =
                selectedConversation?.id === conversation.id ||
                requestedConversation?.id === conversation.id
              return (
                <li key={conversation.id}>
                  <button
                    type="button"
                    aria-current={isSelected ? "true" : undefined}
                    onClick={() => chooseConversation(conversation.id)}
                    className={`focus-visible:outline-inset focus-visible:outline-hub-focus flex w-full items-center gap-3 border-b border-[#f1efea] p-4 text-left transition-colors hover:bg-[#faf9fc] focus-visible:outline-2 motion-reduce:transition-none ${
                      isSelected ? "bg-hub-primary-wash" : ""
                    }`}
                  >
                    <span className="relative">
                      <Avatar
                        name={person.name}
                        size="md"
                        className={person.color}
                      />
                      {conversation.unreadCount > 0 && (
                        <span
                          className="bg-hub-focus absolute -top-0.5 -right-0.5 size-2.5 rounded-full border-2 border-white"
                          aria-label={`${conversation.unreadCount} unread messages`}
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="text-hub-ink truncate text-xs font-semibold">
                          {person.name}
                        </span>
                        <span className="text-hub-placeholder shrink-0 text-[9px]">
                          {latestMessage?.createdAt}
                        </span>
                      </span>
                      <span className="text-hub-muted mt-1 block truncate text-[10px]">
                        {latestMessage?.senderId === "alex" ? "You: " : ""}
                        {latestMessage?.text ?? "Start a conversation"}
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
            {visibleConversations.length === 0 && (
              <li className="p-4">
                <p className="text-hub-muted text-xs">
                  No conversations match that search.
                </p>
              </li>
            )}
          </ul>
        </aside>

        <section
          aria-label={
            activePerson
              ? `Conversation with ${activePerson.name}`
              : "Conversation"
          }
          className={`min-w-0 flex-col ${
            showThread ? "flex" : "hidden md:flex"
          }`}
        >
          {selectedConversation && activePerson ? (
            <>
              <header className="border-hub-divider flex items-center gap-3 border-b px-4 py-3.5 sm:px-5">
                <button
                  type="button"
                  aria-label="Back to conversations"
                  onClick={returnToConversationList}
                  className="text-hub-muted hover:bg-hub-neutral-hover flex size-9 items-center justify-center rounded-full md:hidden"
                >
                  <ArrowLeft size={17} aria-hidden="true" />
                </button>
                <Avatar
                  name={activePerson.name}
                  size="md"
                  className={activePerson.color}
                />
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/profile/${activePerson.id}`}
                    className="text-hub-ink hover:text-hub-primary truncate text-sm font-semibold"
                  >
                    {activePerson.name}
                  </Link>
                  <p className="text-hub-subtle mt-0.5 text-[10px]">
                    Conversation preview · messages stay in this demo
                  </p>
                </div>
                <Link
                  href={`/profile/${activePerson.id}`}
                  aria-label={`View ${activePerson.name}'s profile`}
                  className="text-hub-muted hover:bg-hub-neutral-hover hover:text-hub-primary flex size-9 items-center justify-center rounded-full"
                >
                  <MoreHorizontal size={18} aria-hidden="true" />
                </Link>
              </header>

              <div
                aria-live="polite"
                aria-label="Message history"
                className="flex min-h-[340px] flex-1 flex-col gap-3 overflow-y-auto bg-[#fbfaf8] p-4 sm:p-6"
              >
                <p className="text-hub-placeholder mb-2 text-center text-[9px] font-medium tracking-[0.12em] uppercase">
                  A little history
                </p>
                {selectedConversation.messages.map((message) => {
                  const isOwnMessage = message.senderId === "alex"
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwnMessage ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[72%] ${
                          isOwnMessage ? "items-end" : "items-start"
                        } flex flex-col`}
                      >
                        <p
                          className={`rounded-2xl px-3.5 py-2.5 text-xs leading-5 ${
                            isOwnMessage
                              ? "bg-hub-primary rounded-br-md text-white"
                              : "border-hub-border-subtle text-hub-body rounded-bl-md border bg-white"
                          }`}
                        >
                          {message.text}
                        </p>
                        <span className="text-hub-placeholder mt-1 px-1 text-[9px]">
                          {message.createdAt}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <form
                onSubmit={sendMessage}
                className="border-hub-divider border-t bg-white p-3 sm:p-4"
              >
                <label htmlFor="message-draft" className="sr-only">
                  Write a message
                </label>
                <div className="flex items-end gap-2">
                  <Textarea
                    id="message-draft"
                    rows={1}
                    maxLength={500}
                    value={draft}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={`Write to ${activePerson.name}...`}
                    className="border-hub-border-control bg-hub-input-surface focus-visible:border-hub-primary-light focus-visible:ring-hub-accent/10 min-h-11 resize-none rounded-xl py-3 text-xs shadow-none"
                  />
                  <button
                    type="submit"
                    disabled={!draft.trim()}
                    aria-label="Add message to local demo"
                    className="bg-hub-primary hover:bg-hub-primary-hover flex size-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 motion-reduce:transition-none"
                  >
                    <Send size={16} aria-hidden="true" />
                  </button>
                </div>
                <p className="text-hub-placeholder mt-2 text-[9px]">
                  Demo only · This message is not delivered to another person.
                </p>
              </form>
            </>
          ) : (
            <div className="flex min-h-[520px] items-center justify-center p-5">
              <EmptyState
                title="A conversation starts with a hello"
                description="Choose a conversation from the list to see its sample messages."
                icon={<MessageCircle className="size-6" />}
              />
            </div>
          )}
        </section>
      </div>

      <DemoNote>
        Messages are in-memory examples only; nothing is delivered, stored, or
        shared with another person.
      </DemoNote>
    </div>
  )
}
