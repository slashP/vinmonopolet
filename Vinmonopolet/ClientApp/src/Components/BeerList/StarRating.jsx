import React from 'react'

const StarRating = ({ rating }) => {
    let widthCorRating = (rating / 5) * 75 || 0;
    return (
        //basesize : 25 x 115 = 1:4,6
        <div className="rating-container">
            <svg height="15" width="75" xmlns="http://www.w3.org/2000/svg" className="rating-svg">
                <defs>
                    <pattern id="stars" x="1" y="1" height="15" width="15" patternUnits="userSpaceOnUse">
                        <svg viewBox="1 1 22 22" height="15" width="15">
                            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" fill="orange" />
                        </svg>
                    </pattern>
                </defs>
                <rect height="15" width={widthCorRating} stroke="orange0" fill="url(#stars)" />
                <text className="rating-text" x="5" y="15" fontWeight="bold" fontSize="14" fill="black">{rating && rating.toFixed(2)}</text>
            </svg>
        </div>
    )
}

export default StarRating;