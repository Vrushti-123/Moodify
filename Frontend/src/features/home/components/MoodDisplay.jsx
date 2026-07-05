import React from 'react'
import './MoodDisplay.scss'

const MOOD_EMOJIS = {
    happy: '😄',
    sad: '😢',
    surprised: '😮',
    neutral: '😐',
}

const MoodDisplay = ({ mood }) => {
    const displayMood = mood || 'Awaiting detection'
    const emoji = mood ? (MOOD_EMOJIS[mood.toLowerCase()] || '🙂') : '🙂'

    return (
        <div className="mood-display">
            <div className="mood-display__text">
                <span className="mood-display__eyebrow">Current Mood Analysis</span>
                <h2 className="mood-display__value">{displayMood}</h2>
                <div className="mood-display__bar">
                    <div className="mood-display__bar-fill" />
                </div>
            </div>

            <div className="mood-display__emoji-wrap">
                <span className="mood-display__emoji">{emoji}</span>
            </div>
        </div>
    )
}

export default MoodDisplay