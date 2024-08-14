import { useConfigStore } from '../store/useConfigStore'

const Theme = () => {
  // 引起重复渲染
  // const { theme, setTheme } = useConfigStore()

  // 方案一
  // const theme = useConfigStore(state => state.theme)
  // const setTheme = useConfigStore(state => state.setTheme)

  // 方案二
  // const { theme, setTheme } = useConfigStore(
  //   useShallow(state => ({
  //     theme: state.theme,
  //     setTheme: state.setTheme
  //   }))
  // )

  // 方案三
  const { theme, setTheme } = useConfigStore(state => ({
    theme: state.theme,
    setTheme: state.setTheme
  }))

  console.log('theme render')

  return (
    <div>
      <div>{theme}</div>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>切换</button>
    </div>
  )
}

export default Theme
