import React, { useEffect, useState } from 'react'
import { hslToHex } from './ColorPickerMethod'
interface Props {
  keyValue: string,
  defaultColor: string,
  cb: (e: string|number) => void
}

const ColorPickerGradient = ({keyValue, defaultColor, cb}: Props) => {
  const [color1, setColor1] = useState<string|number>(0)
  const [color2, setColor2] = useState<string|number>(0)
  const [deg, setDeg] = useState<string|number>(0)
  const [color, setColor] = useState<string|number>(defaultColor)

  function colorOneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor1(e.target.value)
    setColor(`linear-gradient(${deg}deg, ${hslToHex(Number(color2), 100, 80)}, ${hslToHex(Number(color1), 100, 80)})`)
  }
  function colorTwoChange(e: React.ChangeEvent<HTMLInputElement>) {
    setColor2(e.target.value)
    setColor(`linear-gradient(${deg}deg, ${hslToHex(Number(color2), 100, 80)}, ${hslToHex(Number(color1), 100, 80)})`)
  }
  function degChange(e: React.ChangeEvent<HTMLInputElement>) {
    setDeg(e.target.value)
    setColor(`linear-gradient(${deg}deg, ${hslToHex(Number(color2), 100, 80)}, ${hslToHex(Number(color1), 100, 80)})`)
  }

  useEffect(() => {
    cb(color)
  }, [color])

  const colorInputClass = 'appearance-none h-[10px] rounded-[20px] bg-[linear-gradient(to_right,_hsl(0,_100%,_50%),_hsl(60,_100%,_50%),_hsl(120,_100%,_50%),_hsl(180,_100%,_50%),_hsl(240,_100%,_50%),_hsl(300,_100%,_50%),_hsl(360,_100%,_50%))] outline-none bg-opacity-90 border-none'

  return (
    <div id={keyValue} className="flex flex-row justify-center items-center h-auto bg-white rounded-[20px] p-[10px] z-[1] flex-1">
        <div className="flex flex-col items-center justify-between">
          <div className='flex flex-row justify-center items-center'>
            <label className='mr-[5px]'>Color1</label>
            <input id="color1" className={colorInputClass} type="range" min="0" max="360" value={color1} onChange={colorOneChange}/>
          </div>
          <div className='flex flex-row justify-center items-center'>
            <label className='mr-[5px]'>Color2</label>
            <input id="color2" className={colorInputClass} type="range" min="0" max="360" value={color2} onChange={colorTwoChange}/>
          </div>
          <div className='flex flex-row justify-center items-center'>
            <label className='mr-[5px]'>Degree</label>
            <input id="deg" className="id" type="range" min="0" max="360" value={deg} onChange={degChange}/>
          </div>
        </div>
    </div>
  )
}

export default ColorPickerGradient
