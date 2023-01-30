import { updateGroup, updateTask } from '../store/board.actions';
import { ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER, boardService } from '../services/board.service.local';

import { Button, Flex, SplitButton, Tooltip, Icon, Menu, MenuItem } from 'monday-ui-react-core'
import { Search, PersonRound, Filter, Sort, Group } from "monday-ui-react-core/icons";
import { Menu as MenuIcon } from "monday-ui-react-core/icons";
import { Fragment, useEffect, useRef, useState } from 'react';
import { utilService } from '../services/util.service';
import { StatusModal } from './filter-modals/status-filter';
import { PriorityModal } from './filter-modals/priority-modal';
import { LabelModal } from './filter-modals/label-status-modal';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MyAnnie } from '../pages/MyAnnie';

export function BoardFilter({ board, onSetFilterBy }) {

    const [filterBy, setfilterBy] = useState(boardService.getDefaultFilter())
    const [isFilterModalOpen, setIsFilterModalOpen] = useState()
    const [isInputFocused, setIsInputFocused] = useState(false)
    const [isAnnieOn, setisAnnieOn] = useState(false)

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {

        onSetFilterBy.current(filterBy)
    }, [filterBy]);

    function onAddNewTask() {
        updateTask(board, undefined, ADD_TASK_FROM_HEADER)
    }

    // configure filter to mobile also

    function onCancelFilter() {
        setfilterBy(prev => ({ ...prev, label: [] }))
    }

    function onClickLabelFilter(label, isChosed) {
        // console.log(isChosed);
        setfilterBy(prev => {
            if (!isChosed) {
                prev.label.push(label)
                return { ...prev }
            }

            let newLabelsFilter = prev.label.filter(filterLabel => {
                if (filterLabel === label) {
                    return false
                }
                return label
            })

            return { ...prev, label: newLabelsFilter }
        })
        // setisFilterFocues(false)
    }
    function handleChange({ target }) {
        let { value, name: field, type } = target

        setfilterBy(prev => ({ ...prev, [field]: value }))
    }
    return <Fragment>
        <MyAnnie
            setisAnnieOn={setisAnnieOn}
            board={board}
            setfilterBy={setfilterBy}
            isAnnieOn={isAnnieOn}
        />
        <section className='board-filter'>
            <Flex gap='10' align='End'

            >
                <div className='annie-icon-header' onClick={() => setisAnnieOn(!isAnnieOn)}>
                    <FontAwesomeIcon className='open-annie-mic' icon={faMicrophone} style={{ color: isAnnieOn ? '#F52918' : '#676879' }} />
                </div>
                <SplitButton className="new-task-btn"

                    children='New Item' size={Button.sizes.SMALL} onClick={onAddNewTask} secondaryDialogContent={<HeaderMenu board={board} />} >

                </SplitButton>
                <div className='search-filter'
                    style={{ border: isInputFocused ? '1px solid #cce5ff' : 'none' }}
                    onClick={() => setIsInputFocused(!isInputFocused)}>
                    <Icon
                        ignoreFocusStyle={true}
                        className="input-search-icon" iconType={Icon.type.SVG} icon={Search} iconSize={19} />

                    <input
                        onChange={handleChange}
                        type="text"
                        name='title'
                        className="input-search-board-input"
                        style={{ width: isInputFocused ? '210px' : '48px' }}
                        placeholder="Search"
                    />
                </div>
                <div className="monday-storybook-tooltip_bottom">
                    <Tooltip
                        content="Filter by person" animationType="expand">
                        <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={PersonRound}>
                            Person
                        </Button>
                    </Tooltip>
                </div>
                <div className="monday-storybook-tooltip_bottom">
                    <Tooltip
                        content="Filter by anything" animationType="expand">
                        <Button
                            onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                            kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Filter}>
                            Filter
                        </Button>
                    </Tooltip>
                </div>
                <div className="monday-storybook-tooltip_bottom">
                    <Tooltip
                        content="Sort by any column" animationType="expand">
                        <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={Sort}>
                            Sort
                        </Button>
                    </Tooltip>
                </div>
                <div className="monday-storybook-tooltip_bottom" style={{ justifySelf: 'flex-end' }}>
                    <Tooltip
                        content="Hidden columns" animationType="expand">
                        <Button kind={Button.kinds.TERTIARY} size={Button.sizes.SMALL} leftIcon={MenuIcon}>

                        </Button>
                    </Tooltip>
                </div>

            </Flex>
        </section >

        {isFilterModalOpen &&
            <div className='modal-filter'>
                <button className='btn-clear-filter'
                    onClick={() => onCancelFilter()}
                >Clear filter</button>
                <div className='modal-filter-wrapper'>
                    <div className='modal-filter-container'>
                        <div className="filter-status-title">Status</div>
                        <div className='statuses-wrapper'>
                            <section className='status-container'>

                                <div className="filter-options-container">
                                    {board.statuses.map((status, idx) => {

                                        return <StatusModal
                                            key={idx}
                                            status={status}
                                            onClickLabelFilter={onClickLabelFilter}
                                        />
                                    })}
                                </div>

                            </section>
                        </div>
                    </div>
                    <div className='modal-filter-container'>
                        <div className="filter-status-title">Priority</div>
                        <div className='statuses-wrapper'>
                            <section className='status-container'>
                                <div className="filter-options-container">
                                    {board.priorities.map((prior, idx) => {
                                        // console.log();
                                        return <PriorityModal
                                            key={idx}
                                            prior={prior}
                                            onClickLabelFilter={onClickLabelFilter}
                                        />
                                    })}
                                </div>

                            </section>
                        </div>

                    </div>
                    <div className='modal-filter-container'>
                        <div className="filter-status-title">Label</div>
                        <div className='statuses-wrapper'>

                            <section className='status-container'>

                                <div className="filter-options-container">
                                    {board.labelStatuses.map((label, idx) => {
                                        // console.log();
                                        return <LabelModal
                                            key={idx}
                                            label={label}
                                            onClickLabelFilter={onClickLabelFilter}
                                        />
                                    })}
                                </div>

                            </section>
                        </div>

                    </div>

                </div>

            </div>

        }

    </Fragment>
}

export function HeaderMenu({ board }) {
    return (
        <Menu>
            <MenuItem
                icon={Group}
                onClick={() => updateGroup(board, null, ADD_GROUP_FROM_HEADER)}
                title="New group of Tasks"
            />
        </Menu>
    )
}
