import React from 'react';
import Tooltip from 'react-tooltip-lite';

const tooltip = (stocks) => {
    return stocks.map(stock => <div>{stock.storeName} : {stock.stockLevel}</div>);
}

const twoWithTooltip = (stocks) => {
    
}


const StoreStock = ({ stocks, activeStores }) => {
    if (!activeStores.length) {
        return (
            <div>
                <Tooltip useDefaultStyles content={tooltip(stocks)}>
                    <ul>
                        {stocks.map(stock =>
                            <li key={stock.storeName}>{stock.storeName}: {stock.stockLevel}</li>
                        )}
                    </ul>
                </Tooltip>
            </div>
        )
    } else {
        return (
            <div>
                <ul>
                    {stocks.map(stock =>
                        activeStores.includes(stock.storeId) && <li key={stock.storeName}>{stock.storeName}: {stock.stockLevel}</li>
                    )}
                </ul>
            </div>
        )
    }
}

export default StoreStock;