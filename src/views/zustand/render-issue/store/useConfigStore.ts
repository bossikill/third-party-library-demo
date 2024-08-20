import { devtools } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

// 没有持久化的版本

interface IStore {
  theme: string
  lang: string
  setTheme: (theme: string) => void
  setLang: (lang: string) => void
}

export const useConfigStore = createWithEqualityFn<IStore>()(
  devtools(set => ({
    theme: 'light',
    lang: 'zh-CN',
    setLang: (lang: string) => set({ lang }, false, 'setLang'),
    setTheme: (theme: string) => set({ theme }, false, 'setTheme')
  })),
  shallow
)
