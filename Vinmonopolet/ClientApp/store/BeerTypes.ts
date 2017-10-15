import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';
import RestUtilities from '../services/RestUtilities';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface BeersGroupedByPolState {
    isLoading: boolean;
    beerType?: string;
    polViewModel: PolViewModel;
}

export interface PolViewModel {
    types: string[];
    groupedBeers: BeerLocationAtPol[];
    searchTerm: string;
}

interface BeerLocationAtPol {
    storeName: string;
    beerLocations: BeerLocation[];
}

export interface GroupedBeer {
    store: Store;
}

export interface Store {
    id: string;
    name: string;
}

export interface WatchedBeer {
    materialNumber: string;
    name: string;
    alcoholPercentage: number;
    price: number;
    beerCategory: string;
}

export interface BeerLocation {
    storeId: string;
    stockLevel: number;
    stockStatus: string;
    announcedDate?: Date;
    watchedBeer: WatchedBeer;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestBeerTypeAction {
    type: 'REQUEST_BEER_TYPE';
    beerType?: string;
}

interface ReceiveBeerTypeAction {
    type: 'RECEIVE_BEER_TYPE';
    beerType: string;
    polViewModel: PolViewModel;
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestBeerTypeAction | ReceiveBeerTypeAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestBeerType: (beerType: string = "Porter stout"): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        let searchTerm = getState().beersByPolState.beerType;
        if (beerType !== searchTerm) {
            let fetchTask = RestUtilities.get<PolViewModel>(`beers?query=${beerType}`)
                .then(response => {
                    if (response && response.content && !response.is_error) {
                        dispatch({ type: 'RECEIVE_BEER_TYPE', beerType: beerType, polViewModel: response.content });
                    }
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_BEER_TYPE', beerType: beerType });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: BeersGroupedByPolState = { polViewModel: { types: [], groupedBeers: [], searchTerm: ""}, isLoading: false };

export const reducer: Reducer<BeersGroupedByPolState> = (state: BeersGroupedByPolState = unloadedState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_BEER_TYPE':
            return {
                beerType: action.beerType,
                polViewModel: state.polViewModel,
                isLoading: true
            };
        case 'RECEIVE_BEER_TYPE':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.beerType === state.beerType) {
                console.log("receiving search term", action.polViewModel.searchTerm);
                return {
                    beerType: action.beerType,
                    polViewModel: action.polViewModel,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }

    return state || unloadedState;
};
