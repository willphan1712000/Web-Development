import React, { MouseEventHandler, useEffect } from 'react'
import style from './style.module.css'
import { handleButtonContext } from '../Button'

const Gradient = () => {
  const data = handleButtonContext()

  useEffect(() => {
    document.documentElement.style.setProperty('--first-color', data.first!);
    document.documentElement.style.setProperty('--second-color', data.second!);
  }, []);

  return (
    <button onClick={data.onClick} className={style.btn}><div style={{backgroundColor: data.main}} className={style.label}><p className={style.p} style={{color: `${data.text}`}}>{data.content}</p></div></button>
  )
}

export default Gradient
