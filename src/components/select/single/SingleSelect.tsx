import { useState } from 'react'
import ArrowDown from '../icon/ArrowDown'
import X from '../icon/X'
import { handleSelectContext } from '../Select'
import List from './List'
import styles from './single.module.css'

const SingleSelect = () => {
  const data = handleSelectContext()
  const [isOpen, setOpen] = useState<boolean>(false)
  const size = parseInt(data.size!)

  return (
    <>
      <div className={styles.box3} style={{width: `${size}rem`, color: `${data.text}`}}>
        <div
          className={styles.box1} onClick={() => {
            setOpen(prev => !prev)
          }}
          style={{borderColor: `${data.text}`}}
        >
          <span style={{color: `${data.text}`}}>{data.value}</span>

          <div className={styles.box2}>
            <X onClick={(e) => {
              e.stopPropagation()
              data.change(undefined)
            }}/>
            <ArrowDown />
          </div>
        </div>
          {
            isOpen && (
              <List open={setOpen}/>
            )
          }
      </div>
    </>
  )
}

export default SingleSelect
