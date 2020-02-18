import React, { useContext, useState } from 'react'
import { Select, Input, MenuItem, Checkbox, ListItemText } from '@material-ui/core';
import FilterContext from '../../Contexts/FilterContext';

import styles from './Styles/StoreFilter.module.css'

interface Props {

}

const StoreFilter: React.FC<Props> = () => {
    const filterContext = useContext(FilterContext);
    const [storeFilter, setStoreFilter] = useState<string[]>(filterContext.state.store)
    const [textFilter, setTextFilter] = useState('')

    const allStores = filterContext.uniqueStores;

    const filteredStores = allStores.filter(x => x.storeName.toUpperCase().includes(textFilter.toUpperCase())) || [];

    const clearFilter = () => {
        setTextFilter('');
        setStoreFilter([]);
        filterContext.setFilter({ name: 'store', value: [] as string[] })
    }

    const selectAll = () => {
        const value = filteredStores.map(x => x.storeId);
        setStoreFilter(value);
        filterContext.setFilter({ name: 'store', value: value });
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextFilter(e.target.value);
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStoreFilter(event.target.value as string[]);
        filterContext.setFilter({ name: 'store', value: event.target.value as string[] })
    };

    const displaySelected = (stores: string[]) => {
        return <span> {stores.length} stores selected </span>
    }
    return (
        <div className={styles.wrapper}>
            <input
                className={styles.textField}
                type="text"
                onChange={handleTextChange}
                value={textFilter}
                placeholder="Filtrer store list"
            />
            <button className={styles.clearButton} onClick={() => selectAll()}>
                ALL
            </button>
            <button className={styles.clearButton} onClick={() => clearFilter()}>
                X
            </button>
            <Select
                className={styles.select}
                multiple
                value={storeFilter}
                input={<Input />}
                renderValue={stores => displaySelected(stores as string[])}
                onChange={handleChange} >
                {
                    filteredStores.map(store => (
                        <MenuItem className={styles.option} value={store.storeId} key={store.storeId}>
                            <Checkbox checked={storeFilter.indexOf(store.storeId) > -1} />
                            <ListItemText primary={store.storeName} />
                        </MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}

export default StoreFilter