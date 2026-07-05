import React from 'react'
import './MoodDisplay.scss'

const MoodDisplay = ({ mood }) => {
    const displayMood = mood || 'Awaiting detection'

    return (
        <div className="mood-display">
            <span className="mood-display__eyebrow">Current Mood Analysis</span>
            <h2 className="mood-display__value">{displayMood}</h2>
            <div className="mood-display__bar">
                <div className="mood-display__bar-fill" />
            </div>
        </div>
    )
}

export default MoodDisplay
