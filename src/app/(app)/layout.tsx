import { Suspense } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { AppHeader } from "@/components/layout/app-header"
import { MobileNavigation } from "@/components/layout/mobile-navigation"
import { DemoPlatformProvider } from "@/lib/demo-platform-state"

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <DemoPlatformProvider>
      <div className="flex min-h-screen bg-hub-canvas">
        <Suspense fallback={<div className="hidden w-64 shrink-0 lg:block" />}>
          <AppSidebar />
        </Suspense>

        <div className="flex min-w-0 flex-1 flex-col">
          <AppHeader />
          <main className="min-w-0 flex-1 px-4 py-6 pb-24 sm:px-8 lg:pb-8">
            {children}
          </main>
        </div>

        <Suspense fallback={null}>
          <MobileNavigation />
        </Suspense>
      </div>
    </DemoPlatformProvider>
  )
}
