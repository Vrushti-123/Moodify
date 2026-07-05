import React, { useState, useRef, useEffect } from 'react'
import FaceExpression from '../../Expression/components/FaceExpression'
import Player from '../components/Player'
import Navbar from '../components/Navbar'
import MoodDisplay from '../components/MoodDisplay'
import Playlist from '../components/Playlist'
import { useSong } from "../hooks/useSong"
import './home.scss'

const Home = () => {

    const { song, handleGetSong } = useSong()
    const [mood, setMood] = useState(null)

    const leftColumnRef = useRef(null)
    const [matchedHeight, setMatchedHeight] = useState(null)

    // Expression Capture card ki actual (rendered) height ko measure karke,
    // wahi height playlist column par bhi laga dete hai — taaki dono hamesha
    // ek jaisi height rakhein, chahe playlist mein kitne bhi songs aa jaayein
    useEffect(() => {
        const el = leftColumnRef.current
        if (!el) return

        const updateHeight = () => setMatchedHeight(el.offsetHeight)
        updateHeight()

        const observer = new ResizeObserver(updateHeight)
        observer.observe(el)

        return () => observer.disconnect()
    }, [])

    function handleExpressionDetected(expression) {
        setMood(expression)
        handleGetSong(expression)
    }

    return (
        <div className="home-page">
            <Navbar />

            <div className="home-page__content">

                <div className="home-page__column home-page__column--left" ref={leftColumnRef}>
                    <FaceExpression
                    onClick={handleExpressionDetected} />
                </div>

                <div className="home-page__column home-page__column--center">
                    <MoodDisplay mood={mood} />
                    <Player/>
                </div>

                <div
                    className="home-page__column home-page__column--right"
                    style={matchedHeight ? { height: `${matchedHeight}px` } : undefined}
                >
                    <Playlist mood={mood} />
                </div>

            </div>
        </div>
    )
}

export default Home