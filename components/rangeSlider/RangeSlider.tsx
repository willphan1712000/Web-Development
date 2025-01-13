import { useState } from "react"

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
        <div id={keyValue} className="h-auto flex flex-1 flex-row items-center justify-center bg-white rounded-[20px] p-[10px] shadow-md z-[1]">
            <div className="flex flex-row items-center justify-between gap-[10px]">
                <p className="mr-[10px]">{value}</p>
                <input id="range" className="h-auto rounded-[20px] outline-none opacity-90 transition-opacity duration-200 border-none" type="range" min={range.min} max={range.max} value={value} onChange={handleChange}/>
            </div>
        </div>
    )
}

export default RangeSlider
