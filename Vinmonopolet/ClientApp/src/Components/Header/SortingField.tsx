import React, { useContext, useState } from 'react'
import SortingContext, { SortingProp } from '../../Contexts/SortingContext';
import { Select, MenuItem, Checkbox } from '@material-ui/core';

import styles from './Styles/SortingField.module.css'
import FilterContext from '../../Contexts/FilterContext';

interface Props {
}

const SortingField: React.FC<Props> = () => {
    const [value, setValue] = useState('averageScore');

    const sortingContext = useContext(SortingContext);
    const filterContext = useContext(FilterContext);

    const onChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setValue(event.target.value as string);
        sortingContext.setSorting(event.target.value as SortingProp)
    };

    const changeDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
        sortingContext.setDecending(event.target.checked);
    };

    const changeNew = (event: React.ChangeEvent<HTMLInputElement>) => {
        filterContext.setNew(event.target.checked);
    };

    const changeTba = (event: React.ChangeEvent<HTMLInputElement>) => {
        filterContext.setTba(event.target.checked);
    };

    return (
        <div className={styles.wrapping} >
        Sort by
            <div className={styles.dropdownWrap}>
                <Select className={styles.dropdown} value={value} onChange={onChange}>
                    {/* <MenuItem value={'name'}>Name</MenuItem> */}
                    {/* <MenuItem value={'brewery'}>Brewery</MenuItem> */}
                    {/* <MenuItem value={'style'}>Style</MenuItem> */}
                    <MenuItem value={'averageScore'}>Rating</MenuItem>
                    <MenuItem value={'abv'}>Alcohol %</MenuItem>
                    <MenuItem value={'volume'}>Volume</MenuItem>
                    <MenuItem value={'totalCheckins'}>Checkins</MenuItem>
                    <MenuItem value={'price'}>Price</MenuItem>
                </Select>
            </div>
            <div className={styles.checkboxWrap}>
                Desc
                <Checkbox
                    checked={sortingContext.descending}
                    onChange={changeDesc}
                    value="primary"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            <div className={styles.checkboxWrap}>
                New
                <Checkbox
                    checked={filterContext.showNew}
                    onChange={changeNew}
                    value="primary"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>
            <div className={styles.checkboxWrap}>
                TBA
                <Checkbox
                    checked={filterContext.tba}
                    onChange={changeTba}
                    value="primary"
                    color="primary"
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            </div>

        </div>
    )
}

export default SortingField
