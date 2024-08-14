import { useConfigStore } from '../store/useConfigStore'

const Lang = () => {
  // 引起重复渲染
  // const { lang, setLang } = useConfigStore()

  // 方案一
  // const lang = useConfigStore(state => state.lang)
  // const setLang = useConfigStore(state => state.setLang)

  // 方案二
  // const { lang, setLang } = useConfigStore(
  //   useShallow(state => ({
  //     lang: state.lang,
  //     setLang: state.setLang
  //   }))
  // )

  // 方案三
  const { lang, setLang } = useConfigStore(state => ({
    lang: state.lang,
    setLang: state.setLang
  }))

  console.log('lang render...')

  return (
    <div>
      <div>{lang}</div>
      <button onClick={() => setLang(lang === 'zh-CN' ? 'en-US' : 'zh-CN')}>切换</button>
    </div>
  )
}

export default Lang
