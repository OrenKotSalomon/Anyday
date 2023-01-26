import { EditableHeading } from 'monday-ui-react-core'
import { Draggable } from 'react-beautiful-dnd'
import { CHANGE_TASK_TITLE } from '../../services/board.service.local'
import { updateTask } from '../../store/board.actions'


export function TaskCard({ task, group, board }) {

    

    function onFinishEditingInTask(value) {
        let taskChanges = { title: value, taskId: task.id, groupId: group.id }
        updateTask(board, taskChanges, CHANGE_TASK_TITLE)
    }

    return <section className='card'>

        <EditableHeading className='card-task-title'
            onFinishEditing={onFinishEditingInTask}
            type={EditableHeading.types.h5}
            value={task.title} />
       

    </section>

}