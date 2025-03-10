import { useState } from "react"
import styles from './rangeSlider.module.css'

interface Props {
    keyValue: string,
    range: {
        min: number,
        max: number
    }
    defaultValue: number,
    cb: (e: number) => void
}

const RangeSlider = ({keyValue, range, defaultValue, cb}: Props) => {
    
    const [value, setValue] = useState<number>(defaultValue)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const r = parseInt(e.target.value)
        setValue(r)
        cb(r)
    }

    return (
        <div id={keyValue} className={styles.box1}>
            <div className={styles.box2}>
                <p className={styles.box3}>{value}</p>
                <input id="range" className={styles.box4} type="range" min={range.min} max={range.max} value={value} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default RangeSlider
