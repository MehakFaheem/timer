"use client"; //means this component will run on browser
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// usestate helps in storing data 
// useref helps in making reference 
// useffect helps in repeating the time , like in timer 
// changeevent htells us that anything that is changin in input is through event
const react_1 = require("react");
const input_1 = require("@/components/ui/input");
const button_1 = require("@/components/ui/button");
function Countdown() {
    const [duration, setDuration] = (0, react_1.useState)("");
    const [timeLeft, setTimeleft] = (0, react_1.useState)(0); //will keep track of the time left 
    const [isActive, setIsactive] = (0, react_1.useState)(false); //will tell in the boolean value if the timer is active or not
    const [isPaused, setIspaused] = (0, react_1.useState)(false); //will check in the boolean if the timer is paused or not
    const timerRef = (0, react_1.useRef)(null); // will remeber the timer id, for control. 
    const handelSetduration = () => {
        if (typeof duration === "number" && duration > 0) {
            setTimeleft(duration);
            setIsactive(false);
            setIspaused(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };
    const handleStart = () => {
        if (timeLeft > 0) {
            setIsactive(true);
            setIspaused(false);
        }
    };
    const handlePause = () => {
        if (isActive) {
            setIspaused(true);
            setIsactive(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };
    const handleReset = () => {
        setIsactive(false);
        setIspaused(false);
        setTimeleft(typeof duration === "number" ? duration : 0);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };
    (0, react_1.useEffect)(() => {
        if (isActive && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimeleft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(timerRef.current);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isActive, isPaused]);
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    };
    const handleDurationchange = (e) => {
        setDuration(Number(e.target.value) || "");
    };
    return (
    //container div for centering the content 
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
        {/*Timer box container */}
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/*Title of the countdown timer */}
        <h1 className="text-2x1 font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
            Countdown Timer
        </h1>
        {/*Input and set button Container */}
        <div className="flex items-center mb-6">
            <input_1.Input type="number" id="duration" placeholder="Enter Duration In Seconds" value={duration} onChange={handleDurationchange} className="flex-1 mr-4 rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"/>
            <button_1.Button onClick={handelSetduration} variant={"outline"} className="text-gray-800 dark:text-gray-200">
                 Set 
                </button_1.Button>
        </div>
        {/* Display formated time left */}
        <div className="text-6xl font-bold text-gray-800 dark: text-gray-200 mb-8 text-center"> 
            {formatTime(timeLeft)}
        </div>
        {/* Buttons to start, pause, and reset the timer */}
        <div className="flex justify-center gap-4">
            <button_1.Button onClick={handleStart} variant={"outline"} className="text-gray-800 dark:text-gray-200">
            {isPaused ? "Resume" : "Start"}
            </button_1.Button>
            <button_1.Button onClick={handlePause} variant={"outline"} className="text-gray-800 dark: text-gray-200">
                Pause     
            </button_1.Button>
            <button_1.Button onClick={handleReset} variant={"outline"} className="text-gray-800 dark: text-gray-200">
                Reset 
            </button_1.Button>
        </div>
        </div>
        </div>);
}
exports.default = Countdown;
