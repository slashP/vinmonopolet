import React, { useState, useContext } from 'react'

import styles from './Styles/Header.module.css';
import FilterAdmin from './FilterAdmin';
import SortingField from './SortingField';
import FilterContext from '../../Contexts/FilterContext';
import SearchFilter from './SearchFilter';
import RatingFilter from './RatingFilter';

const filterSvg = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="filter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path></svg>

const checkmarkSvg = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" /></svg>

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
                    ølPolet
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
