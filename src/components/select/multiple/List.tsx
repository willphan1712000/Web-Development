import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { handleSelectContext } from '../Select'
import styles from './multiple.module.css'

interface Props {
  open: (e: boolean) => void
}

/**
 * 
 * @param open : click event handler 
 * @returns 
 */

const List = ({open}: Props) => {
  const data = handleSelectContext()
  const list = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState<string>("")
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const filteredList = useMemo(() => {
    return data.options.filter(option => {
      return option.label.toLowerCase().includes(query.toLowerCase())
    })
  }, [query])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    document.addEventListener('click', e => {
      if(!list.current?.contains(e.target as HTMLElement)) {
        open(false)
      }
    }, { signal })

    return () => {
      controller.abort()
    }

  }, [])

  return (
    <div className={styles.box7} ref={list}>
      <div className={styles.box8}>
        <input type="text" className={styles.box9} placeholder='Search' value={query} onChange={handleSearchChange}/>
      </div>
      {filteredList.map((option: any) => (
        <div key={option.value} className={styles.box10} onClick={() => {
          data.change((prev: any[]) => {
            if(!prev.includes(option.label))
              return [...prev, option.label]
            return prev
          })
          open(false)
        }}>{option.label}</div>
      ))}
    </div>  
  )
}

export default List
