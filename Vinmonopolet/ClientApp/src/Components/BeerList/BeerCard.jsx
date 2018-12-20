import * as React from 'react'
import StoreStock from './StoreStock';
import StarRating from './StarRating';
import styles from './styles.css';
import NewTag from './NewTag';
import BookmarkButton from './BookmarkButton';

const BeerCard = ({ beer, activeStores, bookmarks, addBookmark, removeBookmark }) => {
    var abvString = () => beer.abv > 0 && (beer.abv.toFixed(1) + " %");
    var volumeString = () => beer.volume > 0 && (beer.volume.toFixed(1) + " cl");
    var priceString = () => beer.price > 0 && (beer.price.toFixed(0) + " kr");

    return (
        <div className="beerCard" style={styles.beerCard}>
            <div style={styles.beerProps}>
                <div style={styles.cardTopbar}>
                    <StarRating rating={beer.averageScore} />
                    <img alt="UntappdLink" style={styles.externalLink} src="https://upload.wikimedia.org/wikipedia/commons/9/92/Untappd.svg" onClick={() => window.open(`https://untappd.com/beer/${beer.untappdId}`)} ></img>
                    <img alt="VinmonopoletLink" style={styles.externalLink} src="https://upload.wikimedia.org/wikipedia/en/e/e4/Vinmonopolet_logo.svg" onClick={() => window.open(`https://www.vinmonopolet.no/p/${beer.materialNumber}`)} ></img>
                    {beer.onNewProductList && <NewTag />}
                </div>
                <div style={styles.brewery}>{beer.brewery || '\u00A0'}</div>
                <div style={styles.beerName} title={beer.name}>{beer.name}</div>
                <div style={styles.price}>{abvString()} - {volumeString()}  - {priceString()}</div>
                <div >
                    <img alt="Logo" style={styles.beerLogo} src={beer.labelUrl || "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"}></img>
                    <StoreStock stocks={beer.storeStocks} activeStores={activeStores} />
                </div>
            </div>
            <BookmarkButton materialNumber={beer.materialNumber} bookmarks={bookmarks} addBookmark={addBookmark} removeBookmark={removeBookmark} />
        </div>
    )
}

export default BeerCard;