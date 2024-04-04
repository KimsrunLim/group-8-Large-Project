import { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'; // *

// NOTES:
// * prevIndex & prevMistakes are built into react like setIndex & setMistakes are
// * === checks equality of value AND type
// * !== checks inequality of value AND type
// * useEffect: run once on start (mount) and clean up on end (unmount)
//   * ends with [] to ...


function SpeedTyping() {
    // const phrase = ["Display text"]; 
    const [input, setInput] = useState('');
    const [index, setIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [timer, setTimer] = useState(60);
    const [words, setWords] = useState('');

    const wordList = [
        "the", "be", "to", "of", "and", "a", "in", "that", "have", "I",
        "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
        "this", "but", "his", "by", "from", "they", "we", "say", "her", "she",
        "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
        "so", "up", "out", "if", "about", "who", "get", "which", "go", "me",
        "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
        "people", "into", "year", "your", "good", "some", "could", "them", "see", "other",
        "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
        "back", "after", "use", "two", "how", "our", "work", "first", "well", "way",
        "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
        "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew",
        "car", "tree", "house", "love", "animal", "sun", "moon", "star", "book", "phone",
        "computer", "music", "movie", "water", "food", "friend", "family", "child", "life", "world",
        "school", "state", "city", "country", "problem", "solution", "information", "history", "woman", "man",
        "child", "adult", "student", "teacher", "mother", "father", "sister", "brother", "daughter", "son"
    ];

    // track current position in word list; MIGHT USE IN FUTURE
    // const [currWordIndex, setCurrWordIndex] = useState(0); 

    // sets fixed words list & timer duration during session 
    useEffect(() => {
        const wordCount = 100;

        // generate random words to screen
        const generateWords = () => {
            let result = [];

            // change bound for more words
            for (let i = 0; i < wordCount; i++)
            {
                // add randomly generated word at the end of typingText array 
                result.push(wordList[Math.floor(Math.random() * wordList.length)]);
            }

            return result.join(' '); // spaces between
        };

        setWords(generateWords);

        // set timer interval at 1000 milliseconds (1 second) & decrement every second
        const countdown = setInterval(() => {
            // get previous timer state, 
            setTimer(prevTimer => {
                // timer non-zero: decrement timer  
                if (prevTimer > 0) return prevTimer - 1;

                // timer zero: 
                
                clearInterval(countdown); // clear timer

                // calculate WPM on timer end
                const typedWords = input.trim().split(' ').length;
                setWPM((typedWords / (60 - prevTimer)) * 60);

                return 0;
            });
        }, 1000);

        // ensure timer cleared (avoid memory leaks)
        return () => clearInterval(countdown);
    }, []);

    const keyPress = (event) => {
        const value = event.target.value;
        setInput(value);

        const typedChar = value.charAt(value.length - 1);

        // if within bounds, expected char = curr char in words string 
        let expectedChar = (index < words.length) ? words.charAt(index) : '';

        if (typedChar === expectedChar)
        {
            setIndex(prevIndex => prevIndex + 1); // skip space
            
            /* MIGHT USE IN FUTURE
            if (typedChar === ' ') {
                setCurrWordIndex(prevIndex => prevIndex + 1); // mark word
            } */
        }
        else
        {
            setMistakes((prevMistakes) => prevMistakes + 1);
        }

        setInput('');

        /* implement?
        if (event.key == 'Backspace' && index > 0)
        {
            // move left on backspace
            setIndex(index - 1);
            // allow user to undo mistake? 
        }
        */
    };

    let textAreaStyles = "z-10 fs-1 start-0 top-0 h-50 w-50";

    return (
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center">
            {/* Header */}
            <div className="title row text-center mt-5 pt-5 mb-4">
                <h1 className="title mb-4 fw-bolder">TypeRacer Game</h1>
                <p>Timer: {timer}</p>
            </div>

            {/* Body */}
            <div className="row text-display-container justify-content-center m-3 p-3 fs-1">
                <div id="one" className="typed-chars col-6 border pt-3" style={{ height: '5rem' }}>
                    {/* display part of words string that user already typed */}
                    <span className="typed-chars text-muted">{words.substring(0, index)}</span>
                </div>
                <div id="two" className="user-input col-6 pt-3 border overflow-hidden" style={{ height: '5rem' }}>
                    {/* next char */}
                    <span className="current-char text-primary fw-bold">
                        {words.substring(index, index + 1)}
                    </span>

                    {/* display part of words string that user hasn't typed*/}
                    <span className="next-char text-muted overflow-hidden" area-hidden="true" >
                        {/* {words.substring(index + 1)} COMMENTED OUT FOR TESTING */}
                    </span>

                    <textarea
                        className={`form-control ${textAreaStyles}`}
                        value={input}
                        onChange={keyPress}
                        autoFocus
                        // disabled={timer === 0}
                    />
                </div>
            </div>

            {/* Footer */}
            <div className="stats text-center mt-5">
                <p>Mistakes: {mistakes}</p>
                {timer === 0 && <p>Words per minute (WPM): {WPM.toFixed(2)}</p>}
            </div>
        </div>
    )
}

export default SpeedTyping;