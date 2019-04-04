import React, { Component } from 'react';
import BeerList from './BeerList/BeerList';
import Header from './Header/Header';

export default class TopContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchString: '',
            isLoaded: false,
            beerListSorting: 'averageRating',
            activeStores: [],
            beerApiResult: [],
            toBeAnnouncedResult: [],
            onlyNew: false,
            bookmarks: [],
            showOnlyBookmarks: false,
            lineView: false,
            showTBA: false,
        }
    }

    addBookmark = (id) => {
        this.setState((prevState) => { return { bookmarks: prevState.bookmarks.concat([id]) } }, () => localStorage.setItem("bookmarks", JSON.stringify(this.state.bookmarks)));
    }

    removeBookmark = (id) => {
        let newBookmarks = this.state.bookmarks.filter(x => x !== id);
        this.setState(() => {
            return { bookmarks: newBookmarks }
        }, () => localStorage.setItem("bookmarks", JSON.stringify(this.state.bookmarks)))
    }

    setShowTBA = () => {        
        this.setState((prevState) => {return { showTBA: !prevState.showTBA}})
    }

    setLineView = () => {
        this.setState((prevState) => { return { lineView: !prevState.lineView } })
    }

    setOnlyBookmarks = () => {
        this.setState((prevState) => { return { showOnlyBookmarks: !prevState.showOnlyBookmarks } })
    }

    setOnlyNew = () => {
        this.setState((prevState) => { return { onlyNew: !prevState.onlyNew } })
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
            fetch(`/api/beers?query=${this.state.searchString || '*'}`)
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
                .then( fetch("/api/new")
                .then(res => {console.log(res); return res.json()})
                .then(
                    (result) => {
                        this.setState({
                            toBeAnnouncedResult: result.sort((a, b) => b.averageScore - a.averageScore)
                        })
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        });
                    })
                )
        )
    }

    filteredBeers = () => {
        var filteredBeers = this.state.beerApiResult.slice(0);
        if (this.state.beerApiResult.length && this.state.activeStores.length) {

            filteredBeers = filteredBeers.filter((x) => {
                var beerstores = x.storeStocks.map(store => store.storeId);
                return beerstores.some(store => this.state.activeStores.map(filter => filter === store).some(x => x === true));
            })
        }
        filteredBeers.sort((a, b) => b[this.state.beerListSorting] - a[this.state.beerListSorting]);
        if (this.state.onlyNew) {
            filteredBeers = filteredBeers.filter(x => x.onNewProductList);
        }
        if (this.state.showOnlyBookmarks) {
            filteredBeers = filteredBeers.filter(x => this.state.bookmarks.includes(x.materialNumber));
        }
        return filteredBeers ? filteredBeers : [];
    }

    componentDidMount = () => {
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        if (bookmarks && bookmarks.length > 0) {
            this.setState({ bookmarks: bookmarks });
        }
        this.fetchBeers();
    }


    render() {
        return (
            <div className="main-container">
                <Header
                    beerApiResult={this.state.beerApiResult.slice(0)}
                    submitSearch={this.submitSearch} setStoresFilter={this.setStoresFilter}
                    onSortingSelected={this.setSorting}
                    onOnlyNew={this.setOnlyNew}
                    onlyNew={this.state.onlyNew}
                    setOnlyBookmarks={this.setOnlyBookmarks}
                    showOnlyBookmarks={this.state.showOnlyBookmarks}
                    onLineView={this.setLineView}
                    lineView={this.state.lineView}
                    showTBA={this.state.showTBA}
                    setShowTBA={this.setShowTBA}
                    />
                {
                    this.state.showTBA ?
                    <BeerList
                        error={this.state.error}
                        beers={this.state.toBeAnnouncedResult}
                        activeStores={this.state.activeStores}
                        isLoaded={this.state.isLoaded}
                        addBookmark={this.addBookmark}
                        removeBookmark={this.removeBookmark}
                        bookmarks={this.state.bookmarks} 
                        lineView={this.state.lineView}/>
                    :
                    <BeerList
                        error={this.state.error}
                        beers={this.filteredBeers()}
                        activeStores={this.state.activeStores}
                        isLoaded={this.state.isLoaded}
                        addBookmark={this.addBookmark}
                        removeBookmark={this.removeBookmark}
                        bookmarks={this.state.bookmarks} 
                        lineView={this.state.lineView}/>
                }
            </div>
        )
    }
}
