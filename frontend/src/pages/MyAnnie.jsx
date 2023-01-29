import { faArrowRotateRight, faInfo, faMicrophone, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment } from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER, boardService } from "../services/board.service.local";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { addBoard, updateGroup, updateTask } from "../store/board.actions";
import { Waves } from "./waves";

export function MyAnnie({ board, setfilterBy, setisAnnieOn, isAnnieOn }) {

    const navigate = useNavigate()
    const [boardToEdit, setBoardToEdit] = useState(boardService.getEmptyBoard())
    const [isInfoOpen, setIsInfoOpen] = useState(false)

    useEffect(() => {
        SpeechRecognition.startListening({
            language: 'en-US'
        })
        setTimeout(() => {
            SpeechRecognition.stopListening()
        }, 3500);
    }, [isAnnieOn]);

    async function onAddBoard() {
        // if (!boardToEdit.title ) return
        boardToEdit.title = 'Management Board'
        boardToEdit.description = 'Best Way To Manage Your Projects'

        try {
            const savedBoard = await addBoard(boardToEdit)
            setBoardToEdit(boardService.getEmptyBoard())

            navigate(`/board/${savedBoard._id}`)
            showSuccessMsg(`Board added (id: ${savedBoard._id})`)
        } catch (err) {
            showErrorMsg('Cannot Add Board', err)
        }
    }

    function onFilterBy(type) {
        setfilterBy(prev => {
            return { ...prev, label: type }
        })
    }

    const commands = [
        {
            command: '(Please) create a new (management) board',
            callback: () => onAddBoard()
        },
        {
            command: '(Please) create new (management) board',
            callback: () => onAddBoard()
        },
        {
            command: '(Please) create new task',
            callback: () => updateTask(board, null, ADD_TASK_FROM_HEADER)
        },
        {
            command: 'Filter by done',
            callback: () => onFilterBy('done')
        },
        {
            command: 'Filter by dan',
            callback: () => onFilterBy('done')
        },
        {
            command: 'Filter by working on it',
            callback: () => onFilterBy('working on it')
        },
        {
            command: 'Filter by default',
            callback: () => onFilterBy('default')
        },
        {
            command: 'Filter by stuck',
            callback: () => onFilterBy('stuck')
        },
        {
            command: 'Filter by stock',
            callback: () => onFilterBy('stuck')
        },
        {
            command: 'Filter by low',
            callback: () => onFilterBy('low')
        },
        {
            command: 'Filter by critical',
            callback: () => onFilterBy('critical ⚠️')
        },
        {
            command: 'Filter by high',
            callback: () => onFilterBy('high')
        },
        {
            command: 'Clear filter',
            callback: () => onFilterBy([])
        },
        {
            command: '(Please) create new group',
            callback: () => updateGroup(board, null, ADD_GROUP_FROM_HEADER)
        },
        {
            command: 'stop propagation',
            callback: () => setisAnnieOn(false)
        },
        {
            command: 'shut down',
            callback: () => setisAnnieOn(false)
        },
        {
            command: 'back to the future',
            callback: () => setisAnnieOn(false)
        },

    ]

    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
    }

    return (
        <Fragment>

            <div tabIndex={0} className="annie-wrapper"
                style={{ top: isAnnieOn ? '80%' : '-500px' }}
            >

                <div className="annie-container">
                    <p>Microphone: {listening ? 'on' : 'off'}</p>
                    <div className="text-container-modal">
                        <div>{transcript}</div>

                    </div>

                </div>

                <FontAwesomeIcon
                    onClick={() => SpeechRecognition.startListening({
                        language: 'en-US'
                    })}

                    className="mic-modal"
                    icon={faMicrophone} style={{ color: listening ? '#F52918' : '#424242' }} />

                <div className="white-circle"></div>
                {listening && <div className="waves-container">
                    <Waves />
                </div>}

                <FontAwesomeIcon
                    className="power-off"
                    onClick={() => setisAnnieOn(false)}
                    icon={faPowerOff} />
                <FontAwesomeIcon
                    className="arrow-rotate-off"
                    onClick={resetTranscript}
                    icon={faArrowRotateRight} />
                <FontAwesomeIcon
                    onClick={() => setIsInfoOpen(!isInfoOpen)}
                    className="arrow-info"
                    icon={faInfo} />
                {isInfoOpen &&
                    <div className="info-modal">
                        <div className="arrow-top"></div>
                        <div className="info-modal-container">
                            <div>Commands:</div>
                            <div>Create new board</div>
                            <div>Create new group</div>
                            <div>Create new task</div>
                            <div>Filter by: -Label name-</div>
                            <div>Shut down -Close Shiri-</div>
                        </div>
                    </div>}

            </div>

        </Fragment>
    );
};