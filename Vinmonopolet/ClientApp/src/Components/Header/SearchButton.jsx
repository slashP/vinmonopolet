import React, { Component } from 'react';
import styles from './styles.css';
import Icon from '../icons';

export default class SearchButton extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                searchValue: 'Stout'
            }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let value = e.target.value;
        this.setState(oldState => ({ ...oldState, searchValue: value }));
        e.preventDefault();
    }

    handleSubmit = (e) => {
        let value = this.state.searchValue;
        this.props.submitSearch(value);
        e.preventDefault();
    }

    render() {
        return (
            <div style={styles.searchArea} >
                <form onSubmit={this.handleSubmit} style={{display: "flex"}}>
                    <input style={styles.searchInput} type="text" value={this.state.searchValue} onChange={this.handleChange} />
                    <div style={styles.searchSubmitButton} onClick={this.handleSubmit} > 
                        <Icon icon="search" fill="#ccc" />
                    </div>
                </form>
            </div>
        )
    }
}