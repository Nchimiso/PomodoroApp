import { use, useEffect, useRef } from "react";
import { useState } from "react";
import useSound from 'use-sound';
import boopSfx from './Have you ever believed.mp3';


const formatTime = (date) => {
    return new Intl.DateTimeFormat("en-US", {
        minute: "numeric",
        second: "numeric",
    }).format(date);

}
const TimedSession = ({ 
    initialDuration, 
    onSkipSession,
    onCompleteSession
}) => {
    const [timeRemaining, setTimeRemaining] = useState(
        new Date(initialDuration * 60 * 1000)
    );
    const [isRunning, setIsRunning] = useState(false);
    const intervalIdRef = useRef(null);
    const [play] = useSound(boopSfx);

    const handleStart = () => {
        intervalIdRef.current = setInterval(() => {
            setTimeRemaining(
                (prevTimeRemaining) => new Date(prevTimeRemaining.getTime() - 1000)
            );
        }, 1000);
        setIsRunning(true);
    };

    const stopInterval =() => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        setIsRunning(false);
    };

    const handlePause = () => {
        stopInterval();
    };

    const handleRestart = () => {
        stopInterval();
        setTimeRemaining(new Date(initialDuration * 60 * 1000));

    }

    useEffect(() => {
        return () => {
            stopInterval();
        }
    }, []);

    useEffect(() => {
        if (timeRemaining.getTime() == 0) {
            play();
            stopInterval();
            onCompleteSession()
        }
    }, [timeRemaining, onCompleteSession]);



    return (
        <div style= 
        {{ border: "1px solid black",
        }}>
            <p style={{ fontSize: "2.5em"}}>{formatTime(timeRemaining)}</p>
            <div 
            style={{
                marginBottom: "2em", 
                display: "flex",
                gap: "20px",
                justifyContent: "center",
                padding: "20px 40px",
            }}
            >
                {isRunning ? (
                <> 
                    <button onClick={handleRestart}>Restart</button>
                    <button onClick={handlePause}>Pause</button>
                    <button onClick={onSkipSession}>Skip</button>
                </>
                ) : (
                    <button onClick={handleStart}>Start</button>
                )}
            </div>
        </div>

    );

};
export default TimedSession;