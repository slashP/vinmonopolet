import React, { useContext, useState } from 'react'
import RawDataContext from '../../Contexts/RawDataContext';
import { Select } from '@material-ui/core';
import FilterContext from '../../Contexts/FilterContext';

import styles from './Styles/StoreFilter.module.css'

interface Props {

}

const StoreFilter: React.FC<Props> = () => {
    const [storeFilter, setStoreFilter] = useState<string[]>([])
    const [textFilter, setTextFilter] = useState('')

    const filterContext = useContext(FilterContext);
    const rawContext = useContext(RawDataContext);
    const allStores = rawContext.rawStores();

    const filteredStores = allStores.filter(x => x.storeName.toUpperCase().includes(textFilter.toUpperCase()))

    const clearFilter = () => {
        setTextFilter('');
        setStoreFilter([]);
        filterContext.setFilter({ name: 'store', value: [] as string[] })
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextFilter(e.target.value);
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const { options } = event.target as HTMLSelectElement;
        const value: string[] = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }

        setStoreFilter(value);
        filterContext.setFilter({ name: 'store', value: value })
    };

    return (
        <div className={styles.wrapper}>
            <div>
                <input
                    className={styles.textField}
                    type="text"
                    onChange={handleTextChange}
                    value={textFilter}
                    placeholder="Filtrer stores list"
                    />
                <button className={styles.clearButton} onClick={() => clearFilter()}>
                    CLEAR
            </button>
            </div>
            <Select
                className={styles.select}
                multiple
                native
                value={storeFilter}
                onChange={handleChange} >
                {
                    filteredStores.map(store => (
                        <option className={styles.option} value={store.storeId} key={store.storeId}>{store.storeName}</option>
                    ))
                }
            </Select>
        </div>
    )
}

export default StoreFilter