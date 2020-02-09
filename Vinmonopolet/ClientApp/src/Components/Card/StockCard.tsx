import React, { useContext } from 'react'
import { Beer } from '../../Types/BeerTypes'

import styles from './styles/StockCard.module.css'
import FilterContext from '../../Contexts/FilterContext';

interface Props {
    beer: Beer,
}

const lastNameInString = (s: string) => {
    const splitArray = s.split(',');
    return splitArray[splitArray.length - 1]
}

const StockCard: React.FC<Props> = ({ beer }) => {
    const filterContext = useContext(FilterContext);
    const filteredStores = () => {
        let stocks = beer.storeStocks;
        if(filterContext.state.store.length > 0) {
            stocks = stocks.filter(x => filterContext.state.store.includes(x.storeId))
        }
        return stocks;
    }

    return (
        <div className={styles.stockContent}>
            {
                filteredStores()
                    .sort((a, b) => b.stockLevel - a.stockLevel)
                    .map(x => <div key={x.storeId + beer.materialNumber}> {lastNameInString(x.storeName)}:{x.stockLevel.toString().padStart(3, '\xa0')} </div>)
            }
        </div>
    )
}

export default StockCard
