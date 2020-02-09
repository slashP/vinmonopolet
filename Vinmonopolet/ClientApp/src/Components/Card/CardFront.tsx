import React from 'react'

import styles from './styles/CardFront.module.css';

import { Beer } from '../../Types/BeerTypes'
import StarRating from './StarRating'


interface Props {
    beer: Beer;
}

const CardFront: React.FC<Props> = ({ beer }) => {
    const [primaryStyle, secondaryStyle] = beer.style ? [beer.style.split(' - ')[0], beer.style.split(' - ')[1]] : ['', ''];

    return (
        <>
            <div className={styles.topRow}>
                <StarRating rating={beer.averageScore} />
                <div className={styles.baseStats}>
                    {beer.abv} % - {beer.volume} cl - {Math.round(beer.price)} kr
                </div>
            </div>
            <div className={styles.brewery}>
                {beer.brewery}
            </div>
            <div className={styles.name}>
                {beer.name}
            </div>
            <div className={styles.style}>
                <span className={styles.primaryStyle}>{primaryStyle}</span><span className={styles.secondaryStyle}>{secondaryStyle || '-'}</span>
            </div>
        </>
    )
}

export default CardFront
