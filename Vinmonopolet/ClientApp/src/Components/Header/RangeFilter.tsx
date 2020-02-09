import React from 'react'
import Slider from '@material-ui/core/Slider';

import styles from './Styles/RangeFilter.module.css'

interface Props {
    max: number,
    min: number,
    values: number[],
    variable: string,
    variableName: string,
    setValues: (value: number[]) => void,
}

const RangeFilter: React.FC<Props> = ({max, min, values, variable, variableName, setValues}) => {
    const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setValues(value as number[])
    }

    return (
        <div className={styles.rangeWrapper}>
            <div className={styles.label}>
                {variableName}
            </div>
            <Slider 
                value={values}
                max={max}
                min={min}
                onChange={handleChange}
                valueLabelDisplay="auto"
                aria-labelledby={variableName+"-slider"}
            />
        </div>
    )
}

export default RangeFilter
