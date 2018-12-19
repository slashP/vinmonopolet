import React from 'react';
import styles from './styles.css';


const StoreStock = ({ stocks, activeStores }) => {
    stocks.sort((a, b) => b.stockLevel - a.stockLevel)
    let showStocks = stocks.length > 4 ? stocks.slice(0, 2) : stocks;
    let tooltipTitle = stocks.map(stock => "" + stock.storeName + " : " + stock.stockLevel + " \n").join("");

    if (!activeStores.length) {
        return (
            <div title={tooltipTitle} style={styles.storeStock}>
                <ul style={styles.stockList}>
                    {showStocks.map(stock =>
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