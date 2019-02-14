import * as React from 'react'
import StoreStock from './StoreStock';
import StarRating from './StarRating';
import linestyles from './linestyles.css'

const BeerCard = ({ beer, activeStores, bookmarks, addBookmark, removeBookmark }) => {
    var abvString = () => beer.abv > 0 && (beer.abv.toFixed(1) + " %");
    var volumeString = () => beer.volume > 0 && (beer.volume.toFixed(1) + " cl");
    var priceString = () => beer.price > 0 && (beer.price.toFixed(0) + " kr");

    return (
        <div className="beerLine" style={linestyles.beerLine}>
                <img alt="Logo" style={linestyles.beerLogo} src={beer.labelUrl || "https://untappd.akamaized.net/site/assets/images/temp/badge-beer-default.png"}></img>
                <StarRating rating={beer.averageScore} />
                <div style={linestyles.brewery}>{beer.brewery || '\u00A0'}</div>
                <div style={linestyles.beerName} title={beer.name}>{beer.name}</div>
                <div style={linestyles.price}>{abvString()} - {volumeString()}  - {priceString()}</div>
                <div style={linestyles.stockwrapper}>
                    <StoreStock style={linestyles.storestock} lineview stocks={beer.storeStocks} activeStores={activeStores} />
                </div>
                <div style={linestyles.endbuttons}>
                { (bookmarks && bookmarks.includes(beer.materialNumber)) ?
                    <div className="bookmark-button" style={linestyles.externalLink} title="Remove from bookmarks" onClick={() => removeBookmark(beer.materialNumber)}>
                        <svg viewBox="62 62 395 395">
                            <path fill="#bbb" d="M355.148,234.386H156.852c-10.946,0-19.83,8.884-19.83,19.83s8.884,19.83,19.83,19.83h198.296    c10.946,0,19.83-8.884,19.83-19.83S366.094,234.386,355.148,234.386z" />
                        </svg>
                    </div>
                    :
                <div className="bookmark-button" style={linestyles.externalLink} title="Add to bookmarks" onClick={() => addBookmark(beer.materialNumber)} >
                    <svg viewBox="-4 -4 28 28">
                        <path stroke="#bbb" fill="#eee" strokeWidth="1px" d="M15 1H5a2 2 0 0 0-2 2v16l7-5 7 5V3a2 2 0 0 0-2-2z" />
                    </svg>
                </div>
                } 
                {beer.untappdId && <img alt="UntappdLink" style={linestyles.externalLink} src="https://upload.wikimedia.org/wikipedia/commons/9/92/Untappd.svg" onClick={() => window.open(`https://untappd.com/beer/${beer.untappdId}`)} ></img>}
                <img alt="VinmonopoletLink" style={linestyles.externalLink} src="https://upload.wikimedia.org/wikipedia/en/e/e4/Vinmonopolet_logo.svg" onClick={() => window.open(`https://www.vinmonopolet.no/p/${beer.materialNumber}`)} ></img>
            </div>
        </div>
    )
}

export default BeerCard;