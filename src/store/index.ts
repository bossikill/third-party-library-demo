import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface IStore {
  token: string
  updateToken: (token: string) => void
}

export const useStore = create<IStore>()(
  persist(
    set => ({
      token: '',
      updateToken: token => set({ token })
    }),
    {
      // name of item in the storage (must be unique)
      name: 'fabrcjs-demo',
      // (optional) by default the 'localStorage' is used
      storage: createJSONStorage(() => sessionStorage)
      // 选择持久化的数据
      // partialize: state => ({ checkedMaterial: state.checkedMaterial })
      // 排除不需要持久化的数据
      // partialize: state =>
      //   Object.fromEntries(Object.entries(state).filter(([key]) => !['queueInGenIds', 'queueGenUrl'].includes(key)))
    }
  )
)
