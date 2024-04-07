import { useState, useEffect } from 'react';

const CircularProgress = ({ value, maxValue }) => {
    const [leftProgress, setLeftProgress] = useState({ transform: 'rotate(0deg)' });
    const [rightProgress, setRightProgress] = useState({ transform: 'rotate(0deg)' });

    const percentage = (value / maxValue) * 100;
    const degrees = (percentage / 100) * 360;

    useEffect(() => {
        if (percentage <= 50) {
            setRightProgress({ transform: `rotate(${degrees}deg)` });
        } else {
            setRightProgress({ transform: 'rotate(180deg)' });
            setLeftProgress({ transform: `rotate(${degrees - 180}deg)` });
        }
    }, [percentage, degrees]);

    return (
        <div className="progress mx-auto" data-value={percentage}>
            <span className="progress-left">
                <span className="progress-bar border-primary" style={leftProgress}></span>
            </span>
            <span className="progress-right">
                <span className="progress-bar border-primary" style={rightProgress}></span>
            </span>
            <div className="progress-value w-100 h-100 rounded-circle d-flex align-items-center justify-content-center">
                <div className="font-weight-bold">{value}<sup>%</sup></div>
            </div>
        </div>
    );
};