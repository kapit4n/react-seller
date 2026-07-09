import {create} from 'zustand'

interface SidebarState {
  isOpen: boolean
  toggle: () => void
  setOpen: (open: boolean) => void
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({isOpen: !s.isOpen})),
  setOpen: (open) => set({isOpen: open}),
}))
