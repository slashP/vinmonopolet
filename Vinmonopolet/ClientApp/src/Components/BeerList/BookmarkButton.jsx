import React from 'react';
import styles from './styles.css';

const BookmarkButton = (props) => {
    if (props.bookmarks && props.bookmarks.includes(props.materialNumber)) {
        return (
            <div className="bookmark-button" style={styles.bookmarkButton} title="Remove from bookmarks" onClick={() => props.removeBookmark(props.materialNumber)}>
                <svg viewBox="62 62 395 395">
                    <path fill="#bbb" d="M355.148,234.386H156.852c-10.946,0-19.83,8.884-19.83,19.83s8.884,19.83,19.83,19.83h198.296    c10.946,0,19.83-8.884,19.83-19.83S366.094,234.386,355.148,234.386z" />
                </svg>
            </div>
        )
    } else {
        return (
            <div className="bookmark-button" style={styles.bookmarkButton} title="Add to bookmarks" onClick={() => props.addBookmark(props.materialNumber)} >
                <svg viewBox="-4 -4 28 28">
                    <path stroke="#bbb" fill="#eee" strokeWidth="1px" d="M15 1H5a2 2 0 0 0-2 2v16l7-5 7 5V3a2 2 0 0 0-2-2z" />
                </svg>
            </div>
        )
    }
}

export default BookmarkButton;