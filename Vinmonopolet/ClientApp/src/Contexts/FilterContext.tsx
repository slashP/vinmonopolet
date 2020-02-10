import React, { useState, useContext, useEffect, useMemo } from 'react'
import { Beer } from '../Types/BeerTypes';
import RawDataContext from './RawDataContext';

type FilterContextProps = {
    state: FilterState,
    filteredBeer: Beer[],
    showNew: boolean,
    uniqueStores: Store[],
    uniqueStyles: string[],
    setNew: (value: boolean) => void,
    tba: boolean,
    setTba: (value: boolean) => void,
    setFilter: (input: SetInput) => void,
    applyFilter: () => void,
}

type SetInput = {
    name: string,
    value: number | [number,number] | string[] | boolean,
}

export type Store = {
    storeId: string,
    storeName: string,
}

type FilterState = {
    averageScore: number,
    price: [number, number],
    volume: [number, number],
    abv: [number, number],
    store: string[],
    brewery: string[],
    style: string[],
    onNewList: boolean,
    toBeAnnounced: boolean,
}

const DefaultState: FilterState = {
    averageScore: 0,
    price: [0, 500],
    volume: [0, 600],
    abv: [0, 20],
    store: [],
    brewery: [],
    style: [],
    onNewList: false,
    toBeAnnounced: false,
}

const FilterContext = React.createContext<FilterContextProps>({
    state: DefaultState,
    filteredBeer: [],
    showNew: false,
    uniqueStores: [],
    uniqueStyles: [],
    setNew: () => {},
    tba: false,
    setTba: () => {},
    setFilter: () => {},
    applyFilter: () => {},
})

export const FilterContextProvider: React.FC<{}> = (props) => {
    const [filterState, setFilterState] = useState(DefaultState);
    const [filteredBeer, setFilteredBeer] = useState<Beer[]>([]);
    const [showNew, setNew] = useState(false);
    const [tba, setTba] = useState(false);

    const rawDataContext = useContext(RawDataContext);
    
    const rawData = () => {
        return tba ? rawDataContext.state.newBeerResponse : rawDataContext.state.apiResponse;
    }

    const setFilter = (input: SetInput) => {
        setFilterState({...filterState, [input.name]: input.value});
    }

    const applyFilter = () => {
        let filtered = rawData();

        if (showNew) {
            filtered = filtered.filter(x => x.onNewProductList === true);
        }

        if (filterState.averageScore > 0) {
            filtered = filtered.filter(x => x.averageScore > filterState.averageScore)
        }

        if (filterState.store.length > 0) {
            filtered = filtered.filter(x => {
                var beerStores = x.storeStocks.map(store => store.storeId);
                return beerStores.some(store => filterState.store.map(filter => filter === store).some(x => x === true));
            });
        }

        if (filterState.style.length > 0) {
            filtered = filtered.filter(x => {
                return filterState.style.includes(x.style);
            })
        }

        filtered = filtered.filter(x => x.price >= filterState.price[0] && x.price <= filterState.price[1])
            .filter(x => x.averageScore >= filterState.averageScore)
            .filter(x => x.volume >= filterState.volume[0] && x.volume <= filterState.volume[1])
            .filter(x => x.abv >= filterState.abv[0] && x.abv <= filterState.abv[1])

        setFilteredBeer(filtered);
    }

    const calculateUniqueStores = (beers: Beer[]) => {
        const totalStores = beers.map(x => x.storeStocks)
            .reduce((prev, curr) => prev.concat(curr), []);
        const uniqueStores = Array.from(new Set(totalStores.map(x => x.storeId))).map(
            id => {
                return {
                    storeId: id,
                    storeName: totalStores.find(x => x.storeId === id)?.storeName || ''
                };
            }
        ).sort(function(a,b){
            if(a.storeName < b.storeName) { return -1; }
            if(a.storeName > b.storeName) { return 1; }
            return 0;
        });
        return uniqueStores as Store[];
    }

    const calculateUniqueStyles = (beers: Beer[]) => {
        return [...new Set(beers.map(x => x.style))];
    }

    const uniqueStyles = useMemo(() => calculateUniqueStyles(filteredBeer), [filteredBeer])

    const uniqueStores = useMemo(() => calculateUniqueStores(filteredBeer), [filteredBeer])

    useEffect(() => {
        applyFilter();//eslint-disable-next-line
    },[rawDataContext.state.apiResponse, tba, showNew])

    return (
        <FilterContext.Provider value={{state: filterState, showNew, setNew, uniqueStores, uniqueStyles, tba, setTba, setFilter, filteredBeer, applyFilter }}>
            {props.children}
        </FilterContext.Provider>
    )
}

export default FilterContext
