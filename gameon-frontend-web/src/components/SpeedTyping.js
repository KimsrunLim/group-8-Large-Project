import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const generateRandomWords = (wordList, wordCount) => {
    let randomWords = [];
    for (let i = 0; i < wordCount; i++) {
        randomWords.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return randomWords.join(' ');
};

const validateChar = (inputChar, expectedChar) => {
    return inputChar === expectedChar;
};

function SpeedTyping() {
    const [userInput, setUserInput] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [numMistakes, setNumMistakes] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [timer, setTimer] = useState(60);
    const [words, setWords] = useState('');
    const [validatedInputHistory, setValidatedInputHistory] = useState([]);
    const [hasStarted, setHasStarted] = useState(false);
    const textDisplayRef = useRef(null); 
    const charRefs = useRef(new Array(100).fill(null));  // Assume a maximum of 100 chars for refs
    
    const wordList = [
        "the", "be", "to", "of", "and", "a", "saxophone", "that", "have", "I",
        "it", "for", "care", "on", "with", "bee", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
        "so", "up", "out", "if", "about", "who", "travel", "which", "go", "me",
        "when", "skate", "can", "like", "time", "no", "just", "him", "know", "strawberry",
        "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
        "than", "then", "now", "look", "sing", "come", "its", "around", "think", "also",
        "back", "after", "blueberry", "two", "how", "our", "work", "first", "well", "way",
        "even", "new", "meadow", "because", "any", "these", "give", "day", "most", "us",
        "apple", "banana", "cherry", "pineapple", "elderberry", "fig", "grape", "honeydew",
        "boat", "tree", "house", "love", "animal", "sun", "moon", "star", "book", "phone",
        "computer", "music", "movie", "water", "food", "friend", "family", "child", "life", "world",
        "school", "state", "city", "country", "earth", "solution", "information", "history", "yoga", "relax",
        "river", "winter", "student", "teacher", "mother", "father", "sister", "brother", "daughter", "son",
        "summer", "spring", "fall", "leaves", "trampoline", "park", "ocean", "cat", "dog", "bird",
        "art", "music", "notes", "guitar", "cello", "crayons", "pencil", "blanket", "flower", "paradise",
        "rocket", "space", "planet", "jupiter", "saturn", "mars", "pluto", "neptune", "galaxy", "light",
    ];

    // Generate random words string on component mount.
    useEffect(() => {
        setWords(generateRandomWords(wordList, 100));
    }, []);

    // Start timer when the game starts.
    useEffect(() => {
        if (hasStarted && timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [hasStarted, timer]);

    // Calculate WPM when timer hits 0.
    useEffect(() => {
        if (timer === 0) {
            const correctChars = validatedInputHistory.filter(input => input.isCorrect).length;
            setWPM(correctChars / 5); // Average word length = 5 chars
        }
    }, [timer, validatedInputHistory]);

    // Validate last user-entered character then reset input. 
    const handleUserInput = (event) => {
        let inputValue = event.target.value;
        if (!hasStarted) {
            setHasStarted(true);
        }

        const expectedChar = words.charAt(charIndex);
        const isCharValid = validateChar(inputValue, expectedChar);

        // Calculate and scroll here.
        if (textDisplayRef.current) {
            const additionalWidth = calculateCharWidth(expectedChar); // Use expectedChar to include space width
            const currentTransform = textDisplayRef.current.style.transform;
            const currentScrollAmount = currentTransform ? parseFloat(currentTransform.replace('translateX(-', '').replace('px)', '')) : 0;
            const newScrollAmount = currentScrollAmount + additionalWidth;
            textDisplayRef.current.style.transform = `translateX(-${newScrollAmount}px)`;
        }

        setValidatedInputHistory((prevHistory) => [...prevHistory, { char: inputValue, isCorrect: isCharValid }, ]);
        setCharIndex(prevIndex => prevIndex + 1);
        setUserInput('');

        if (!isCharValid) {
            setNumMistakes((prevNumMistakes) => prevNumMistakes + 1);
        }

        centerCurrentCharacter(charIndex + 1)
    };

    const calculateCharWidth = (char) => {
        const span = document.createElement('span');
        span.style.visibility = 'hidden'; 
        span.style.fontFamily = 'monospace';
        span.style.fontWeight = 'bold';
        span.style.fontSize = '2.25rem'; 
        span.textContent = char;
        document.body.appendChild(span);
        const width = span.getBoundingClientRect().width;
        document.body.removeChild(span);
        return width;
    };

    const centerCurrentCharacter = (currentIndex) => {
        if (textDisplayRef.current) {
            const span = textDisplayRef.current.children[currentIndex];
            const offset = span ? span.offsetLeft - 4 : 0;
            textDisplayRef.current.style.transform = `translateX(-${offset}px)`;
        }
    };

    // Render each character of the words list with validity styling.
    const renderedWords = words.split('').map((char, index) => {
        const historyEntry = validatedInputHistory[index];
        let charClass = ""; // default class
        if (historyEntry !== undefined) {
            charClass = historyEntry.isCorrect ? "text-success" : "text-danger";
        }

        const style = char === ' ' ? { paddingRight: '0.4em' } : undefined;

        return (<span key={index}
                      ref={el => charRefs.current[index] = el}
                      className={charClass}
                      style={style}
                >
                    {char}
                </span>);
    });

    // Circular timer calculations & style.
    const radius = 54; // radius of the SVG circle
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - ((timer / 60) * circumference);
    const circleContainerStyle = {
        position: 'relative',
        width: '120px',
        height: '120px',
        margin: '10px auto',
    };

    // Start bubble styles.
    const pulseAnimation = `
        @keyframes pulse {
        0%, 100% {
            transform: translateY(100%)
        }
        50% {
            transform: translateY(90%)
        }
        }
    `;
    const startBubblePulse = { animation: 'pulse 2s infinite' };
    const startBubbleTailStyle = {
        borderLeft: '10px solid transparent',
        borderRight: '10px solid transparent',
        borderBottom: '10px solid'
    };
    let startBubbleContainerStyle = "position-absolute top-50 start-30 mt-3 pt-3 ms-4 mb-0 d-flex flex-column align-items-center z-1";
    let startBubbleStyle = "p-2 text-center fw-bold bg-dark text-light";
    
    // General Bootstrap styles
    let cardStyle = "justify-content-center m-3 p-1 pb-3 mb-5 fs-1 h-100 overflow-auto font-monospace";
    let wordsStyle = "position-relative start-50 pt-4 ms-2 ps-1 overflow-visible border-0 d-flex flex-row align-items-flex-start z-2";
    let inputAreaStyle = "position-absolute start-50 mt-4 mb-0 fs-1 fw-bold border-0 bg-transparent";

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            {/* Header */}
            <div id="header" className="row text-center mt-5 pt-5 mb-1">
                <h1 id="game-title" className="mb-5 fw-bolder">Speed Typing</h1>
                <h5 id="timer-title" className="mb-0 ms-1 fw-bold">Timer</h5>

                {/* Circular Timer */}
                <div className="mt-2 mb-1" style={circleContainerStyle}>
                    <svg id="both-circles" width="110" height="110" viewBox="0 0 120 120">
                        <circle id="inner-circle" cx="60" cy="60" r={radius} fill="none" stroke="#eee" strokeWidth="10" />
                        <circle id="outer-circle"
                            cx="60"
                            cy="60"
                            r={radius}
                            fill="none"
                            stroke="#007bff"
                            strokeWidth="10"
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset: strokeDashoffset,
                                transition: 'stroke-dashoffset 0.5s linear',
                                transform: 'rotate(-90deg)',
                                transformOrigin: 'center center',
                            }}
                        />
                    </svg>
                    <div className="position-absolute ms-2 pt-4 pb-5" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                        <h1 className="pt-3 mb-0 fw-bold">{timer}</h1>
                        <h6 className="top-0">seconds</h6>
                    </div>
                </div>

                <div>
                    <h5 className="ms-3 mb-5 text-danger fw-bold">Mistakes: {numMistakes}</h5>
                </div>
            </div>
                
            {/* Speech Bubble */}
            <style>{pulseAnimation}</style>
            {!hasStarted && (
                <div className={startBubbleContainerStyle} style={startBubblePulse}>
                    <div style={startBubbleTailStyle}></div>
                    <div className={startBubbleStyle}>
                        Type to start!
                    </div>
                </div>
            )}

            {/* Body */}
            <div id="text-container" className={`card ${cardStyle}`} style={{boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)'}}>
                <textarea id="user-input"
                    className={`form-control ${inputAreaStyle}`}
                    style={{ width: '2%', resize: 'none', boxShadow: 'none'}}
                    value={userInput}
                    onChange={handleUserInput}
                    autoFocus
                    rows="1"
                    disabled={timer === 0}
                />

                <div id="displayed-words"
                    ref={textDisplayRef}
                    className={wordsStyle}
                    style={{ height: '5rem', width: '50rem'}}
                >
                    {renderedWords}
                </div>
            </div>

            {/* Footer */}
                {/* Show leaderboard */}
                {timer === 0 &&
                    <p>Words per minute (WPM): {WPM.toFixed(2)}</p>}
                
                {/* Rank list 
                <div className="text-center mt-5">
                    <p>Words per minute (WPM): {WPM.toFixed(2)}</p>
                    <p>Rank: {currUser.rank}</p>
                    <p>Accuracy: {currUser.accuracy}%</p>
                    <p>Speed: {currUser.speed} WPM</p>
                    <p>Score: {currUser.score}</p>
                    <p>Date: {currUser.date}</p>
                </div> */}

            
            
            
        </div>
    )
}

export default SpeedTyping;

// accuracy
// score
// speed
// date 
// try again / route to leaderboard button
// wait for API: store into leaderboard
// check if inputs worthy adding
// draw scores for specific users
// use specific leaderboard
// sizing speech bubble
// 

// leaderboard top 3
// check for user top score 
// one score per user
// leaderboard filtering 
// navbar cookies
// reaction game button