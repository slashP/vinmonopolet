import React, { useState, useContext } from 'react'

import styles from './Styles/Header.module.css';
import FilterAdmin from './FilterAdmin';
import SortingField from './SortingField';
import FilterContext from '../../Contexts/FilterContext';
import SearchFilter from './SearchFilter';
import RatingFilter from './RatingFilter';

const filterSvg = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>

const checkmarkSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>

const resetButton = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M9.5 1.293a6.47 6.47 0 0 0-6.462 6.46v3.002l-1.5-1.5-1.5 1.5 3.991 3.951 4.009-3.951-1.5-1.5-1.5 1.5v-3c0-2.46 2.001-4.462 4.462-4.462s4.462 2.001 4.462 4.462a4.468 4.468 0 0 1-1.458 3.298l1.348 1.479a6.476 6.476 0 0 0 2.11-4.777A6.47 6.47 0 0 0 9.5 1.293z"/></svg>

interface Props {
}

const Header: React.FC<Props> = () => {
    const filterContext = useContext(FilterContext);

    const [filtersOpen, setFiltersOpen] = useState(false);

    const applyFilters = () => { filterContext.applyFilter() }

    return (
        <div className={styles.wrapper}>
            <div className={styles.inside}>
                <div className={styles.logo}>
                    ølPol
                </div>
                <div className={styles.filtersAndButtons}>
                    <SearchFilter />
                    {filtersOpen && <RatingFilter />}
                    {filtersOpen && <FilterAdmin />}
                    <SortingField />
                </div>
                <div className={styles.buttonGroup}>
                    <button className={styles.filterButton} onClick={() => setFiltersOpen(!filtersOpen)} >
                        {filterSvg}
                    </button>
                    {filtersOpen && <button className={styles.filterButton} onClick={() => applyFilters()}>
                        {checkmarkSvg}
                    </button>}
                </div>
            </div>
        </div>
    )
}

export default Header
