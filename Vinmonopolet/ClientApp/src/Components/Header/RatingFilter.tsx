import React, { useState, useContext } from 'react'
import { Slider } from '@material-ui/core'

import styles from './Styles/RatingFilter.module.css'
import FilterContext from '../../Contexts/FilterContext';

interface Props {

}

const RatingFilter: React.FC<Props> = () => {
    const [localValue, setLocalValue] = useState(0)

    const filterContext = useContext(FilterContext)

    const handleRelease = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setLocalValue(value as number);
        filterContext.setFilter({ name: 'averageScore', value: value as number })
    }

    return (
        <div className={styles.wrapper}>
            Minimum Rating
            <Slider
                className={styles.slider}
                value={localValue}
                defaultValue={5}
                step={0.1}
                min={0}
                max={5}
                onChange={(e, v) => setLocalValue(v as number)}
                onChangeCommitted={handleRelease}
                valueLabelDisplay="auto"
                track="inverted"
            />
        </div>
    )
}

export default RatingFilter
