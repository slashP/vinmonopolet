import React, { Component } from 'react'
import Select from 'react-select'
import styles from './styles.css'

export default class SortingDropdown extends Component {

    optionsList = [
        { value: 'averageScore', label: 'Rating' },
        { value: 'abv', label: 'Abv' },
        { value: 'ibu', label: 'Ibu' },
        { value: 'price', label: 'Price' }
    ]

    render() {
        return (
            <div style={styles.sortingSelect}>
                <Select
                    placeholder="Order by:"
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    options={this.optionsList}
                    onChange={this.props.onSortingSelected} />
            </div>
        )
    }
}
