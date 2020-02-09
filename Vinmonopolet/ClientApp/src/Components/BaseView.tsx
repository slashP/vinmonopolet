import React, { useContext, useState, useEffect } from 'react'
import InfiniteScroll from "react-infinite-scroll-component";

import styles from './Styles/BaseView.module.css'
import loader from './Styles/loader.module.css'

import CardBase from './Card/CardBase';
import { Beer } from '../Types/BeerTypes';
import SortingContext from '../Contexts/SortingContext';

const pageSize = 300;

interface Props {
}

const BaseView: React.FC<Props> = () => {
    const sortingContext = useContext(SortingContext);

    const [items, setItems] = useState<Beer[]>([])

    const addMoreBeers = () => {
        if (items.length < sortingContext.sortedBeers.length) {
            setItems(items.concat(sortingContext.sortedBeers.slice(items.length, items.length + pageSize)));
        }
    }

    useEffect(() => {
        setItems(sortingContext.sortedBeers?.slice(0, 300) || []); //eslint-disable-next-line
    }, [sortingContext.sortedBeers[0], sortingContext.sortedBeers.length])

    return (
        <div className={styles.container}>
            {items &&
                <InfiniteScroll
                    dataLength={items.length}
                    className={styles.beerFlow}
                    next={addMoreBeers}
                    hasMore={sortingContext.sortedBeers.length > items.length}
                    loader={<div className={loader.loader} />}>
                    {
                        items.map(
                            beer => <CardBase key={beer.materialNumber + beer.name + beer.volume} beer={beer} />
                        )
                    }
                </InfiniteScroll>}
            {!sortingContext.sortedBeers && <div className={loader.loader} />}
        </div>
    )
}

export default BaseView
