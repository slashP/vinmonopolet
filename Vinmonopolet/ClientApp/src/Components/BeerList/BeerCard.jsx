import * as React from 'react'
import StoreStock from './StoreStock';
import StarRating from './StarRating';
import styles from './styles.css';

const BeerCard = ({ beer, activeStores }) => {
    return (
        <div style={styles.beerCard}>
            <div style={styles.beerProps}>
                <div style={styles.cardTopbar}>
                    <StarRating rating={beer.averageScore} />
                    <img alt="UntappdLink" style={styles.externalLink} src="https://upload.wikimedia.org/wikipedia/commons/9/92/Untappd.svg" onClick={() => window.open(`https://untappd.com/beer/${beer.untappdId}`)} ></img>
                    <img alt="VinmonopoletLink" style={styles.externalLink} src="https://upload.wikimedia.org/wikipedia/en/e/e4/Vinmonopolet_logo.svg" onClick={() => window.open(`https://www.vinmonopolet.no/p/${beer.materialNumber}`)} ></img>
                </div>
                <div style={styles.beerName}>{beer.name}</div>
                <div style={styles.price}>{beer.abv.toFixed(1)} % | {beer.price.toFixed(2)} kr</div>
                <div >
                    <img alt="Logo" style={styles.beerLogo} src={beer.labelUrl || "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"}></img>
                    <StoreStock stocks={beer.storeStocks} activeStores={activeStores} />
                </div>
            </div>
        </div>
    )
}

export default BeerCard;