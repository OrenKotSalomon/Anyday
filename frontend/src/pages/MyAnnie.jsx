import { useEffect, useState } from "react";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ADD_GROUP_FROM_HEADER, ADD_TASK_FROM_HEADER } from "../services/board.service.local";
import { updateGroup, updateTask } from "../store/board.actions";

export function MyAnnie({ board, setfilterBy }) {
    const [temp, settemp] = useState('')

    useEffect(() => {
        SpeechRecognition.startListening({
            language: 'en-US'
        })
        setTimeout(() => {
            SpeechRecognition.stopListening()
        }, 3500);
    }, []);

    function onFilterBy(type) {
        setfilterBy(prev => {
            return { ...prev, label: type }
        })
    }

    const commands = [
        {
            command: '(Please) create a new task',
            callback: () => updateTask(board, undefined, ADD_TASK_FROM_HEADER)
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
            command: '(Please) create a new group',
            callback: () => updateGroup(board, null, ADD_GROUP_FROM_HEADER)
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
    console.log(transcript);
    return (
        <div className="annie-container">
            <p>Microphone: {listening ? 'on' : 'off'}</p>
            <div className="text-container">
                <p>{transcript}</p>

            </div>
            <div className="btn-annie-container">
                {/* <button onClick={() => SpeechRecognition.startListening({
                    language: 'en-US'
                })}>Start</button> */}
                <button onClick={SpeechRecognition.stopListening}>Stop</button>
                <button onClick={resetTranscript}>Reset</button>

            </div>
        </div>
    );
};