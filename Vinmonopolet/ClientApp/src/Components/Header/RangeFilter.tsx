import React, {useState} from 'react'
import Slider from '@material-ui/core/Slider';

import styles from './Styles/RangeFilter.module.css'

interface Props {
    max: number,
    min: number,
    values: number[],
    step: number,
    variableName: string,
    setValues: (value: number[]) => void,
}

const RangeFilter: React.FC<Props> = ({max, min, values, step, variableName, setValues}) => {
    const [local, setLocal] = useState(values);

    const handleChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setLocal(value as number[])
    }

    const handleConfirm = (event: React.ChangeEvent<{}>, value: number | number[]) => {
        setValues(value as number[])
    }
    return (
        <div className={styles.rangeWrapper}>
            <div className={styles.label}>
                {variableName}
            </div>
            <Slider 
                value={local}
                max={max}
                min={min}
                step={step}
                onChange={handleChange}
                onChangeCommitted={handleConfirm}
                valueLabelDisplay="auto"
                aria-labelledby={variableName+"-slider"}
            />
        </div>
    )
}

export default RangeFilter
