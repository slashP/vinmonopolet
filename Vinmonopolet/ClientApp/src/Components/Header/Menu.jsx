import React, { Component } from 'react';
import SearchButton from './SearchButton';
import StoreDropdown from './StoreDropdown';
import SortingDropdown from './SortingDropdown';
import Icon from './../icons';
import styles from './styles.css';

export default class Menu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
        }
    }

    flipOpenState = () => {
        this.setState({ isOpen: !this.state.isOpen})
    }


    render() {
        return (
            <div style={{display: "flex", flexDirection:"row", float: "right", margin: "0 0 0 auto"}}>
                <div style={{display: this.state.isOpen ? 'block' : 'none'}}>
                    <div style={styles.openMenu}>
                        <SearchButton submitSearch={this.props.submitSearch} />                    
                        <SortingDropdown onSortingSelected={this.props.onSortingSelected} />
                        <StoreDropdown beerApiResult={this.props.beerApiResult} setStoresFilter={this.props.setStoresFilter} />
                    </div>
                </div>
                <div style={styles.menuIcon} onClick={this.flipOpenState} >
                    <Icon icon="menu"/>
                </div>
            </div>
        )
    }
}
