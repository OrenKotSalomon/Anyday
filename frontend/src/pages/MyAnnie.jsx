import { useEffect, useState } from "react";

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { ADD_TASK_FROM_HEADER } from "../services/board.service.local";
import { updateTask } from "../store/board.actions";

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
            command: 'Clear filter',
            callback: () => onFilterBy([])
        },
        {
            command: '(Please) create a new group',
            callback: () => onFilterBy([])
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

            <p>{transcript}</p>
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