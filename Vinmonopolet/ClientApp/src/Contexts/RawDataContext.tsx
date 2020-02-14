import React, {useState, useEffect } from 'react'
import { Beer } from '../Types/BeerTypes';
import axios from 'axios';

const baseUrl = process.env.NODE_ENV === "development" ? "https://øl.dev" : "";


type RawContextProps = {
    state: {
        query: string,
        apiResponse: Beer[],
        newBeerResponse: Beer[],
    },
    setQuery(query: string): void;
    getData(): void;
}

const RawDataContext = React.createContext<RawContextProps>({
    state: {
        query: "",
        apiResponse: [],
        newBeerResponse: [],
    },
    setQuery: (query: string) => {},
    getData: () => {},
})

export const RawDataContextProvider: React.FC<{}> = (props) => {
    const [query, setQuery] = useState<string>('*')
    const [apiResponse, setApiResponse] = useState<Beer[]>([])
    const [newBeerResponse, setNewBeerResponse] = useState<Beer[]>([])

    const getData = async () => {
        if(query === ""){
            const result = await axios.request<Beer[]>({url: baseUrl + "/api/beers?query=*"});
            setApiResponse(await result.data);
        } else {
        const result = await axios.request<Beer[]>({url: baseUrl + "/api/beers?query=" + query});
        setApiResponse(await result.data);
        }
        const newBeer = await  axios.request<Beer[]>({url: baseUrl + "/api/new"});
        setNewBeerResponse(await newBeer.data);
    }

    useEffect(() => {
        getData();//eslint-disable-next-line
    },[])

    const state = {query, apiResponse, newBeerResponse};

    return (
        <RawDataContext.Provider value={{state, setQuery, getData}} >
            {props.children}
        </RawDataContext.Provider>           
    )
}

export default RawDataContext;