import { useDrop } from 'ahooks'
import { useRef, useState } from 'react'
import DragItem from './DragItem'

const INIT_DATA = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
type IGhostPosition = '上' | '下' | ''

export default function View() {
  const [data, setData] = useState(INIT_DATA)
  const [selectedData, setSelectedData] = useState([1, 2])
  const [targetIndex, setTargetIndex] = useState(null)
  const [ghostPosition, setGhostPosition] = useState<IGhostPosition>('')

  const dropRef = useRef(null)
  // 用来记录当前拖拽的是哪个元素
  const sourceNode = useRef(null)

  useDrop(dropRef, {
    onDom: (content: string, event: any) => {
      if (event.target == dropRef.current || event.target == sourceNode.current) return
      // console.log(event, content)

      const sourceId = +content
      const targetId = event.target.dataset.id

      let newData = data.slice()
      // 移动的项目
      const moveItem = newData.filter(ele => {
        if ((selectedData.includes(sourceId) && selectedData.includes(ele)) || ele === sourceId) {
          return true
        }
      })
      // 过滤掉移动的项目后
      newData = newData.filter(ele => {
        if (!(selectedData.includes(sourceId) && selectedData.includes(ele)) && ele !== sourceId) {
          return true
        }
      })

      let calcTargetIndex = newData.findIndex(ele => ele == targetId)
      if (ghostPosition === '下') {
        calcTargetIndex = calcTargetIndex + 1
      }

      newData.splice(calcTargetIndex, 0, ...moveItem)
      setData(newData)

      // 重置
      reset()
    },
    onDragOver: (event: React.DragEvent) => {
      if (event.target == dropRef.current || event.target == sourceNode.current) return
      const children = [...dropRef.current.children]
      const targetIndex = children.indexOf(event.target)

      const { offsetY } = event as any
      const { offsetHeight } = event.target as HTMLElement
      if (offsetY < offsetHeight / 2) {
        setGhostPosition('上')
      } else {
        setGhostPosition('下')
      }

      setTargetIndex(targetIndex)
    },
    onDragLeave: (event: React.DragEvent) => {
      console.log(event)
    }
  })

  const handleChangeSourceNode = (target: any) => {
    sourceNode.current = target
  }

  const updateSelectedData = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, itemData: any) => {
    const newSelectedData = selectedData.slice()
    const dataIndex = selectedData.findIndex(ele => {
      if (ele === itemData) {
        return true
      }
    })

    if (event.shiftKey) {
      if (newSelectedData.length === 0) {
        newSelectedData.push(itemData)
      } else if (dataIndex >= 0 && newSelectedData.length === 1) {
        return
      } else {
        const startIndex = data.findIndex(ele => ele === selectedData[0])
        const endIndex = data.findIndex(ele => ele === itemData)
        let newData = data.slice(startIndex, endIndex + 1)
        if (startIndex > endIndex) {
          newData = data.slice(endIndex, startIndex + 1).reverse()
        }
        newSelectedData.splice(0, Infinity, ...newData)
      }
      setSelectedData(newSelectedData)
    } else if (event.ctrlKey) {
      if (dataIndex >= 0) {
        newSelectedData.splice(dataIndex, 1)
      } else {
        newSelectedData.push(itemData)
      }
      setSelectedData([...newSelectedData])
    } else {
      setSelectedData([itemData])
    }
  }

  const reset = () => {
    setTargetIndex(null)
  }

  return (
    <div>
      <div ref={dropRef} className='mt-1 flex flex-col items-center'>
        {data.map((ele, index) => (
          <DragItem
            key={ele}
            data={ele}
            changeSourceNode={handleChangeSourceNode}
            updateSelectedData={updateSelectedData}
            selectedData={selectedData}
            ghostPosition={ghostPosition}
            index={index}
            targetIndex={targetIndex}
            reset={reset}
          />
        ))}
      </div>
    </div>
  )
}
