import React, { Component } from 'react'
import BeerCard from './BeerCard';
import styles from './styles.css';
import { Loading } from './../media';
import InfiniteScroll from 'react-infinite-scroller';

export default class BeerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            beersToShow: [],
            hasMoreItems: true
        }
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.beers !== prevProps.beers || this.props.activeStores !== prevProps.activeStores) {
            this.setState({
                beersToShow: [],
                hasMoreItems: true
            })
            if (this.scroll) {
                this.scroll.pageLoaded = -1;
            }
        }
    }

    loadItems = (page) => {
        let beersPerPage = 20;
        this.setState({
            beersToShow: this.state.beersToShow.concat(this.props.beers.slice((page * beersPerPage), ((page + 1) * beersPerPage))),
            hasMoreItems: this.props.beers.length > (page * beersPerPage)
        })
    }

    render() {
        const { error, isLoaded, activeStores } = this.props;
        if (error) {
            console.log(error);
            return <div style={styles.beerListLoading}>Error: {error.message} </div>
        } else if (!isLoaded || !this.props.beers) {
            return (
                <div style={styles.beerListLoading}>
                    <Loading fill='#ccc' width="300" height="300" />
                </div>
            )
        }
        else {
            return (
                <div >
                    <div className="beerList" style={styles.beerList}>
                        <InfiniteScroll
                            ref={(scroll) => { this.scroll = scroll; }}
                            pageStart={-1}
                            loadMore={this.loadItems.bind(this)}
                            hasMore={this.state.hasMoreItems}
                            loader={<span key={"loading"}>loading</span>}>
                            {
                                this.state.beersToShow.map(beer => {
                                    return <BeerCard key={beer.materialNumber + beer.storeName} activeStores={activeStores} beer={beer} />
                                }
                                )
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            )
        }
    }
}
