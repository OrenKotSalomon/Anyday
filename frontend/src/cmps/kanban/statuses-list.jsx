import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { ADD_GROUP_TASK } from "../../services/board.service.local";
import { updateGroup } from "../../store/board.actions";
import { TaskCard } from "./task-card";
import { EditableHeading } from 'monday-ui-react-core'


export function StatusesList({ status, board, provided }) {

    const [newTaskTitle, setNewTaskTitle] = useState('')

    function onAddGroupTask() {
        if (!newTaskTitle) throw new Error('Task title is empty')
        console.log('newTaskTitle:', newTaskTitle)
        updateGroup(board, { group: board.groups[0], newTaskTitle, status: status.label }, ADD_GROUP_TASK)
        setNewTaskTitle('')
    }

    function handleChangeTask(value) {
        setNewTaskTitle(value)
    }

    return <Droppable key={status.id} droppableId={status.id} type='task-card' >
        {prov =>

            <section className='kanban-label-list'
                style={{ backgroundColor: status.bgColor }}
                {...prov.droppableProps}
                ref={prov.innerRef}>

                <div className="list-title"
                    {...provided.dragHandleProps}
                >{status.label}</div>
                <div className="cards-container flex column">
                    {board.groups.map(group =>
                        group.tasks.map((task, idx) =>
                            task.status === status.label ?

                                <Draggable
                                    draggableId={task.id}
                                    key={task.id}
                                    index={idx}
                                >
                                    {provided =>
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}>

                                            <TaskCard task={task} group={group} board={board} />
                                        </div>

                                    }
                                </Draggable>

                                : '')
                    )}
                    {prov.placeholder}
                </div>
                <EditableHeading
                    className='editable-add-task-kanban'
                    type={EditableHeading.types.h6}
                    onFinishEditing={onAddGroupTask}
                    onChange={handleChangeTask}
                    placeholder={'+ Add Item'}
                    value={newTaskTitle}
                    brandFont
                />
            </section>
        }
    </Droppable>
}