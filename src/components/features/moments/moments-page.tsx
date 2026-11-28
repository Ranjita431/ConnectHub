"use client"

import { useRef, useState } from "react"
import {
  Heart,
  MessageCircle,
  Pause,
  Play,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react"
import { Avatar } from "@/components/ui/avatar"
import { demoMoments, demoPeople } from "@/lib/demo-platform"

export function MomentsPage() {
  const [muted, setMuted] = useState(true)
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [liked, setLiked] = useState<Set<string>>(new Set())
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  async function togglePlayback(id: string) {
    const video = videoRefs.current[id]
    if (!video) return
    if (!video.paused) {
      video.pause()
      setPlayingId(null)
      return
    }
    await video.play()
    setPlayingId(id)
  }

  return (
    <div className="mx-auto w-full max-w-[720px]">
      <header className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-hub-primary-mid text-[10px] font-semibold tracking-[0.16em] uppercase">
            Short stories
          </p>
          <h1 className="editorial-heading mt-1 text-2xl text-hub-title">
            Moments
          </h1>
        </div>
        <span className="text-[10px] text-hub-muted">Demo video feed</span>
      </header>

      <div className="h-[calc(100vh-160px)] snap-y snap-mandatory overflow-y-auto rounded-[2rem] bg-hub-night">
        {demoMoments.map((moment) => {
          const creator = demoPeople.find((person) => person.id === moment.creatorId)
          if (!creator) return null
          const isPlaying = playingId === moment.id
          const isLiked = liked.has(moment.id)
          return (
            <article
              key={moment.id}
              className="relative h-full snap-start snap-always overflow-hidden"
            >
              <video
                ref={(element) => {
                  videoRefs.current[moment.id] = element
                }}
                className="size-full object-cover"
                src={moment.videoUrl}
                poster={moment.posterUrl}
                muted={muted}
                loop
                playsInline
                preload="metadata"
                onPause={() => setPlayingId((current) => current === moment.id ? null : current)}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black/75 to-transparent" />
              <button
                type="button"
                onClick={() => togglePlayback(moment.id)}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white opacity-90"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} fill="currentColor" />}
              </button>

              <button
                type="button"
                onClick={() => setMuted((current) => !current)}
                aria-label={muted ? "Turn sound on" : "Mute sound"}
                className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-black/35 text-white"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>

              <div className="absolute bottom-5 left-5 right-20 text-white">
                <div className="mb-3 flex items-center gap-2">
                  <Avatar name={creator.name} size="sm" className={creator.color} />
                  <span className="text-xs font-semibold">@{creator.name.toLowerCase().replace(" ", "")}</span>
                </div>
                <p className="max-w-md text-sm leading-6">{moment.caption}</p>
              </div>

              <div className="absolute bottom-5 right-4 flex flex-col items-center gap-4 text-white">
                <button
                  type="button"
                  aria-pressed={isLiked}
                  onClick={() =>
                    setLiked((current) => {
                      const next = new Set(current)
                      if (next.has(moment.id)) next.delete(moment.id)
                      else next.add(moment.id)
                      return next
                    })
                  }
                  className="flex flex-col items-center gap-1"
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-black/35">
                    <Heart size={20} fill={isLiked ? "currentColor" : "none"} className={isLiked ? "text-[#ff8b9e]" : ""} />
                  </span>
                  <span className="text-[10px]">{moment.likeCount + (isLiked ? 1 : 0)}</span>
                </button>
                <button type="button" className="flex flex-col items-center gap-1" aria-label="View comments">
                  <span className="flex size-11 items-center justify-center rounded-full bg-black/35">
                    <MessageCircle size={20} />
                  </span>
                  <span className="text-[10px]">{moment.commentCount}</span>
                </button>
                <button type="button" className="flex flex-col items-center" aria-label="Share moment">
                  <span className="flex size-11 items-center justify-center rounded-full bg-black/35">
                    <Share2 size={20} />
                  </span>
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
