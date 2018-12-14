import React from 'react';
import Tooltip from 'react-tooltip-lite';
import styles from './styles.css';

const tooltip = (stocks) => {
    return stocks.map(stock => <div>{stock.storeName} : {stock.stockLevel}</div>);
}

const StoreStock = ({ stocks, activeStores }) => {
    if (!activeStores.length) {
        return (
            <div style={styles.storeStock}>
                <Tooltip useDefaultStyles content={tooltip(stocks)}>
                    <ul style={styles.stockList}>
                        {stocks.map(stock =>
                            <li key={stock.storeName}>{stock.storeName} : {stock.stockLevel}</li>
                        )}
                    </ul>
                </Tooltip>
            </div>
        )
    } else {
        return (
            <div style={styles.storeStock}>
                <ul style={styles.stockList}>
                    {stocks.map(stock =>
                        activeStores.includes(stock.storeId) && <li key={stock.storeName}>{stock.storeName} : {stock.stockLevel}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default StoreStock;