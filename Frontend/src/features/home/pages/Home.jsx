import React, { useState } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import Navbar from '../components/Navbar'
import MoodDisplay from '../components/MoodDisplay'
import { useSong } from "../hooks/useSong"
import './home.scss'

const Home = () => {

    const { song, handleGetSong } = useSong()
    const [mood, setMood] = useState(null)

    function handleExpressionDetected(expression) {
        setMood(expression)
        handleGetSong(expression)
    }

    return (
        <div className="home-page">
            <Navbar />

            <div className="home-page__content">
                <FaceExpression
                onClick={handleExpressionDetected} />

                <MoodDisplay mood={mood} />
            </div>

            <Player/>
        </div>
    )
}

export default Home
