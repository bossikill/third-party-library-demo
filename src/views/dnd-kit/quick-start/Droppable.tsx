import { useDroppable } from '@dnd-kit/core'

export default function Droppable(props: any) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable'
  })
  const style = {
    color: isOver ? 'green' : undefined
  }

  return (
    <div ref={setNodeRef} style={style} className='bg-sky-300'>
      {props.children}
    </div>
  )
}
