import * as React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './components/Home';
import FetchData from './components/FetchBeerType';
import Counter from './components/Counter';
import AuthService from './services/Auth';
import { SignIn, Register } from './components/Auth';

export class RoutePaths {
    public static SignIn: string = "/login";
    public static Register: string = "/register/";
}

const DefaultLayout = ({ component: Component, ...rest }: { component: any, path: string, exact?: boolean }) => (
    <Route {...rest} render={props => (
        AuthService.isSignedInIn() ? (
            <div>
                <div className="container">
                    <Component {...props} />
                </div>
            </div>
        ) : (
            <Redirect to={{
                pathname: RoutePaths.SignIn,
                state: { from: props.location }
            }} />
        )
    )} />
);

export const routes = <Layout>
    <Route exact path={RoutePaths.SignIn} component={SignIn} />
    <Route path={RoutePaths.Register} component={Register} />
    <Route exact path='/' component={ Home } />
    <Route path='/counter' component={ Counter } />
    <DefaultLayout path='/beers' component={ FetchData } />
</Layout>;