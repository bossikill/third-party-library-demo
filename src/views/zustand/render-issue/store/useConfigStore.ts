import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

interface IStore {
  theme: string
  lang: string
  setTheme: (theme: string) => void
  setLang: (lang: string) => void
}

export const useConfigStore = createWithEqualityFn<IStore>()(
  persist(
    devtools(set => ({
      theme: 'light',
      lang: 'zh-CN',
      setLang: (lang: string) => set({ lang }, false, 'setLang'),
      setTheme: (theme: string) => set({ theme }, false, 'setTheme')
    })),
    {
      // name of item in the storage (must be unique)
      name: 'third-party-library-demo_render-issue',
      // (optional) by default the 'localStorage' is used
      storage: createJSONStorage(() => localStorage)
      // 选择持久化的数据
      // partialize: state => ({ checkedMaterial: state.checkedMaterial })
      // 排除不需要持久化的数据
      // partialize: state =>
      //   Object.fromEntries(Object.entries(state).filter(([key]) => !['queueInGenIds', 'queueGenUrl'].includes(key)))
    }
  ),
  shallow
)
