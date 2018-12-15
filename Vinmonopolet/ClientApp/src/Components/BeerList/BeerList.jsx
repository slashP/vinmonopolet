import React, { Component } from 'react'
import BeerCard from './BeerCard';
import styles from './styles.css';
import './beerList.css';

export default class BeerList extends Component {
    render() {
        const { error, isLoaded, beers, activeStores } = this.props;
        if (error) {
            console.log(error);
            return <div style={styles.beerListLoading}>Error: {error.message} </div>
        } else if (!isLoaded || !beers) {
            return <div style={styles.beerListLoading}> Loading..... </div>
        } else {
            return (
                <div >
                    <div className="beerList" style={styles.beerList}>
                        {
                            beers.map(beer =>
                                <BeerCard key={beer.materialNumber + beer.storeName} activeStores={activeStores} beer={beer} />
                            )
                        }
                    </div>
                </div>
            )
        }
    }
}
