import {create} from 'zustand'
import {persist} from 'zustand/middleware'

type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'light',
      setTheme: (theme) => set({theme}),
      toggleTheme: () => set((state) => ({theme: state.theme === 'dark' ? 'light' : 'dark'})),
    }),
    {name: 'theme-store'},
  ),
)
