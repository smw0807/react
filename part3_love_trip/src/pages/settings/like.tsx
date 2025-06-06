import { useEffect, useState } from 'react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProps,
} from 'react-beautiful-dnd'

import ListRow from '@shared/ListRow'
import FixedBottomButton from '@shared/FixedBottomButton'

import useEditLike from '@components/settings/like/hooks/useEditLike'

function LikePage() {
  const { data, isEdit, reorder, save } = useEditLike()

  const handleDragEndDrop = (result: DropResult) => {
    if (result.destination == null) {
      return
    }
    const from = result.source.index
    const to = result.destination.index

    reorder(from, to)
  }
  return (
    <div>
      {/* <DragDropContext onDragEnd={handleDragEndDrop}>
        <StrictModeDroppable droppableId="likes">
          {(droppableProps) => (
            <ul
              ref={droppableProps.innerRef}
              {...droppableProps.droppableProps}
            >
              {data?.map((like, index) => {
                return (
                  <Draggable key={like.id} draggableId={like.id} index={index}>
                    {(draggableProps) => (
                      <li
                        ref={draggableProps.innerRef}
                        {...draggableProps.draggableProps}
                        {...draggableProps.dragHandleProps}
                      >
                        <ListRow
                          as="div"
                          content={
                            <ListRow.Texts
                              title={like.order}
                              subtitle={like.hotelName}
                            />
                          }
                        />
                      </li>
                    )}
                  </Draggable>
                )
              })}
            </ul>
          )}
        </StrictModeDroppable>
      </DragDropContext> */}

      {isEdit && <FixedBottomButton label="저장" onClick={save} />}
    </div>
  )
}

// function StrictModeDroppable({ children, ...props }: DroppableProps) {
//   const [enabled, setEnabled] = useState(false)

//   useEffect(() => {
//     const animation = requestAnimationFrame(() => setEnabled(true))

//     return () => {
//       cancelAnimationFrame(animation)
//       setEnabled(false)
//     }
//   }, [])

//   if (enabled === false) {
//     return null
//   }

//   return <Droppable {...props}>{children}</Droppable>
// }
export default LikePage
