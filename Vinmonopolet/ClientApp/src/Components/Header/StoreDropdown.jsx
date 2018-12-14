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
    });
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
    stores.forEach(element => {
      options.push({
        value: element.storeId,
        label: element.storeName
      })
    });
    return options;
  }



  render() {
    if (this.props.beerApiResult) {
      return (
        <div style={styles.storeSelect} >
          <Select
            isMulti
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
