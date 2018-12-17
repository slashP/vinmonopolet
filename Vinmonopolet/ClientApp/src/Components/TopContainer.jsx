import React, { Component } from 'react';
import BeerList from './BeerList/BeerList';
import Header from './Header/Header';

export default class TopContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: '*',
            isLoaded: false,
            beerListSorting: 'averageRating',
            activeStores: [],
            beerApiResult: []
        }
    }

    setSorting = (sorting) => {
        this.setState({ beerListSorting: sorting.value })
    }

    setStoresFilter = (stores) => {
        this.setState({ activeStores: stores })
    }

    submitSearch = (value) => {
        let newStateValue = value;
        this.setState({ searchString: newStateValue }, () => this.fetchBeers())
    }

    fetchBeers = () => {
        this.setState({ isLoaded: false }, () =>
            fetch(`/api/beers?query=${this.state.searchString}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                            isLoaded: true,
                            beerApiResult: result.sort((a, b) => b.averageScore - a.averageScore)
                        })
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    }
                )
        )
    }

    filteredBeers = () => {
        var filteredBeers = this.state.beerApiResult.slice(0);
        if (this.state.beerApiResult.length && this.state.activeStores.length) {
            filteredBeers = filteredBeers.filter((x) => {
                var beerstores = x.storeStocks.map(store => store.storeId);
                return beerstores.some(store => this.state.activeStores.map(fil => fil === store).some(x => x === true));
            })
        }
        filteredBeers.sort((a, b) => b[this.state.beerListSorting] - a[this.state.beerListSorting]);
        return filteredBeers ? filteredBeers : [];
    }

    componentDidMount = () => {
        this.fetchBeers();
    }


    render() {
        return (
            <div className="main-container">
                <Header beerApiResult={this.state.beerApiResult.slice(0)} submitSearch={this.submitSearch} setStoresFilter={this.setStoresFilter} onSortingSelected={this.setSorting} />
                <BeerList error={this.state.error} beers={this.filteredBeers()} activeStores={this.state.activeStores} isLoaded={this.state.isLoaded} />
            </div>
        )
    }
}
