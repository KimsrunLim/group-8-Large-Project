import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

export const generateRandomWords = (wordList, wordCount) => {
    let randomWords = [];
    for (let i = 0; i < wordCount; i++) {
        randomWords.push(wordList[Math.floor(Math.random() * wordList.length)]);
    }
    return randomWords.join(' ');
};

export const validateChar = (inputChar, expectedChar) => {
    return inputChar === expectedChar;
};

// Leftward scrolling helpers.
export const createSpanElement = (char, fontFamily, fontWeight, fontSize) => {
    const span = document.createElement('span');
    span.style.visibility = 'hidden';
    span.style.fontFamily = fontFamily;
    span.style.fontWeight = fontWeight;
    span.style.fontSize = fontSize;
    span.textContent = char;
    return span;
}
export const getSpanWidth = (span, document) => {
    document.body.appendChild(span);
    const width = span.getBoundingClientRect().width;
    document.body.removeChild(span);
    return width;
};
export const calculateCharWidth = (char, document) => {
    const span = createSpanElement(char, 'monospace', 'bold', '2.25rem');
    return getSpanWidth(span, document);
};
export const calculateScrollAmount = (element, scrollAmount) => {
    if (element && element.style) {
        element.style.transform = `translateX(-${scrollAmount}px)`;
    }
};
export const updateScroll = (scrollFunc, element, scrollAmount) => {
  if (element) {
    element.style.transform = `translateX(-${scrollAmount}px)`;
  }
};

// Centering helpers.
export const calculateOffset = (element, currentIndex, adjustment = 4) => {
    if (!element || currentIndex < 0) return 0;

    const span = element.children[currentIndex];
    return span ? span.offsetLeft - adjustment : 0;
};
export const centerCurrentCharacter = (element, currentIndex, adjustment = 4) => {
    const offset = calculateOffset(element, currentIndex, adjustment);
    if (element) {
        element.style.transform = `translateX(-${offset}px)`;
    }
};

// Validation coloring helpers.
export const getCharacterClass = (historyEntry) => {
    return historyEntry?.isCorrect ? "text-success" : "text-danger";
};
export const renderCharacterSpan = (char, index, charClass = "", charRefs) => {
    const style = char === ' ' ? { paddingRight: '0.4em' } : undefined;
    return (
        <span key={index}
              ref={el => charRefs.current[index] = el}
              className={charClass}
              style={style}
        >
            {char}
        </span>
    );
};

// Connect to API 
const readCookie = () => {
    let data = document.cookie;
    let tokens = data.split("=");
    let username = "Guest"
    if (tokens[0] === "username") {
        username = tokens[1];
    }

    return username;
}

const app_name = 'group8large-57cfa8808431'

function buildPath(route) {
    if (process.env.NODE_ENV === 'production') {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else {
        return 'http://localhost:5001/' + route;
    }
}

const createPayload = (validatedInputHistory, numMistakes, username) => {
    const totalTypedChars = validatedInputHistory.length;
    const correctChars = validatedInputHistory.filter(entry => entry.isCorrect).length;
    const accuracyCalc = totalTypedChars > 0 ? (correctChars / totalTypedChars) * 100 : 0;
    const wpmCalc = correctChars / 5; // Average word length = 5 chars

    return {
        accuracy: accuracyCalc.toFixed(2), 
        date: new Date().toISOString(),
        device: "Computer",
        score: correctChars - numMistakes,
        speed: wpmCalc.toFixed(2),
        username: username
    };
};

const submitStats = async (payload) => {
    var js = JSON.stringify(payload);
    try {
        const response = await fetch(buildPath('api/addTypingData'),
        { method: 'POST', body: js, headers: { 'Content-Type': 'application/json' } });

        const res = JSON.parse(await response.text());
        return res;
        
    } catch (error) {
        console.error('Failed to send typing data:', error);
    }
};

function SpeedTyping() {
    const [userInput, setUserInput] = useState('');
    const [charIndex, setCharIndex] = useState(0);
    const [numMistakes, setNumMistakes] = useState(0);
    const [timer, setTimer] = useState(60);
    const [words, setWords] = useState('');
    const [validatedInputHistory, setValidatedInputHistory] = useState([]);
    const [hasStarted, setHasStarted] = useState(false);
    const [wordsPerMinute, setWordsPerMinute] = useState(0);
    const [accuracy, setAccuracy] = useState(0);
    const [score, setScore] = useState(0);
    const textDisplayRef = useRef(null); 
    const charRefs = useRef(new Array(100).fill(null));  // Assume a maximum of 100 chars for refs
    const userInputRef = useRef(null); 
    const [username, setUsername] = useState(null);
    
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

    //
    // Start & end of Game
    //

    const consistentFocus = () => {
        const handleClickAnywhere = () => {
            userInputRef.current.focus();
        };

        // Add event listener to the whole document
        document.addEventListener('click', handleClickAnywhere);

        // Cleanup function to remove the event listener
        return () => {
            document.removeEventListener('click', handleClickAnywhere);
        };
    }

    const setStats = async () => {
        // Submit to API
        const payload = createPayload(validatedInputHistory, numMistakes, username);
        await submitStats(payload);

        // Store for game
        setWordsPerMinute(payload.speed);
        setAccuracy(payload.accuracy);
        setScore(payload.score);
    };

    // Startup functions triggered once on component mount & unmount.
    useEffect(() => {
        setUsername(readCookie());
        setWords(generateRandomWords(wordList, 100));
        console.log(username);
        return consistentFocus();
    }, []);

    // Startup function for timer.
    useEffect(() => {
        if (hasStarted) {
            if (timer > 0) {
                const intervalId = setInterval(() => {
                    setTimer(prevTimer => prevTimer - 1);
                }, 1000);

                return () => clearInterval(intervalId);
            } else if (timer === 0) {
                setStats();
            }
        }
    }, [hasStarted, timer]);

    //
    // During game
    //

    const updateLeftwardScroll = (char) => {
        const charWidth = calculateCharWidth(char, document);
        const currentScrollAmount = textDisplayRef.current ? parseFloat(getComputedStyle(textDisplayRef.current).transform.split(',')[4]) : 0;
        const newScrollAmount = calculateScrollAmount(charWidth, currentScrollAmount);
        updateScroll(textDisplayRef.current, newScrollAmount);
    };

    const handleUserInput = (event) => {
        let inputValue = event.target.value;
        if (!hasStarted) {
            setHasStarted(true);
        }

        const expectedChar = words.charAt(charIndex);
        const isCharValid = validateChar(inputValue, expectedChar);

        updateLeftwardScroll(expectedChar);
        setValidatedInputHistory((prevHistory) => [...prevHistory, { char: inputValue, isCorrect: isCharValid }, ]);

        setCharIndex(prevIndex => prevIndex + 1);
        setUserInput('');

        if (!isCharValid) {
            setNumMistakes((prevNumMistakes) => prevNumMistakes + 1);
        }

        centerCurrentCharacter(textDisplayRef.current, charIndex + 1)
    };

    const renderedWords = words.split('').map((char, index) => {
        // redner each character with validity styling
        const historyEntry = validatedInputHistory[index];
        // ensured default class of historyEntry undefined
        const charClass = historyEntry ? getCharacterClass(historyEntry) : ""; 
        return renderCharacterSpan(char, index, charClass, charRefs);
    });

    //
    // Styling
    //

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
            transform: translateY(120%)
        }
        50% {
            transform: translateY(110%)
        }
        }
    `;

    const startBubblePulse = { animation: 'pulse 2s infinite' };

    const startBubbleTailStyle = {
        borderLeft: '0.5rem solid transparent',
        borderRight: '0.5rem solid transparent',
        borderTop: '0.5rem solid'
    };

    let startBubbleContainerStyle = "position-absolute top-40 start-30 mt-5 pt-5 ms-4 mb-0 d-flex flex-column align-items-center z-1";
    let startBubbleStyle = "px-2 py-0 text-center fw-bold bg-dark text-light fs-4";
    
    // General Bootstrap styles

    let typingCardStyle = "card justify-content-center m-3 p-1 pt-0 pb-3 mb-5 fs-1 h-70 overflow-hidden font-monospace";
    let wordsStyle = "position-relative start-50 pt-4 ms-2 ps-1 overflow-visible border-0 d-flex flex-row align-items-flex-start z-2";
    let inputAreaStyle = "position-absolute start-50 mt-4 mb-0 fs-1 fw-bold border-0 bg-transparent";

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            {/* Header */}
            <div id="header" className="row text-center mt-4 pt-5 mb-1">
                <h1 id="game-title" className="mb-5 pb-2 fw-bolder">Speed Typing</h1>
                <h5 id="timer-title" className="mb-0 mt-3 ms-1 fw-bold">Timer</h5>

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
                
                {/* Mistakes Count */}
                <div>
                    <h5 className="ms-3 mt-2 pb-2 mb-5 text-danger fw-bold">Mistakes: {numMistakes}</h5>
                </div>
            </div>
                
            {/* Speech Bubble */}
            <style>{pulseAnimation}</style>
            {!hasStarted && (
                <div className={startBubbleContainerStyle} style={startBubblePulse}>
                    <div className={startBubbleStyle}>
                        Type to start!
                    </div>
                    <div style={startBubbleTailStyle}></div>
                </div>
            )}

            {/* Body */}
            <div id="text-container" className={`col-11 col-md-11 col-lg-10 ${typingCardStyle}`} 
                 style={{boxShadow: '0 3px 6px rgba(0, 0, 0, 0.3)'}}>
                <textarea id="user-input" ref={userInputRef}
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
            {/* End of game stats */}
            {timer === 0 && (
                <div class="d-flex justify-content-center align-items-center mt-1">
                    <div class="card text-center">
                        <div class="card-header">
                            <h2 class="card-title">Scores for {username}</h2>
                        </div>
                        <div class="card-body pt-2 pb-1">
                            <div class="pt-1 mb-2">
                                <h5>Accuracy: {accuracy}%</h5>
                            </div>
                            <div class="pb-0">
                                <h5>Words Per Minute (WPM): {wordsPerMinute}</h5>
                            </div>
                            <hr class="hr mb-2" />
                            <div class="pb-0 mb-0">
                                <h3>Total Score: {score}</h3>
                            </div>
                        </div>
                        <div class="card-footer py-3">
                            <a href="/speedtyping" class="btn btn-primary start-0 me-5">Play Again</a>
                            <a href="/leaderboard" class="btn btn-secondary start-end">View Leaderboard</a>
                        </div>
                    </div>
                </div>

            )}
        </div>
    )
}

export default SpeedTyping;
