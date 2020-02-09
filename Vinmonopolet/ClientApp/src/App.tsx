import React from 'react';
import './App.css';

import BaseView from './Components/BaseView';
import Header from './Components/Header/Header';
import { RawDataContextProvider } from './Contexts/RawDataContext';
import { FilterContextProvider } from './Contexts/FilterContext';
import { SortingContextProvider } from './Contexts/SortingContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <RawDataContextProvider>
        <FilterContextProvider>
          <SortingContextProvider>
            <Header />
            <BaseView />
          </SortingContextProvider>
        </FilterContextProvider>
      </RawDataContextProvider>
    </div>
  );
}

export default App;
