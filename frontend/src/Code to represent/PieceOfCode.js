function DynamicInfo(data, info) {
    switch (info) {
        case STATUS_PICKER:
            return board.statuses
        case LABEL_STATUS_PICKER:
            return board.labelStatuses
        case MEMEBER_PICKER:
            return {
                selectedMembers: ['m1', 'm2'],
                members: data.task.members
            }
        case DATE_PICKER:
            return {
                selectedDate: data.task.dueDate
            }
        case PRIORITY_PICKER:
            return board.priorities

    }
}

function openModal(ev, data, info) {
    let labelPos = ev.target.getBoundingClientRect()
    let boardScrollTop = boardContainer.current.scrollTop
    let boardScrollLeft = boardContainer.current.scrollLeft
    setIsModalOpen(true)

    setCmp(prev => {
        return {
            ...prev,
            data: { groupId: data.groupId, taskId: data.task.id },
            pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
            type: info,
            info: DynamicInfo(data, info)
        }
    })
}