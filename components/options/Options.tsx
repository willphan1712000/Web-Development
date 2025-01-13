import React, { useEffect } from 'react'
export { default as Color } from './types/ColorType'
export { default as Font } from './types/FontType'
import {Props as ChildProps} from './types/Props'

interface Props {
    keyValue: string,
    Face: React.ComponentType<ChildProps>,
    face?: string,
    list: string[],
    cb: (option: string|number) => void
}

const Options = ({keyValue, Face, face, list, cb}: Props) => {
    useEffect(() => {
        document.querySelector(`#${keyValue}`)?.addEventListener('click', e => {
            const ele = e.target as HTMLElement
            if(ele.matches(`[data-key=${keyValue}]`)) {
                cb($(ele).data('value'))
            }
        })
    }, [])

    return (
        <div id={keyValue} className="flex flex-row flex-1 items-center bg-white p-[10px] rounded-[20px] z-[1] overflow-y-hidden overflow-x-auto w-full" style={{scrollbarWidth: 'none'}}>
            {list.map(item => <div key={item} data-value={item} data-key={keyValue} className="overflow-hidden cursor-pointer flex flex-shrink-0 aspect-square w-[50px] h-[50px] mr-[5px] rounded-[50%] text-[25px] bg-[#f0f0f0]"><Face face={face} value={item}/></div>)}
        </div>
    )
}

export default Options
