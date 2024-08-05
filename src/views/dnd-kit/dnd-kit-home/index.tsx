import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import Draggable from './Draggable'
import Droppable from './Droppable'

export default function Example() {
  const [parent, setParent] = useState(null)
  const draggable = <Draggable id='draggable'>Go ahead, drag me.</Draggable>

  const handleDragEnd = event => {
    const { over } = event
    setParent(over ? over.id : null)
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id='droppable'>{parent === 'droppable' ? draggable : 'Drop here'}</Droppable>
    </DndContext>
  )
}
