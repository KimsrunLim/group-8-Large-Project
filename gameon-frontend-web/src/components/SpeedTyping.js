import { useState } from "react";

function SpeedTyping()
{
    const display = ["Display text"];
    const [input, setInput] = useState('');
    const [index, setIndex] = useState(0);
    const [mistakes, setMistakes] = useState(0);
    const [WPM, setWPM] = useState(0);
    const [timer, setTimer] = useState(60);

    const keyPress = (event) => {
        setInput(event.input)
        if (event.input === 'Backspace' && index > 0) {
            --index;
            display[index].classList.remove('correct', 'incorrect');
        }
        else {
            if (event.key === display.charAt[index]) {
                display[index].classList.add('correct');
                display[index].classList.remove('incorrect');
            }
            else {
                display[index].classList.add('incorrect');
                display[index].classList.remove('correct');
            }
            if (index < display.length - 1) {
                ++index;
            }
        }
    }

    return (
        <p>typeRacer game</p>
    )
}

export default SpeedTyping;