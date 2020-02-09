import React, { useState, useContext, useEffect } from 'react'
import { Beer } from '../Types/BeerTypes'
import FilterContext from './FilterContext';

export type SortingProp = 'name'|'brewery'|'style'|'averageScore'|'abv'|'volume'|'totalCheckins'|'price';

type SortingState = {
    sortedBeers: Beer[],
    descending: boolean,
    setSorting: (prop: SortingProp) => void,
    setDecending: (decending: boolean) => void,
};

interface Props {};

export const SortingContext = React.createContext<SortingState>({
    sortedBeers: [],
    descending: true,
    setSorting: () => {},
    setDecending: () => {},
});

export const SortingContextProvider: React.FC<Props> = (props) => {
    const [sortedBeers, setSortedBeer] = useState<Beer[]>([]);
    const [sortingProperty, setSortingProperty] = useState<SortingProp>('averageScore');
    const [descending, setDescendingState] = useState(true);

    const filterContext = useContext(FilterContext);

    const setDecending = ( input : boolean ) => {
        setDescendingState(input);
        var sorted = sortBeers(input, sortingProperty);
        setSortedBeer(sorted);        
    }

    const setSorting = (prop : SortingProp ) => {
        setSortingProperty(prop);
        var sorted = sortBeers(descending, prop);
        setSortedBeer(sorted);
    }

    const sortBeers = (descending :boolean , sortingProp : SortingProp) => {
        if (descending) {
            return filterContext.filteredBeer.sort((a,b) => (b[sortingProp] as number) - (a[sortingProp] as number))
        } else {
            return filterContext.filteredBeer.sort((a,b) => (a[sortingProp] as number) - (b[sortingProp] as number));
        }
    }

    useEffect(() => {
        var sorted = sortBeers(descending,sortingProperty);
        setSortedBeer(sorted);//eslint-disable-next-line
    },[filterContext.filteredBeer])

    useEffect(() => {
        var sorted = sortBeers(descending,sortingProperty);
        setSortedBeer(sorted);//eslint-disable-next-line
    },[])
    
    return (
        <SortingContext.Provider value={{sortedBeers, descending, setSorting, setDecending}}>
            {props.children}
        </SortingContext.Provider>
    )
}

export default SortingContext
