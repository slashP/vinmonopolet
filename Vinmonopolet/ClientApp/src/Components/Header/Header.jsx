import React, { Component } from 'react'
import Menu from './Menu';
import styles from './styles.css';

export default class Header extends Component {
    render() {
        return (
            <div className="header" style={styles.header} >
                <div style={styles.logo}> ølPol</div>
                <Menu beerApiResult={this.props.beerApiResult}
                    submitSearch={this.props.submitSearch}
                    setStoresFilter={this.props.setStoresFilter}
                    onSortingSelected={this.props.onSortingSelected} />
            </div>
        )
    }
}