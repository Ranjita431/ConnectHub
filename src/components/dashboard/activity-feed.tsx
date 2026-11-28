"use client"

import { ChangeEvent, FormEvent, useState } from "react"
import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Heart,
  ImagePlus,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  X,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { demoPeople, demoStories } from "@/lib/demo-platform"
import { useDemoPlatform } from "@/lib/demo-platform-state"

export function ActivityFeed() {
  const { state, actions } = useDemoPlatform()
  const [storyIndex, setStoryIndex] = useState<number | null>(null)
  const [caption, setCaption] = useState("")
  const [previews, setPreviews] = useState<string[]>([])
  const [commentPostId, setCommentPostId] = useState<string | null>(null)
  const [comment, setComment] = useState("")

  function handleImages(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []).slice(0, 4)
    if (!files.length) return
    const nextPreviews = files.map((file) => URL.createObjectURL(file))
    setPreviews((current) => [...current, ...nextPreviews].slice(0, 4))
  }

  function submitPost(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!caption.trim() && previews.length === 0) return
    actions.createSocialPost(caption, previews)
    setCaption("")
    setPreviews([])
  }

  function submitComment(postId: string) {
    if (!comment.trim()) return
    actions.addSocialPostComment(postId)
    setComment("")
  }

  const activeStory =
    storyIndex === null ? null : demoStories[storyIndex % demoStories.length]

  return (
    <section aria-labelledby="feed-title" className="min-w-0 space-y-4">
      <div className="overflow-hidden rounded-2xl border border-hub-border bg-white p-3.5">
        <div className="flex gap-3 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => document.getElementById("post-caption")?.focus()}
            className="flex shrink-0 flex-col items-center gap-1.5 text-[10px] font-medium text-hub-muted"
          >
            <span className="relative flex size-16 items-center justify-center rounded-full border-2 border-dashed border-hub-primary-light bg-hub-primary-wash">
              <Avatar
                name={state.profile.name}
                size="lg"
                className="border-2 border-white bg-hub-avatar-lavender text-hub-avatar-lavender-ink"
              />
              <span className="absolute right-0 bottom-0 flex size-5 items-center justify-center rounded-full bg-hub-primary text-white ring-2 ring-white">
                +
              </span>
            </span>
            Your story
          </button>
          {demoStories.map((story, index) => {
            const person = demoPeople.find((item) => item.id === story.personId)
            if (!person) return null
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => setStoryIndex(index)}
                className="flex shrink-0 flex-col items-center gap-1.5 text-[10px] font-medium text-hub-heading"
              >
                <span className="rounded-full bg-[linear-gradient(135deg,#8e7398,#bd7d88)] p-[3px]">
                  <span className="block rounded-full bg-white p-[2px]">
                    <span
                      className="block size-14 overflow-hidden rounded-full"
                      role="img"
                      aria-label={`${person.name}'s story`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={story.imageUrl} alt="" className="size-full object-cover" />
                    </span>
                  </span>
                </span>
                <span className="max-w-16 truncate">{person.name.split(" ")[0]}</span>
              </button>
            )
          })}
        </div>
      </div>

      <form
        onSubmit={submitPost}
        className="rounded-2xl border border-hub-border bg-white p-4"
      >
        <div className="flex items-start gap-3">
          <Avatar
            name={state.profile.name}
            size="md"
            className="bg-hub-avatar-lavender text-hub-avatar-lavender-ink"
          />
          <div className="min-w-0 flex-1">
            <textarea
              id="post-caption"
              value={caption}
              onChange={(event) => setCaption(event.target.value)}
              maxLength={280}
              rows={2}
              placeholder="Share an idea, moment, or photo..."
              className="min-h-12 w-full resize-none border-0 bg-transparent px-0 text-sm text-hub-ink outline-none placeholder:text-hub-placeholder"
            />
            {previews.length > 0 && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                {previews.map((preview, index) => (
                  <div key={preview} className="relative h-28 overflow-hidden rounded-xl bg-hub-surface-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={preview} alt={`Upload preview ${index + 1}`} className="size-full object-cover" />
                    <button
                      type="button"
                      aria-label={`Remove upload ${index + 1}`}
                      onClick={() => setPreviews((current) => current.filter((item) => item !== preview))}
                      className="absolute right-2 top-2 flex size-7 items-center justify-center rounded-full bg-black/60 text-white"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-2 flex items-center justify-between border-t border-hub-divider-soft pt-3">
              <label className="inline-flex min-h-9 cursor-pointer items-center gap-2 rounded-full px-3 text-xs font-semibold text-hub-primary hover:bg-hub-primary-wash">
                <ImagePlus size={16} />
                Photo
                <input type="file" accept="image/*" multiple onChange={handleImages} className="sr-only" />
              </label>
              <button
                type="submit"
                disabled={!caption.trim() && previews.length === 0}
                className="inline-flex min-h-9 items-center gap-2 rounded-full bg-hub-primary px-4 text-xs font-semibold text-white disabled:opacity-40"
              >
                <Send size={14} />
                Share
              </button>
            </div>
          </div>
        </div>
      </form>

      <div>
        <h2 id="feed-title" className="sr-only">Social feed</h2>
        {state.socialPosts.map((post) => {
          const person =
            post.authorId === "alex"
              ? null
              : demoPeople.find((item) => item.id === post.authorId)
          const authorName = post.authorId === "alex" ? state.profile.name : person?.name ?? "ConnectHub member"
          const authorColor = person?.color ?? "bg-hub-avatar-lavender text-hub-avatar-lavender-ink"
          return (
            <article key={post.id} className="mt-4 overflow-hidden rounded-2xl border border-hub-border bg-white">
              <header className="flex items-center gap-3 px-4 py-3.5">
                <Avatar name={authorName} size="md" className={authorColor} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-hub-ink">{authorName}</p>
                  <p className="mt-0.5 text-[10px] text-hub-muted">
                    {post.location ? `${post.location} · ` : ""}{post.createdAt}
                  </p>
                </div>
                <button type="button" aria-label="Post options" className="flex size-9 items-center justify-center rounded-full text-hub-muted hover:bg-hub-neutral-hover">
                  <MoreHorizontal size={18} />
                </button>
              </header>

              {post.message && (
                <p className="px-4 pb-3 text-[14px] leading-6 text-hub-body">{post.message}</p>
              )}
              {post.imageUrls.length > 0 && (
                <div className={`grid gap-0.5 ${post.imageUrls.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {post.imageUrls.map((url, index) => (
                    <div key={url} className={`overflow-hidden bg-hub-surface-soft ${post.imageUrls.length === 1 ? "aspect-[4/3]" : "aspect-[4/5]"}`}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={url} alt={post.message ? `Photo shared by ${authorName}: ${post.message.slice(0, 60)}` : `Photo shared by ${authorName}`} className="size-full object-cover" />
                      {index === 3 && <span className="sr-only">Additional upload</span>}
                    </div>
                  ))}
                </div>
              )}
              {post.kind === "text" && (
                <div className="mx-4 mb-4 aspect-[16/7] rounded-xl bg-[linear-gradient(135deg,#342e3b,#806b8e)] p-6 text-white">
                  <p className="max-w-md text-xl font-semibold leading-8 tracking-tight">{post.message}</p>
                </div>
              )}

              <div className="flex items-center gap-1 px-3 py-2">
                <button
                  type="button"
                  aria-pressed={post.likedByMe}
                  onClick={() => actions.toggleSocialPostLike(post.id)}
                  className={`flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-semibold ${post.likedByMe ? "text-hub-danger" : "text-hub-muted"}`}
                >
                  <Heart size={18} fill={post.likedByMe ? "currentColor" : "none"} />
                  {post.likeCount}
                </button>
                <button
                  type="button"
                  onClick={() => setCommentPostId((current) => current === post.id ? null : post.id)}
                  className="flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-semibold text-hub-muted"
                >
                  <MessageCircle size={18} />
                  {post.commentCount}
                </button>
                <button type="button" aria-label="Share post" className="flex size-9 items-center justify-center rounded-full text-hub-muted">
                  <Share2 size={18} />
                </button>
                <button
                  type="button"
                  aria-pressed={post.savedByMe}
                  onClick={() => actions.toggleSocialPostSave(post.id)}
                  className={`ml-auto flex size-9 items-center justify-center rounded-full ${post.savedByMe ? "text-hub-primary" : "text-hub-muted"}`}
                  aria-label={post.savedByMe ? "Unsave post" : "Save post"}
                >
                  <Bookmark size={18} fill={post.savedByMe ? "currentColor" : "none"} />
                </button>
              </div>

              {commentPostId === post.id && (
                <div className="flex gap-2 border-t border-hub-divider-soft px-4 py-3">
                  <input
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") submitComment(post.id)
                    }}
                    placeholder="Add a comment..."
                    className="h-9 min-w-0 flex-1 rounded-full border border-hub-border-control bg-hub-input-surface px-3 text-xs outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => submitComment(post.id)}
                    className="flex size-9 items-center justify-center rounded-full bg-hub-primary text-white"
                    aria-label="Send comment"
                  >
                    <Send size={14} />
                  </button>
                </div>
              )}
            </article>
          )
        })}
      </div>

      {activeStory && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Story viewer"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[#17131f]/95 p-3"
        >
          <div className="relative h-[min(82vh,720px)] w-full max-w-[390px] overflow-hidden rounded-2xl bg-[#292634]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={activeStory.imageUrl} alt="" className="size-full object-cover" />
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
            <div className="absolute left-3 right-3 top-3 flex gap-1">
              {demoStories.map((story, index) => (
                <span key={story.id} className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/35">
                  <span className={`block h-full bg-white ${index <= (storyIndex ?? 0) ? "w-full" : "w-0"}`} />
                </span>
              ))}
            </div>
            <div className="absolute left-4 right-14 top-7 flex items-center gap-2 text-white">
              {(() => {
                const person = demoPeople.find((item) => item.id === activeStory.personId)
                return person ? <Avatar name={person.name} size="sm" className={person.color} /> : null
              })()}
              <span className="text-xs font-semibold">{demoPeople.find((item) => item.id === activeStory.personId)?.name}</span>
              <span className="text-[10px] text-white/70">now</span>
            </div>
            <button type="button" aria-label="Close story" onClick={() => setStoryIndex(null)} className="absolute right-3 top-6 flex size-9 items-center justify-center rounded-full text-white">
              <X size={20} />
            </button>
            <p className="absolute bottom-6 left-5 right-5 text-sm font-semibold leading-6 text-white drop-shadow">{activeStory.caption}</p>
            <button type="button" aria-label="Previous story" onClick={() => setStoryIndex((storyIndex ?? 0) === 0 ? demoStories.length - 1 : (storyIndex ?? 0) - 1)} className="absolute left-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white">
              <ChevronLeft size={20} />
            </button>
            <button type="button" aria-label="Next story" onClick={() => setStoryIndex(((storyIndex ?? 0) + 1) % demoStories.length)} className="absolute right-2 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-white">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
