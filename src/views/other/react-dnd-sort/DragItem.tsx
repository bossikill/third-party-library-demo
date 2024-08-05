import { useDrag } from 'ahooks'
import classNames from 'classnames'
import { useRef } from 'react'
import styles from './index.module.less'

export default function View(props: any) {
  const { data, changeSourceNode, updateSelectedData, selectedData, index, targetIndex, ghostPosition, reset } = props

  const dragRef = useRef(null)

  useDrag(data, dragRef, {
    onDragStart: (event: React.DragEvent) => {
      // 修改样式
      const target = event.target as HTMLElement
      target.classList.add(styles.moving)
      changeSourceNode(event.target)
    },
    onDragEnd: (event: React.DragEvent) => {
      // 恢复样式
      const target = event.target as HTMLElement
      target.classList.remove(styles.moving)
      reset()
    }
  })

  const handleClick = (e: any, data: any) => {
    updateSelectedData(e, data)
  }

  const itemClass = () => {
    const ghost = ghostPosition === '上' ? styles.ghostUp : styles.ghostDown
    return classNames(
      'mt-1 w-20 border-2 border-solid p-2 text-center',
      selectedData.includes(data) ? styles.active : '',
      targetIndex === index ? ghost : ''
    )
  }

  return (
    <div ref={dragRef} className={itemClass()} onClick={e => handleClick(e, data)} data-id={data}>
      {`box-${data}`}
    </div>
  )
}
