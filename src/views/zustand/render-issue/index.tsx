import Lang from './Lang'
import Theme from './Theme'

export default function View() {
  return (
    <div className='view-wrapper'>
      参考:
      <ul>
        <li>
          <a href='https://juejin.cn/post/7316796505129091081#heading-7' target='_blank' rel='noreferrer'>
            关于zustand的一些最佳实践
          </a>
        </li>
      </ul>
      <Lang />
      <Theme />
    </div>
  )
}
