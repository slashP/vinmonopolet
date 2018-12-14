import React, { Component } from 'react';
import styles from './styles.css';

export default class SearchButton extends Component {
    constructor(props) {
        super(props);
        this.state =
            {
                searchValue: ''
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
                <form onSubmit={this.handleSubmit}>
                    <input style={styles.searchInput} type="text" placeholder=" Search" value={this.state.searchValue} onChange={this.handleChange} />
                </form>
            </div>
        )
    }
}