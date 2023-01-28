import { faArrowRotateRight, faMicrophone, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER } from "../services/board.service.local";
import { updateGroup, updateTask } from "../store/board.actions";

export function MyAnnie({ board, setfilterBy, setisAnnieOn, isAnnieOn }) {

    function onFilterBy(type) {
        setfilterBy(prev => {
            return { ...prev, label: type }
        })
    }

    const commands = [
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
        <div tabIndex={0} className="annie-wrapper"
            onKeyUp={() => SpeechRecognition.startListening({
                language: 'en-US'
            })}
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
                icon={faMicrophone} style={{ color: listening ? '#F52918' : '#ffffff' }} />

            <div className="white-circle"></div>

            {/* <button>Start</button> */}
            <FontAwesomeIcon
                className="power-off"
                onClick={() => setisAnnieOn(false)}
                icon={faPowerOff} />
            <FontAwesomeIcon
                className="arrow-rotate-off"
                onClick={resetTranscript}
                icon={faArrowRotateRight} />

        </div>
    );
};