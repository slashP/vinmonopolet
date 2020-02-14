import React, { useState, useContext } from 'react';
import FilterContext from '../../Contexts/FilterContext';

import styles from './Styles/StoreFilter.module.css'
import { Select, Input, MenuItem, Checkbox, ListItemText } from '@material-ui/core';

interface Props {
    
}

const StyleFilter: React.FC<Props> = () => {
    const [styleFilter, setStyleFilter] = useState<string[]>([])
    const [textFilter, setTextFilter] = useState('')

    const filterContext = useContext(FilterContext);
    const uniqueStyles = filterContext.uniqueStyles.sort();

    const filteredStyles = (uniqueStyles.length > 0 && textFilter.length > 0) ? uniqueStyles.filter(x => x.toUpperCase().includes(textFilter.toUpperCase())) : [];

    const clearFilter = () => {
        setTextFilter('');
        setStyleFilter([]);
        filterContext.setFilter({name: 'style', value: [] as string[] })
    }

    const selectAll = () => {
        setStyleFilter(filteredStyles);
        filterContext.setFilter({ name:'style', value: filteredStyles});
    }

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextFilter(e.target.value);
    }

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setStyleFilter(event.target.value as string[]);
        filterContext.setFilter({ name: 'style', value: event.target.value as string[] })
    };

    const displaySelected = (styles: string[]) => {
        return styles.map(style => <>{style}<br /></>)
    }

    return (
        <div className={styles.wrapper}>
            <input
                className={styles.textField}
                type="text"
                onChange={handleTextChange}
                value={textFilter}
                placeholder="Filtrer style list"
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
                value={styleFilter}
                input={<Input />}
                renderValue={styles => displaySelected(styles as string[])}
                onChange={handleChange} >
                {
                    filteredStyles.map(style => (
                        <MenuItem className={styles.option} value={style} key={style}>
                            <Checkbox checked={styleFilter.indexOf(style) > -1} />
                            <ListItemText primary={style} />
                        </MenuItem>
                    ))
                }
            </Select>
        </div>
    )
}

export default StyleFilter
