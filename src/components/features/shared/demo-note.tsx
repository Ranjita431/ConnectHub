export function DemoNote({ children }: { children?: string }) {
  return (
    <p className="text-hub-subtle text-[10px] leading-5">
      Demo mode ·{" "}
      {children ??
        "Changes stay in this session and are not sent to a backend."}
    </p>
  )
}
