import React, { useContext } from 'react'
import RangeFilter from './RangeFilter';
import FilterContext from '../../Contexts/FilterContext';
import StoreFilter from './StoreFilter';
import StyleFilter from './StyleFilter';

interface Props {

}

const FilterAdmin: React.FC<Props> = () => {
    const filterContext = useContext(FilterContext);

    const setPriceFilter = (value: number[]) => {
        filterContext.setFilter({ name: 'price', value: [value[0], value[1]] })
    }

    const setVolumeFilter = (value: number[]) => {
        filterContext.setFilter({ name: 'volume', value: [value[0], value[1]] })
    }

    const setAbvFilter = (value: number[]) => {
        filterContext.setFilter({ name: 'abv', value: [value[0], value[1]] })
    }

    return (
        <>
            <StoreFilter />
            <StyleFilter />
            <RangeFilter
                min={0}
                max={500}
                step={10}
                values={filterContext.state.price}
                setValues={setPriceFilter}
                variableName={"Price [nok]"} />
            <RangeFilter
                min={0}
                max={20}
                step={1}
                values={filterContext.state.abv}
                setValues={setAbvFilter}
                variableName={"Alcohol %"} />
            <RangeFilter
                min={0}
                max={150}
                step={1}
                values={filterContext.state.volume}
                setValues={setVolumeFilter}
                variableName={"Volume [cl]"} />
        </>
    )
}

export default FilterAdmin