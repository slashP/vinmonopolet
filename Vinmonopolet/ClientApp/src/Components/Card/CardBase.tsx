import React, { useState, useContext } from 'react'
import { Beer, StoreStock } from '../../Types/BeerTypes';

import styles from './styles/CardBase.module.css'
import CardFront from './CardFront';
import BeerLabel from './BeerLabel'
import StockCard from './StockCard';
import FilterContext from '../../Contexts/FilterContext';

interface Props {
    beer: Beer,
}

const CardBase: React.FC<Props> = ({ beer }) => {
    const filterContext = useContext(FilterContext);
    const [showFront, setShowFront] = useState(true)

    const storeString = (stock: StoreStock) => "" + stock.storeName + " : " + stock.stockLevel;

    const sortedStocks = beer.storeStocks.sort((a,b) => b.stockLevel - a.stockLevel);
    const inselectedStores = sortedStocks.filter(x => filterContext.state.store.includes(x.storeId));
    const nonSelectedStores = sortedStocks.filter(x => !filterContext.state.store.includes(x.storeId));
    const selectedStoreString = inselectedStores.length > 0 ? inselectedStores.map(x => storeString(x)).concat("\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015\u2015") : [];

    const tooltipTitle = selectedStoreString.concat(nonSelectedStores.map(x => storeString(x))).join("\n");

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