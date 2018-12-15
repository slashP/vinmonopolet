import React from 'react';
import styles from './styles.css';


const StoreStock = ({ stocks, activeStores }) => {
    stocks.sort((a, b) => b.stockLevel - a.stockLevel )
    if (!activeStores.length) {
        return (
            <div style={styles.storeStock}>
                    <ul style={styles.stockList}>
                        {stocks.map(stock =>
                            <li key={stock.storeName}>{stock.storeName} : {stock.stockLevel}</li>
                        )}
                    </ul>
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