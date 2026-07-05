import React, { useRef, useState, useEffect, useContext } from 'react'
import { SongContext } from '../song.context'
import { useSong } from '../hooks/useSong'
import './player.scss'

const SPEED_OPTIONS = [0.5, 0.75, 1, 1.25, 1.5, 2]

const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

const Player = () => {
    const { song, handleNextSong, handlePrevSong } = useSong()

    const audioRef = useRef(null)
    const progressRef = useRef(null)

    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [speed, setSpeed] = useState(1)
    const [volume, setVolume] = useState(1)
    const [showSpeed, setShowSpeed] = useState(false)
    const [isMuted, setIsMuted] = useState(false)

    // Reset player when song changes, then try to auto-play it
    // (covers: mood-detected song, playlist selection, and next/prev navigation)
    useEffect(() => {
        const audio = audioRef.current
        if (audio) {
            audio.load()
            setCurrentTime(0)

            const playPromise = audio.play()
            if (playPromise) {
                playPromise
                    .then(() => setIsPlaying(true))
                    .catch(() => setIsPlaying(false))
                    // agar browser ne autoplay block kar diya (bina user gesture ke),
                    // toh bas paused state mein rehne do, user manually play dabaayega
            }
        }
    }, [song?.url])

    const togglePlay = () => {
        const audio = audioRef.current
        if (!audio) return
        if (isPlaying) {
            audio.pause()
        } else {
            audio.play()
        }
        setIsPlaying(!isPlaying)
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime)
    }

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration)
    }

    const handleProgressClick = (e) => {
        const bar = progressRef.current
        const rect = bar.getBoundingClientRect()
        const ratio = (e.clientX - rect.left) / rect.width
        const newTime = ratio * duration
        audioRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    const handleSpeedChange = (s) => {
        setSpeed(s)
        audioRef.current.playbackRate = s
        setShowSpeed(false)
    }

    const handleVolume = (e) => {
        const val = parseFloat(e.target.value)
        setVolume(val)
        audioRef.current.volume = val
        setIsMuted(val === 0)
    }

    const toggleMute = () => {
        const audio = audioRef.current
        if (isMuted) {
            audio.volume = volume || 0.5
            setIsMuted(false)
        } else {
            audio.volume = 0
            setIsMuted(true)
        }
    }

    const handleSongEnd = () => {
        setIsPlaying(false)
        setCurrentTime(0)

        // current song khatam hote hi, playlist mein se agla song apne aap chala do
        handleNextSong()
    }

    const progress = duration ? (currentTime / duration) * 100 : 0

    if (!song) return null

    return (
        <div className="player-card">
            <audio
                ref={audioRef}
                src={song.url}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={handleSongEnd}
            />

            {/* Poster + Info */}
            <div className="player-card__top">
                <img
                    className="player-card__poster"
                    src={song.posterURL}
                    alt={song.title}
                />
                <div className="player-card__meta">
                    <span className="player-card__mood">{song.mood}</span>
                    <p className="player-card__title">{song.title}</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="player-card__progress-wrap">
                <div
                    className="player-card__progress"
                    ref={progressRef}
                    onClick={handleProgressClick}
                >
                    <div className="player-card__progress-fill" style={{ width: `${progress}%` }} />
                    <div className="player-card__progress-thumb" style={{ left: `${progress}%` }} />
                </div>
                <div className="player-card__time-row">
                    <span className="player-card__time">{formatTime(currentTime)}</span>
                    <span className="player-card__time">{formatTime(duration)}</span>
                </div>
            </div>

            {/* Controls */}
            <div className="player-card__controls">

                {/* Speed picker */}
                <div className="player-card__speed-wrap">
                    <button
                        className="player-card__btn player-card__btn--speed"
                        onClick={() => setShowSpeed(!showSpeed)}
                        title="Playback speed"
                    >
                        {speed}×
                    </button>
                    {showSpeed && (
                        <div className="player-card__speed-menu">
                            {SPEED_OPTIONS.map((s) => (
                                <button
                                    key={s}
                                    className={`player-card__speed-option ${s === speed ? 'active' : ''}`}
                                    onClick={() => handleSpeedChange(s)}
                                >
                                    {s}×
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Previous track */}
                <button className="player-card__btn player-card__btn--track" onClick={handlePrevSong} title="Previous song">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
                    </svg>
                </button>

                {/* Play / Pause */}
                <button className="player-card__btn player-card__btn--play" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
                    {isPlaying ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                            <rect x="6" y="4" width="4" height="16" rx="1"/>
                            <rect x="14" y="4" width="4" height="16" rx="1"/>
                        </svg>
                    ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
                            <path d="M8 5.14v14l11-7-11-7z"/>
                        </svg>
                    )}
                </button>

                {/* Next track */}
                <button className="player-card__btn player-card__btn--track" onClick={handleNextSong} title="Next song">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M16 6h2v12h-2zM6 18l8.5-6L6 6z"/>
                    </svg>
                </button>

                {/* Volume */}
                <div className="player-card__volume">
                    <button className="player-card__btn player-card__btn--vol" onClick={toggleMute} title="Mute">
                        {isMuted || volume === 0 ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.87 8.87 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06A8.99 8.99 0 0 0 17.73 18L19 19.27 20.27 18 5.27 3 4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                            </svg>
                        )}
                    </button>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        value={isMuted ? 0 : volume}
                        onChange={handleVolume}
                        className="player-card__volume-slider"
                    />
                </div>
            </div>
        </div>
    )
}

export default Player