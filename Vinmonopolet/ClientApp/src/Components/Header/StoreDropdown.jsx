import React, { Component } from 'react'
import Select from 'react-select'
import styles from './styles.css'

export default class StoreDropdown extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedStores: []
    }
  }

  onSelect = (options) => {
    this.setState({ selectedStores: options }, () => {
      this.props.setStoresFilter(options.map((x) => x.value));
      localStorage.setItem('storeFilter', JSON.stringify(options))
    });
  }

  componentDidMount = () => {
    let storedStores = JSON.parse(localStorage.getItem('storeFilter'));
    if (storedStores && storedStores.length > 0) {
      this.setState({ selectedStores: storedStores });
      this.props.setStoresFilter(storedStores.map((x) => x.value));
    }
  }

  storesFromApi = () => {
    var stores = [];
    this.props.beerApiResult.forEach(beer => {
      beer.storeStocks.forEach(storestock => {
        if (!stores.find((x) => x.storeId === storestock.storeId)) {
          stores.push({
            storeName: storestock.storeName,
            storeId: storestock.storeId
          });
        }
      });
    });
    return stores;
  }

  dropdownOptions = (stores) => {
    var options = [];
    if (stores.length) {
      stores.forEach(store => {
        options.push({
          value: store.storeId,
          label: store.storeName
        })
      })
      options.sort((a, b) => a.label.localeCompare(b.label));
    }
    return options;
  }



  render() {
    if (this.props.beerApiResult) {
      return (
        <div style={styles.storeSelect} >
          <Select
            isMulti
            isSearchable={false}
            value={this.state.selectedStores}
            placeholder="Filter stores:"
            hideSelectedOptions={true}
            closeMenuOnSelect={false}
            options={this.dropdownOptions(this.storesFromApi())}
            onChange={this.onSelect} />
        </div>
      )
    } else {
      return (
        <div>
          No data
        </div>
      )
    }
  }
}
