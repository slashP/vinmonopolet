import * as React from 'react'
import StoreStock from './StoreStock';
import StarRating from './StarRating';
import styles from './styles.css';

const BeerCard = ({ beer, activeStores }) => {
    return (
        <div style={styles.beerCard} onClick={() => window.open(`https://untappd.com/beer/${beer.untappdId}`)}>
            <img alt="Logo" style={styles.beerLogo} src={beer.labelUrl || "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"}></img>
            <ul style={styles.beerProps}>
                <StarRating rating={beer.averageScore} />
                <li style={styles.beerName}>{beer.name}</li>
                <li className="price">{beer.abv.toFixed(1)} % | {beer.price.toFixed(2)} kr</li>
                <StoreStock stocks={beer.storeStocks} activeStores={activeStores} />
            </ul>
        </div>
    )
}

export default BeerCard;