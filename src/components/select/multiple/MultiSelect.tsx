import { useState } from 'react'
import ArrowDown from '../icon/ArrowDown'
import X from '../icon/X'
import { handleSelectContext } from '../Select'
import List from './List'
import styles from './multiple.module.css'

const MultiSelect = () => {
  const data = handleSelectContext()
  const [isOpen, setOpen] = useState<boolean>(false)
  const size = parseInt(data.size!)

  return (
    <>
      <div className={styles.box2} style={{width: `${size}rem`, color: `${data.text}`}}>
        <div
          className={styles.box1} onClick={() => {
            setOpen(prev => !prev)
          }}
        >
          <div className={styles.box3}>
            {data.value.map((item: any, index: number) => (
                <div key={index} className={styles.box2}>
                  <span className={styles.box4}>{item}</span>
                  <span className={styles.box5}><X onClick={e => {
                    e.stopPropagation()
                    data.change((prev: any[]) => {
                      return [...prev.filter(item_new => item_new !== item)]
                    })
                  }}/></span>
                </div>
              ))}
          </div>

          <div className={styles.box6}>
            <X onClick={(e) => {
              e.stopPropagation()
              data.change([])
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

export default MultiSelect
