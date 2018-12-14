import React, { Component } from 'react'
import SearchButton from './SearchButton';
import StoreDropdown from './StoreDropdown';
import SortingDropdown from './SortingDropdown';
import styles from './styles.css';

export default class Header extends Component {
    render() {
        return (
            <div className="app-header" >
                <div style={styles.logo}> ølPol</div>
                <SortingDropdown onSortingSelected={this.props.onSortingSelected} />
                <StoreDropdown beerApiResult={this.props.beerApiResult} setStoresFilter={this.props.setStoresFilter} />
                <SearchButton submitSearch={this.props.submitSearch} />
            </div>
        )
    }
}