import React from 'react'
import { Beer } from '../../Types/BeerTypes';

import styles from './styles/CardFront.module.css'

const defaultLabel = "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"

interface Props {
    beer: Beer;
}

const BeerLabel: React.FC<Props> = ({ beer }) => {
    const setFallback = (e: any) => {
        e.target.src = defaultLabel;
    }

    const labelPicSrc = beer.untappdId ? beer.labelUrl : defaultLabel;


    return (
        <a href={"https://untappd.com/beer/"+ beer.untappdId} target="_blank" rel="noopener noreferrer" className={styles.labelWrapper}>
            <img className={styles.labelImage} src={labelPicSrc} onError={setFallback} alt="Loading..." />
        </a>
    )
}

export default BeerLabel
