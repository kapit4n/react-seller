import {create} from 'zustand';

interface AIAssistantState {
  isOpen: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useAIAssistantStore = create<AIAssistantState>((set) => ({
  isOpen: false,
  toggle: () => set((s) => ({isOpen: !s.isOpen})),
  open: () => set({isOpen: true}),
  close: () => set({isOpen: false}),
}));
