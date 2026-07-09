import {Outlet} from 'react-router-dom'
import {Sidebar} from './Sidebar'
import {Header} from './Header'
import {ChatPanel, FloatingButton, useAIAssistantStore} from '@/features/ai-sales-assistant'

export function AppLayout() {
  const isAssistantOpen = useAIAssistantStore((s) => s.isOpen)
  const toggleAssistant = useAIAssistantStore((s) => s.toggle)

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="hidden md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>

      {/* AI Assistant floating button */}
      <div className="fixed bottom-4 right-4 z-40">
        <FloatingButton isOpen={isAssistantOpen} onClick={toggleAssistant} />
      </div>

      {/* AI Assistant panel */}
      {isAssistantOpen && (
        <div className="fixed inset-y-0 right-0 z-30 w-full max-w-md shadow-2xl animate-in slide-in-from-right">
          <ChatPanel onClose={toggleAssistant} />
        </div>
      )}
    </div>
  )
}
