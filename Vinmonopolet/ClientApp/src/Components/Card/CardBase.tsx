import React, { useState } from 'react'
import { Beer } from '../../Types/BeerTypes';

import styles from './styles/CardBase.module.css'
import CardFront from './CardFront';
import BeerLabel from './BeerLabel'
import StockCard from './StockCard';

interface Props {
    beer: Beer,
}

const CardBase: React.FC<Props> = ({ beer }) => {
    const [showFront, setShowFront] = useState(true)
    
    let tooltipTitle = beer.storeStocks.sort((a,b) => b.stockLevel - a.stockLevel).map(stock => "" + stock.storeName + " : " + stock.stockLevel + " \n").join("");

    return (
        <div className={styles.wrapping}>
            <div className={styles.setup} title={tooltipTitle}>
                <BeerLabel beer={beer} />
                <div className={styles.content} onClick={() => setShowFront(!showFront)}>
                    {
                        showFront ?
                        <CardFront beer={beer} /> :
                        <StockCard beer={beer} />
                    }
                </div>
            </div>
        </div>
    )
}

export default CardBase