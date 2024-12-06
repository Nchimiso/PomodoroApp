import { useState } from "react";
import TimedSession from "./TimedSession";

const TOTAL_SESSION = 4;
const SESSION_TYPE = {
    focus: "focus time", 
    "short-break": "short break", 
    "long-break": "long break",
};

const SESSION_DURATION_MIN = {
    focus: 25,
    "short-break": 5, 
    "long-break": 20, 
}



const PomodoroApp = () => {
    const [currentSession, setCurrentSession] = useState(1);
    const [currentSessionType, setCurrentSessionType] = useState("focus");
    const goNextSess = () => {
        if(currentSessionType == "focus") {
            if(currentSession < 4){
                setCurrentSessionType("short-break");
            } else {
                setCurrentSessionType("long-break");
            }
        } else {
            setCurrentSession(1);
            setCurrentSession(currentSession + 1);
            setCurrentSessionType("focus");
        }
    
    }
    return(
        <div
        style={{
            margin: "auto",
            maxWidth: "500px",
            textAlign: "center", 
            fontSize: "1.5em",
        }}
        >
        <div 
            style={{
            marginBottom: "1em", 
            display: "flex",
            gap: "20px",
            justifyContent: "center",
            }}
        >
            <p style={{ fontSize: "2.5em"}}>PomodoroApp</p>
        </div>
            <p>
                Session {currentSession} of {TOTAL_SESSION} (
                {SESSION_TYPE[currentSessionType]})
            </p>
            <TimedSession
            key={`${currentSession}-${currentSessionType}`}
            initialDuration={SESSION_DURATION_MIN[currentSessionType]}
            onCompleteSession={() => goNextSess()}
            onSkipSession={() => goNextSess()}
            />
        </div>
    );
};

export default PomodoroApp;