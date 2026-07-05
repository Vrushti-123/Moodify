import React from 'react'
import { useSong } from '../hooks/useSong'
import './Playlist.scss'

const Playlist = ({ mood }) => {
    const { playlist, song, handleSelectSong } = useSong()

    return (
        <aside className="playlist">
            <div className="playlist__header">
                <span className="playlist__icon">
                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                        <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="6" cy="18" r="3" stroke="currentColor" strokeWidth="1.8" />
                        <circle cx="18" cy="16" r="3" stroke="currentColor" strokeWidth="1.8" />
                    </svg>
                </span>
                <div className="playlist__heading">
                    <h3 className="playlist__title">Your Mood Playlist</h3>
                    <p className="playlist__subtitle">
                        {mood
                            ? `Shuffled from your uploads · ${mood}`
                            : 'Detect your mood to get started'}
                    </p>
                </div>
            </div>

            <div className="playlist__list">
                {playlist.length === 0 && (
                    <p className="playlist__empty">
                        {mood
                            ? "No uploaded songs found for this mood yet."
                            : "Your shuffled playlist will show up here."}
                    </p>
                )}

                {playlist.map((item) => {
                    const isActive = song && item._id === song._id

                    return (
                        <button
                            key={item._id}
                            className={`playlist__item ${isActive ? 'playlist__item--active' : ''}`}
                            onClick={() => handleSelectSong(item)}
                        >
                            <img className="playlist__poster" src={item.posterURL} alt={item.title} />

                            <div className="playlist__meta">
                                <span className="playlist__song-title">{item.title}</span>
                                <span className="playlist__song-mood">{item.mood}</span>
                            </div>

                            <span className="playlist__play-indicator">
                                {isActive ? (
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <rect x="6" y="4" width="4" height="16" rx="1" />
                                        <rect x="14" y="4" width="4" height="16" rx="1" />
                                    </svg>
                                ) : (
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <path d="M8 5.14v14l11-7-11-7z" />
                                    </svg>
                                )}
                            </span>
                        </button>
                    )
                })}
            </div>
        </aside>
    )
}

export default Playlist
