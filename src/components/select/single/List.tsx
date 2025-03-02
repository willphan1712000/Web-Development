import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { handleSelectContext } from '../Select'
import styles from './single.module.css'

interface Props {
  open: (e: boolean) => void
}

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
    <div className={styles.box4} ref={list} style={{borderColor: `${data.text}`}}>
      <div className={styles.box5}>
        <input type="text" className={styles.box6} placeholder='Search' value={query} onChange={handleSearchChange} style={{borderColor: `${data.text}`}}/>
      </div>
      {filteredList.map((option: any) => (
        <div key={option.value} className={styles.box7} onClick={() => {
          data.change(option.value)
          open(false)
        }}>{option.label}</div>
      ))}
    </div>  
  )
}

export default List
