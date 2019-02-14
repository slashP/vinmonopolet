import React from 'react';
import styles from './styles.css';
import linestyles from './linestyles.css'


const StoreStock = ({ stocks, activeStores, lineview }) => {
    stocks.sort((a, b) => b.stockLevel - a.stockLevel)
    let filteredStocks = stocks.filter(x => activeStores.includes(x.storeId));
    let showStocks = filteredStocks.length > 4 ? filteredStocks.slice(0, 4) : stocks;
    let tooltipTitle = stocks.map(stock => "" + stock.storeName + " : " + stock.stockLevel + " \n").join("");

    if (!activeStores.length) {
        return (
            <div title={tooltipTitle} style={lineview ? linestyles.storestock : styles.storeStock}>
                <ul style={lineview ? linestyles.stockList : styles.stockList}>
                    {stocks.slice(0, 4).map(stock =>
                        <li style={lineview ? linestyles.stock : null} key={stock.storeName}>{stock.storeName.split(",").pop()} : {stock.stockLevel}</li>
                    )}
                </ul>
            </div>
        )
    } else {
        return (
            <div title={tooltipTitle} style={lineview ? linestyles.storestock : styles.storeStock}>
                <ul style={lineview ? linestyles.stockList : styles.stockList}>
                    {showStocks.map(stock =>
                        activeStores.includes(stock.storeId) && <li style={lineview ? linestyles.stock : null} key={stock.storeName}>{stock.storeName.split(",").pop()} : {stock.stockLevel}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default StoreStock;