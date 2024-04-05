import { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; 

function SpeedTyping() {
    const [input, setInput] = useState('');
    const [index, setIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [timer, setTimer] = useState(60);
    const [words, setWords] = useState('');
    const [typed, setTyped] = useState([]); // track typed input w/ validity
    const textDisplayRef = useRef(null); // text scrolling helper
    
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

    // Generate random words string.
    const generateWords = () => {
        const wordCount = 100;
        let result = [];

        for (let i = 0; i < wordCount; i++) {
            // add randomly generated word at the end of result array
            result.push(wordList[Math.floor(Math.random() * wordList.length)]);
        }

        return result.join(' '); // stringify result 
    }

    // Generate words list, start list at center, and set up timer/WPM calculation.
    // useEffect with empty []: run only once on mount/unmount.
    useEffect(() => {
        setWords(generateWords);

        // When nonzero, decrement timer by 1000 ms (1 s).
        // When zero, clear timer history (avoid memory leaks) & calculate WPM.
        const timer = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(timer);
                    
                    const typedWords = typed.length;
                    setWPM((typedWords / (60 - prevTimer)) * 60);
                }

                return 0;
            });
        }, 1000);

        // clear interval on component unmount
        return () => clearInterval(timer);
    }, []);

    // Calculate character width dynamically using a wide character ('M') and temp span element.
    const getCharacterWidth = () => {
        const tempSpan = document.createElement('span');
        tempSpan.style.fontFamily = 'monospace';
        tempSpan.innerHTML = 'M';
        textDisplayRef.current.appendChild(tempSpan);
        const charWidth = tempSpan.offsetWidth;
        textDisplayRef.current.removeChild(tempSpan);
        return charWidth;
    };

    // Enforce leftward text scroll.
    // useEffect with [index]: runs when 'index' changes.
    useEffect(() => {
        const charWidth = getCharacterWidth(); 
        let translation = index * charWidth; // translate based on index & char width

        // calc additional offset for spaces
        const halfSpaceWidth = charWidth / 2;
        const typedChars = typed.slice(0, index); // get typed chars up to index
        const spaceCount = typedChars.filter(({char}) => char === ' ').length;
        const reductionOffset = spaceCount * halfSpaceWidth;

        // apply additional space offset to translation
        translation -= reductionOffset;

        textDisplayRef.current.style.transform = `translateX(-${translation}px)`;
    }, [index]); 

    // Validate last user-entered character then reset input. 
    const keyPress = (event) => {
        const input = event.target.value;
        const correctChar = words.charAt(index);
        const isValid = (input === correctChar);

        // update typed history
        // ...prev retrieves all previous typed history
        setTyped((prev) => [...prev, { char: input, isCorrect: isValid }, ]);

        // validate character
        if (!isValid) {
            setMistakes((prevMistakes) => prevMistakes + 1);
        }

        setIndex(prevIndex => prevIndex + 1);

        setInput('');
    };

    // Render each character of the words list with validity styling.
    // .reduce(acc, char, i): execute logic for every char via index i and store calls in accumulator
    const renderedWords = words.split('').map((char, i) => {
        // defaults
        let charClass = ""; 
        let style = {};

        const typedChar = typed[i];
        if (typedChar) {
            charClass = typedChar.isCorrect ? "text-success" : "text-danger";
        }

        // make spaces visible
        if (char === ' ') {
            style = { paddingRight: '0.4em' };
        }

        return (<span key={i} className={charClass} style={style}>{char}</span>);
    });

    // Bootstrap styles
    let cardStyles = "justify-content-center m-3 p-3 pt-1 fs-1 w-100 h-100 overflow-auto font-monospace";
    let wordStyles = "position-relative start-50 pt-4 overflow-visible border-0 d-flex flex-row align-items-flex-start";
    let inputAreaStyles = "position-absolute start-50 border-0 mt-4 mb-2 fs-1";

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            {/* Header */}
            <div id="header" className="row text-center mt-5 pt-5 mb-4">
                <h1 id="title" className="mb-4 fw-bolder">TypeRacer Game</h1>
                <p>Timer: {timer}</p>
            </div>

            {/* Body */}
            <div id="text-container" className={`card ${cardStyles}`}>
                <div id="displayed-words"
                    ref={textDisplayRef}
                    className={wordStyles}
                    style={{ height: '5rem' }}
                >
                    {renderedWords}
                </div>
                
                <textarea id="user-input"
                    className={`form-control ${inputAreaStyles}`}
                    style={{
                        width: '2%', boxShadow: 'none', resize: 'none',
                        backgroundColor: 'rgba(97, 179, 207, 0.4)'
                    }}
                    value={input}
                    onChange={keyPress}
                    autoFocus
                    rows="1"
                    disabled={timer === 0} // popup: score + popup to leaderboard?
                />
            </div>

            {/* Footer */}
            <div id="stats" className="text-center mt-5">
                <p>Mistakes: {mistakes}</p>
                {timer === 0 && <p>Words per minute (WPM): {WPM.toFixed(2)}</p>}
            </div>
        </div>
    )
}

export default SpeedTyping;