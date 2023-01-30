
function DynamicInfo(data, infoType) {
    switch (infoType) {
        case STATUS_PICKER: return board.statuses
        case PRIORITY_PICKER: return board.priorities
        case LABEL_STATUS_PICKER: return board.labelStatuses
        case MEMEBER_PICKER:
            return {
                selectedMembers: ['m1', 'm2'],
                members: data.task.members
            }
        case DATE_PICKER:
            return {
                selectedDate: data.task.dueDate
            }
    }
}
function openModal(ev, data, infoType) {
    const labelPos = ev.target.getBoundingClientRect()
    const boardScrollTop = boardContainer.current.scrollTop
    const boardScrollLeft = boardContainer.current.scrollLeft

    setCmp(prev => {
        return {
            ...prev,
            data: { groupId: data.groupId, taskId: data.task.id },
            pos: { top: labelPos.top + boardScrollTop, left: labelPos.left + boardScrollLeft },
            type: infoType,
            info: DynamicInfo(data, infoType)
        }
    })
    setIsModalOpen(true)
}
<DynamicModal cmp={cmp} setIsModalOpen={setIsModalOpen} onUpdateTaskLabel={onUpdateTaskLabel} />
