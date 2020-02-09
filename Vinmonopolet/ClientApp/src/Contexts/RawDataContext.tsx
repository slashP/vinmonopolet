import React, {useState, useEffect } from 'react'
import { Beer } from '../Types/BeerTypes';
import axios from 'axios';

type Store = {
    storeId: string,
    storeName: string,
}

type RawContextProps = {
    state: {
        query: string,
        apiResponse: Beer[],
        newBeerResponse: Beer[],
    },
    rawStores(): Store[];
    setQuery(query: string): void;
    getData(): void;
}

const RawDataContext = React.createContext<RawContextProps>({
    state: {
        query: "",
        apiResponse: [],
        newBeerResponse: [],
    },
    rawStores: () => [],
    setQuery: (query: string) => {},
    getData: () => {},
})

export const RawDataContextProvider: React.FC<{}> = (props) => {
    const [query, setQuery] = useState<string>('*')
    const [apiResponse, setApiResponse] = useState<Beer[]>([])
    const [newBeerResponse, setNewBeerResponse] = useState<Beer[]>([])

    const rawStores = () => { 
        const totalStores = apiResponse.map(x => x.storeStocks)
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

    const getData = async () => {
        if(query === ""){
            const result = await axios.request<Beer[]>({url: "/api/beers?query=*"});
            setApiResponse(await result.data);
        } else {
        const result = await axios.request<Beer[]>({url: "/api/beers?query=" + query});
        setApiResponse(await result.data);
        }
        const newBeer = await  axios.request<Beer[]>({url: "/api/new"});
        setNewBeerResponse(await newBeer.data);
    }

    useEffect(() => {
        getData();//eslint-disable-next-line
    },[])

    useEffect (() => {
        rawStores();//eslint-disable-next-line
    },[apiResponse])

    const state = {query, apiResponse, newBeerResponse};

    return (
        <RawDataContext.Provider value={{state, rawStores, setQuery, getData}} >
            {props.children}
        </RawDataContext.Provider>           
    )
}

export default RawDataContext;