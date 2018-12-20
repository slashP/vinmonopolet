import React, { Component } from 'react';
import SearchArea from './SearchArea';
import StoreDropdown from './StoreDropdown';
import SortingDropdown from './SortingDropdown';
import NewBeerCheckbox from './NewBeerCheckbox';
import OnlyBookmarkCheckbox from './OnlyBookmarkCheckbox';
import styles from './styles.css';

export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: true,
        }
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "row", float: "right", margin: "0 0 0 auto" }}>
                <div style={{ display: this.state.isOpen ? 'block' : 'none' }}>
                    <div className="openMenu" style={styles.openMenu} >
                        <div style={styles.checkboxContainer}>
                            <OnlyBookmarkCheckbox setOnlyBookmarks={this.props.setOnlyBookmarks} showOnlyBookmarks={this.props.showOnlyBookmarks} />
                            <NewBeerCheckbox onOnlyNew={this.props.onOnlyNew} onlyNew={this.props.onlyNew} />
                        </div>
                        <SearchArea submitSearch={this.props.submitSearch} />
                        <SortingDropdown onSortingSelected={this.props.onSortingSelected} />
                        <StoreDropdown beerApiResult={this.props.beerApiResult} setStoresFilter={this.props.setStoresFilter} />
                    </div>
                </div>
            </div>
        )
    }
}
