import React from 'react';
import styles from './styles.css';


const StoreStock = ({ stocks, activeStores }) => {
    stocks.sort((a, b) => b.stockLevel - a.stockLevel)
    let filteredStocks = stocks.filter(x => activeStores.includes(x.storeId));
    let showStocks = filteredStocks.length > 4 ? filteredStocks.slice(0, 4) : stocks;
    let tooltipTitle = stocks.map(stock => "" + stock.storeName + " : " + stock.stockLevel + " \n").join("");

    if (!activeStores.length) {
        return (
            <div title={tooltipTitle} style={styles.storeStock}>
                <ul style={styles.stockList}>
                    {stocks.slice(0, 4).map(stock =>
                        <li key={stock.storeName}>{stock.storeName} : {stock.stockLevel}</li>
                    )}
                </ul>
            </div>
        )
    } else {
        return (
            <div title={tooltipTitle} style={styles.storeStock}>
                <ul style={styles.stockList}>
                    {showStocks.map(stock =>
                        activeStores.includes(stock.storeId) && <li key={stock.storeName}>{stock.storeName} : {stock.stockLevel}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default StoreStock;