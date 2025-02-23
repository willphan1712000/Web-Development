import { useEffect } from 'react'
import { handleButtonContext } from '../Button'
import style from './style.module.css'

const Solid = () => {
  const data = handleButtonContext()

  useEffect(() => {
    document.documentElement.style.setProperty('--first-color', data.first!);
  }, []);

  return (
    <button onClick={data.onClick} className={style.btn}><div style={{backgroundColor: data.main}} className={style.label}><p className={style.p} style={{color: `${data.text}`}}>{data.content}</p></div></button>
  )
}

export default Solid
