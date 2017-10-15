import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as BeerTypeState from '../store/BeerTypes';

// At runtime, Redux will merge together...
type BeerTypeProps =
    BeerTypeState.BeersGroupedByPolState        // ... state we've requested from the Redux store
    & typeof BeerTypeState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{ query: string }>; // ... plus incoming routing parameters

class FetchBeerType extends React.Component<BeerTypeProps, {}> {
    componentWillMount() {
        // This method runs when the component is first added to the page
        this.props.requestBeerType(this.props.beerType);
    }

    public render() {
        return <div>
                   <h3>{this.props.beerType}</h3>
                   {this.props.polViewModel.types.map(type =>
                       <a key={type} onClick={() => this.props.requestBeerType(type)} className="btn btn-primary">{type}</a>
                   )}
                   { this.renderGroupedBeers() }
               </div>;
    }

    private renderGroupedBeers() {
        return <div>
                    {this.props.polViewModel.groupedBeers.map(groupedBeer =>
                        <table key={groupedBeer.storeName} className="table table-condensed">
                            <thead>
                            <tr key={groupedBeer.storeName}>
                                <th>{groupedBeer.storeName}</th>
                                <th className="text-right">Pris</th>
                                <th className="text-right">Alc</th>
                                <th className="text-right">Antall</th>
                            </tr>
                            </thead>
                            <tbody>
                            {groupedBeer.beerLocations.map(beerLocation =>
                                <tr key={ beerLocation.watchedBeer.materialNumber + beerLocation.storeId }>
                                    <td><a href={'https://untappd.com/search?q=' + beerLocation.watchedBeer.name } target="blank">{beerLocation.watchedBeer.name}</a></td>
                                    <td className="text-right">{ beerLocation.watchedBeer.price }</td>
                                    <td className="text-right">{beerLocation.watchedBeer.alcoholPercentage} %</td>
                                    <td className="text-right">{beerLocation.stockLevel}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    )}
                </div>;
        }
    }

export default connect(
(state: ApplicationState) => state.beersByPolState, // Selects which state properties are merged into the component's props
BeerTypeState.actionCreators // Selects which action creators are merged into the component's props
)(FetchBeerType) as typeof FetchBeerType;
